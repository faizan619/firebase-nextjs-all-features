import { initializeApp,getApps } from "firebase/app";

// for storage folder
import {getStorage} from "firebase/storage"
const firebaseConfig={
      apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
// const app = initializeApp(firebaseConfig);
const apna_app = getApps().length === 0? initializeApp(firebaseConfig):getApps()[0];
export default apna_app;

// for storage folder
const storage = getStorage(apna_app)
export {storage}