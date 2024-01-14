"use client"
import { useRouter } from "next/navigation"
export default function Button(props){
    const router = useRouter();
    const navigate = (name)=>{
        router.push(name)
    }
    return(
        <button onClick={()=>navigate(props.page)} className="border px-5 py-1 rounded-sm mt-3 hover:bg-white hover:text-black">{props.title}</button>
    )
}