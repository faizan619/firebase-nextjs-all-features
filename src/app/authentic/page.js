"use client"
import { useRouter } from "next/navigation";
import Button from "../Component/button";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Page(){
    const router = useRouter()
    const {user} = useAuthContext();
    useEffect(()=>{
        if(user !== null) router.push("/authentic/admin")
    },[user])
    return(
        <div className="flex flex-col min-h-screen bg-black text-white items-center pt-5">
            <h1>This Is Authentication Landing Page</h1>
            <div className="flex gap-10 ">
                <Button title="Login" page="/authentic/login"/>
                <Button title="Register" page="/authentic/register"/>
            </div>
        </div>
    )
}