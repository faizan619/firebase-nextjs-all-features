import Button from "@/app/Component/button";
import Image from "next/image";

const viewData = async()=>{
    let data = await fetch(
        "https://codofile-feedback-default-rtdb.firebaseio.com/imagetext.json",
        {
            cache:"no-cache"
        }
    );
    data = await data.json();
    console.log(data)
    return data;
};

export default async function Page(){
    try{
        const blogdetails = await viewData();
        return(
            <div>
                <div className="flex justify-evenly items-end mb-5">
                    <h1>View the Blog Data Here</h1>
                    <Button page={`/realstorage`} title="Back" />
                </div>
                {
                    blogdetails && Object.keys(blogdetails).map((key)=>(
                        <div key={key} className="border inline-block p-4 rounded-md">
                            <p>Unique Id: {key}</p>
                            <p>Name : {blogdetails[key].name}</p>
                            <p>Phone: {blogdetails[key].phone}</p>
                            <p>Email: {blogdetails[key].email}@gmail.com</p>
                            <Image className="border border-black w-full object-cover object-top h-80" src={blogdetails[key].imageUrl} alt="image" height={200} width={200} />
                            <p>{blogdetails[key].message}</p>

                        </div>
                    ))
                }
            </div>
        ) 
    }
    catch(e){
        console.error("Error in fetching the data:", e);
        return <div>Error Fetching Data.Check your Internet Connection</div>;
    }
}