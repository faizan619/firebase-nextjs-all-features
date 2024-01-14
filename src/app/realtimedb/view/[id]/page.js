import Button from "@/app/Component/button";

const viewData = async()=>{
    let data = await fetch("https://codofile-feedback-default-rtdb.firebaseio.com/practise1.json",{
        cache:'no-cache'
    });
    data = await data.json();
    return data;
}
export default async function Page({params}){
    console.log("user id:",params.id)
    try{
        const allDetails = await viewData();
        console.log('view the details:', allDetails)

        // Filter details based on the specific user ID
        const userDetails = allDetails && allDetails[params.id];

        return(
            <div className="bg-black min-h-screen text-white flex gap-5 flex-col items-center">
                <h1>View Details here</h1>
                {
                    userDetails && (
                        <div className="border p-3 rounded-md">
                            <p>Unique Id: {params.id}</p>
                            <p>Name: {userDetails.name}</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Phone: {userDetails.phone}</p>
                            <p>Message: {userDetails.message}</p>
                            <Button page={`/realtimedb/view`} title="Back"/>
                        </div>
                    )
                }
            </div>
        )
    }
    catch(e){
        console.error("Error in fetching the data:",e)
        return <div>Error Fetching Data.Check your Internet Connection</div>
    }
}