"use client"
import { db } from "@/firebase/config"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react";
import Button from "../Component/button";

async function addDataToFirestore(name,email,message){
    try{
        const docRef = await addDoc(collection(db,"messages"),{
            name:name,
            email:email,
            message:message,
        });
        console.log("document written with ID:",docRef.id)
        return true;
    }
    catch(error){
        console.log("Error adding document:",error)
        return false;
    }
}

export default function Page(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const added = await addDataToFirestore(name,email,message);
        if(added){
            setName("")
            setEmail("")
            setMessage("")

            alert("Data added to firestore DB!")
        }
    }
    return(
        <div className="bg-black text-white min-h-screen">
        <div className="flex justify-evenly items-center">
            <h1>Hello welcome to Firestore Database</h1>
            <Button title="Back" page="/" />
            <Button title="View Data" page="/firestore/view" />
        </div>
            <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" className="text-black" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name">Email:</label>
                <input id="name" className="text-black" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name">Message:</label>
                <textarea  id="name" className="text-black" type="message" rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
    )
}