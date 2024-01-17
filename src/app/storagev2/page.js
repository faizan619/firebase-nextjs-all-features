"use client"

import { storage } from "@/firebase/config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react"

export default function Page(){

    const [img,setImg] = useState("");
    const [imgLink,setImgLink] = useState("")
    
    const handleSubmit = ()=>{
        if(!img){
            alert("Please Upload an Image");
        }
        else{
            let filename = img.name
            console.log("file name :",filename);
            var parts = filename.split('.')
            console.log("Extension is :",parts[1]);
            const storageRef = ref(storage,`/storagev2/${v4()}.${parts[1]}`)
            // const storageRef = ref(storage,`/storagev2/${}`)
            uploadBytes(storageRef,img).then(data=>{
                console.log("Data is:",data);
                getDownloadURL(data.ref).then(val=>{
                    setImgLink(val)
                    setImg("")
                })
            })
        }
    }

    return(
        <div>
            <h1>Storage of different method</h1>
            <div>
                <input type="file" onChange={(e)=>{setImg(e.target.files[0]);console.log(img)}} />
                <button className="border border-black px-3" onClick={handleSubmit}>Upload</button>
                {/* <p>{imgLink}</p> */}
                {imgLink && <p>{imgLink}</p>}
            </div>
        </div>
    )
}