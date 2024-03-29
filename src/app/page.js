"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <div className='flex flex-col bg-[#060606] min-h-screen text-white items-center'> 
      <h1>Welcome to Firebase Practise Site.</h1>
      <div className='py-10 px-5 gap-5 border w-[80%] flex flex-col items-center rounded-md'>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/realtimedb")}>Real time Database</button>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/storage")}>Storage Database</button>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/storagev2")}>Storage V2 Database</button>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/authentic")}>Authentication</button>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/firestore")}>Firestore</button>
        <button className='border px-5 py-3 rounded-md hover:bg-gray-100 hover:text-black transition-all' onClick={()=>router.push("/todoapp")}>Todo App</button>
      </div>
    </div>
  )
}
