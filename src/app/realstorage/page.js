"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/firebase/config";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    image: null,
  });

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setUserData({ ...userData, image: imageFile });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const { name, email, phone, message, image } = userData;

    if (name && email && phone && message && image) {
      // Upload image to Firebase Storage
      const filename = image.name;
      const parts = filename.split(".");
      const storageRef = ref(storage, `/storagev2/${v4()}.${parts[1]}`);
      await uploadBytes(storageRef, image);

      // Get image URL
      const imageUrl = await getDownloadURL(storageRef);

      // Store user details and image URL in Firebase Realtime Database
      const res = await fetch(
        "https://codofile-feedback-default-rtdb.firebaseio.com/imagetext.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
            imageUrl,
          }),
        }
      );

      if (res) {
        alert("Data Stores Successfully");
        setUserData({ name: "", email: "", phone: "", message: "", image: null });
        router.refresh("realtimedb/view");
      } else {
        alert("Problem in Processing the Form Data");
      }
    } else {
      alert("Please Enter All the Details and Upload an Image");
    }
  };

  return (
    <div>
      <div className="text-center min-h-screen flex flex-col justify-center items-center text-xl">
        <div className="text-center flex flex-col justify-center items-center text-xl">
          <div className="mb-5">
            <h1 className="uppercase text-xl mb-5">Realtime Database PAGE</h1>
            <Link
              href="realstorage/view"
              className="rounded-md hover:bg-black hover:text-white border border-black px-5 py-2"
            >
              View Data
            </Link>
          </div>
          <form className="flex flex-col gap-5 text-left border p-5 rounded-md bg-gray-300 text-black">
            <label>
              <p>Name:</p>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={postUserData}
                placeholder="Enter Name:"
                className="px-2 rounded-md text-black"
              />
            </label>
            <label>
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={postUserData}
                placeholder="Enter Email:"
                className="px-2 rounded-md text-black"
              />
            </label>
            <label>
              <p>Phone:</p>
              <input
                type="number"
                name="phone"
                value={userData.phone}
                onChange={postUserData}
                placeholder="Enter Phone No.:"
                className="px-2 rounded-md text-black"
              />
            </label>
            <label>
              <p>Message:</p>
              <input
                type="text"
                name="message"
                value={userData.message}
                onChange={postUserData}
                placeholder="Enter Message:"
                className="px-2 rounded-md text-black"
              />
            </label>
            <label>
              <p>Image:</p>
              <input
                type="file"
                onChange={handleImageUpload}
                className="px-2 rounded-md text-black"
              />
            </label>
            <button
              type="submit"
              className="border rounded-xl bg-blue-500"
              onClick={submitData}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
