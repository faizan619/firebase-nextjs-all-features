import apna_app from "@/firebase/config";
import {createUserWithEmailAndPassword,getAuth} from "firebase/auth"

const auth = getAuth(apna_app)

export default async function register(email,password){
    let result = null,error = null;
    try{
        result = await createUserWithEmailAndPassword(auth,email,password);
    }
    catch(e){
        error = e;
    }
    return {result,error}
}