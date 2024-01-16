"use client"
import { useState } from "react"
import { storage,db } from "@/firebase/config";

export default function Page(){

    const [selectImage,setSelectImage] = useState([]);
    const [loading,setLoading] = useState(false)

    const handleImageUpload = (e)=>{
        const files = e.target.files;
        const uploadSelectedImage = [];
 
        for(let i=0;i<files.length;i++){
            uploadSelectedImage.push(files[i]);
        }
        setSelectImage(uploadSelectedImage);
        console.log("selected Image : ",selectImage)
    }

    const handleUpload = ()=>{
        console.log(selectImage.length>0?"No data found":"data found")
    }


    // console.log(img)

    return(
        <div className="bg-blue-950 min-h-screen text-white">
            <div>
                <input type="file" className="border" onChange={handleImageUpload} />
            </div>
        </div>
    )
}