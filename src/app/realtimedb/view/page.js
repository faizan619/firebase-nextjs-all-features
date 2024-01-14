import Button from "@/app/Component/button";

const viewData = async()=>{
    let data = await fetch("https://codofile-feedback-default-rtdb.firebaseio.com/practise1.json",{
        cache:'no-cache'
    });
    data = await data.json();
    return data;
}
export default async function Page(){
    try{
        const details = await viewData();
        // console.log('view the details:',details)
        return(
            <div className="bg-black min-h-screen text-white flex flex-col items-center">
                <h1>View Details here</h1>
                {
                    details && Object.keys(details).map((key)=>(
                        <div key={key} className="border p-3 rounded-md">
                            <p>Unique Id: {key}</p>
                            <p>Name: {details[key].name}</p>
                            <Button page="view/12"/>
                            {/* <p>Email: {details[key].email}</p>
                            <p>Phone: {details[key].phone}</p>
                            <p>Message: {details[key].message}</p> */}
                        </div>
                    ))
                }
            </div>
        )
    }
    catch(e){
        console.error("Error in fetching the data:",e)
        return <div>Error Fetching Data.Check your Internet Connection</div>
    }
}