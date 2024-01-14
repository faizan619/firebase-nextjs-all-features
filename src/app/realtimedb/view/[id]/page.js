export default function Page({params}){

    const getDetails = async()=>{
        let viewId = params.id
        let detailData = await fetch(`https://codofile-feedback-default-rtdb.firebaseio.com/practise1.json/${viewId}`)
        detailData = await detailData.json();
        console.log("details data here :",detailData)
    }

    return(
        <div>
            <h1>This is Details page</h1>
            {
                getDetails && Object.keys(getDetails).map((key)=>(
                    <div>
                        {key}
                    </div>
                ))
            }

        </div>
    )
}