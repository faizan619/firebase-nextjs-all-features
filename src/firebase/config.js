import { initializeApp } from "firebase/app";

const firebaseConfig={
      apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyAzKwjcRn06091-QEExKJ_ICfqZtJRq0hU",
//   authDomain: "codofile-feedback.firebaseapp.com",
//   databaseURL: "https://codofile-feedback-default-rtdb.firebaseio.com",
//   projectId: "codofile-feedback",
//   storageBucket: "codofile-feedback.appspot.com",
//   messagingSenderId: "449924536209",
//   appId: "1:449924536209:web:90376f728bc82b0c1bec30"
// };

// Initialize Firebase



// import { getApps, initializeApp } from "firebase/app";
// import {getStorage} from "firebase/storage"
// import {getDatabase} from "firebase/database"

// import {getFirestore} from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID , 
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// // Initialize Firebase
// let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig):getApps()[0];
// const storage = getStorage(firebase_app);
// const db = getDatabase(firebase_app)
// const imgDB = getStorage(firebase_app)
// const txtDB = getFirestore(firebase_app)
// export {storage};
// export {db}
// export {imgDB,txtDB}
// export default firebase_app;

