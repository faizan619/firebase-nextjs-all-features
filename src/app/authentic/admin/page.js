"use client"
import { useAuthContext } from "@/context/AuthContext"
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
    try{
        const {user} = useAuthContext();
        const router = useRouter();

        useEffect(()=>{
            if(user == null) router.push("/authentic")
        },[user])

        const auth = getAuth();
        const LogoutBtn = ()=>{
            signOut(auth).then(()=>{
                alert("Sign out successfully");
                router.push("/")
            }).catch((error)=>{
                alert("Problem in Signing out")
            })
        }
        return(
            <div>
                <p>Email:{user.email}</p>
                 <button onClick={()=>LogoutBtn()} className="border py-2 px-3 mt-5 rounded-md hover:bg-gray-950 hover:text-white">Logout</button>
            </div>
        )
    }catch(e){
        return(
            <div>Only Logined Users can view this page</div>
        )
    }
    // const {user} = useAuthContext();
    // const router = useRouter()

    // useEffect(()=>{
    //     if(user ==  null) router.push("/authentic")
    //     // console.log("User value:"+user);
    // },[user])

    // const auth = getAuth();
    // const LogoutBtn = ()=>{
    //     signOut(auth).then(()=>{
    //         alert("Sign Out successfully");
    //         router.push("/authentic");
    //     }).catch((error)=>{
    //         alert("Problem in signing out")
    //     })
    // }
    // return(
    //     <div>
    //         <p>Email:{user.email}</p>
    //         {/* <p>Name: {}</p> */}
    //         <button onClick={()=>LogoutBtn()} className="border py-2 px-3 mt-5 rounded-md hover:bg-gray-950 hover:text-white">Logout</button>
    //     </div>
    // )
    
}