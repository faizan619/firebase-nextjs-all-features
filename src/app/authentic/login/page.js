"use client"
import { useState } from "react"
import login from "../auth/login"
import { useRouter } from "next/navigation";
export default function Page(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const router = useRouter()

    const handleForm = async(e)=>{
        e.preventDefault()

        const {result,error} = await login(email,password);
        if(error){
            return console.log(error)
        }
        console.log(result)
        return router.push("/authentic/admin")
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
            {/* <h1 className="uppercase text-xl">Login Page</h1> */}
            <div className="flex items-center justify-evenly w-full">
            <p onClick={()=>router.push("/authentic")} className="border inline-block px-5 m-2 text-xl cursor-pointer hover:bg-white hover:text-black">Back</p>
            <p className="text-center uppercase">Login page</p>
        </div>
            <div className="border p-5 rounded-lg mt-5">
                <div className="text-center">
                    {/* <h1 className="">Login</h1> */}
                    <form onSubmit={handleForm} className="flex flex-col gap-5 m-5">
                        <label htmlFor="email">
                            <p>Email</p>
                            <input className="text-black px-2 py-1 rounded-sm" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                        </label>
                        <label htmlFor="password">
                            <p>Password</p>
                            <input className="text-black px-2 py-1 rounded-sm" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                        </label>
                        <button type="submit" className="border py-3 rounded-md hover:bg-gray-950">Sign up</button>
                    </form>
                </div>

            </div>
        </div>
    )
}