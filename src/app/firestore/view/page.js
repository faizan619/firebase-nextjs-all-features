"use client"
import Button from "@/app/Component/button";
import { db } from "@/firebase/config"
import { collection, getDocs } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react";

async function fetchDataFromFirestore(){
    const querySnapshot = await getDocs(collection(db,"messages"))

    const data = [];
    querySnapshot.forEach((doc)=>{
        data.push({id:doc.id,...doc.data()});
    });
    return data;
}

export default function Page(){
    const [userData,setUserData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const data = await fetchDataFromFirestore();
            setUserData(data);
        }
        fetchData();
    },[]);

    // const sendNotification = ()=>{
    //     if('Notification' in window && Notification.permission === "granted"){
    //         new Notification('Hello Developer!!',{
    //             body:'This is your notification message!!',
    //             icon:'/next.svg',
    //         })
    //     }
    // };

    // const requestNotificationPermission = useCallback(()=>{
    //     if('Notification' in window){
    //         Notification.requestPermission().then(function(permission){
    //             console.log("Notification permission granted!!")
    //             sendNotification();
    //         })
    //     }
    // },[]);

    // useEffect(()=>{
    //     if('Notification' in window){
    //         requestNotificationPermission();
    //     }
    // },[requestNotificationPermission])

    return(
        <div className="bg-black text-white min-h-screen">
            <h1>Fetch Firestore Data Here</h1>
            {/* <button onClick={sendNotification}>Notification</button> */}
            <Button title="Back" page="/firestore" />
            <div>
                {userData.map((user)=>(
                    <div key={user.id} className="border my-5 p-3" >
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Message: {user.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}