"use client"
import { storage } from "@/firebase/config"
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { useState } from "react"
import Button from "../Component/button"
import Link from "next/link"

export default function Page(){

    const [file,setFile] = useState("")
    const [percent,setPercent] = useState(0)
    const [idtt,setId] = useState("")

    const handleChange=(e)=>{
        setFile(e.target.files[0]);
        console.log("files details: ",file);
    } 
    const handleUpload=()=>{
        if(!file){
            alert("Please Choose a Image");
        }
        else{
            console.log(file.name)
            const storageRef = ref(storage,`/storagefile/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const percent = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                    );
                    setPercent(percent);
                },
                (err)=>console.log(err),
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                        console.log("image url",url);
                        setId(url)
                    });
                }
            );
        }
    }

    return(
        <div className="bg-blue-950 text-white">
            <div className="flex justify-between p-5 items-end">
                <h1 className="text-xl">Storage Database in Firebase</h1>
                <Button title="Back" page="/" />
            </div>
            <div className="flex flex-col items-center min-h-screen px-2 justify-center gap-5">
                <Button page="storage/storageview" title="View Photos"/>
                <input type="file" accept="image/*" onChange={handleChange} className="border rounded-md" />
                <button onClick={handleUpload} className="border px-5 rounded-md hover:shadow-md transition-all hover:shadow-gray-50">Upload to Firebase</button>
                <p>{percent!=100?`${percent}% done`:"Uploaded"}</p>
                {idtt!=null && undefined?(
                <div className="bg-black p-2">
                    <Link target="_blank" href={`${idtt}`}>{idtt}</Link>
                </div>
                ):null
                }
            </div>
        </div>
    )
}