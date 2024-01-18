"use client"
import { useState } from "react"
import register from "../auth/register"
import { useRouter } from "next/navigation";

export default function Page(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter()

    const handleForm = async(e)=>{
        e.preventDefault();

        const {result ,error} = await register(email,password);

        if(error){
            return console.log(error);
        }

        console.log(result)
        return router.push("/authentic/login")
    }
    return(
        <div className="bg-black text-white min-h-screen">
        <div>
            <p onClick={()=>router.push("/authentic")} className="border cursor-pointer hover:bg-white hover:text-black inline-block px-5 m-2 text-xl">Back</p>
            <p className="text-center uppercase">Register page</p>
        </div>
            <div className="border flex h-96 justify-center items-center ">
                <div className="text-center text-xl">
                    <h1 className="mb-7">Sign up</h1>
                    <form onSubmit={handleForm} className="text-left flex flex-col gap-5">
                        <label htmlFor="email">
                            <p>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" className="p-2 rounded-md text-black" id="email" placeholder="example@mail.com" />
                        </label>
                        <label htmlFor="password">
                            <p>Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} required type="password" className="p-2 text-black rounded-md" name="password" id="password" placeholder="password" />
                        </label>
                        <button type="submit" className=" border hover:bg-gray-800 py-3 rounded-md">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}