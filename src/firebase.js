
import { initializeApp, firebase } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import 'firebase/firestore';



//Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBQyRi-wfBrhhcJ10cAannTFfMr8FROUKU",

  authDomain: "diaryapp-45de2.firebaseapp.com",

  databaseURL: "https://diaryapp-45de2-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "diaryapp-45de2",

  storageBucket: "diaryapp-45de2.appspot.com",

  messagingSenderId: "52859151799",

  appId: "1:52859151799:web:dcc1efd754e3df52953432",

  measurementId: "G-VZY65NDPGV"

};


// firebase, database, firestore storage and google authentification module are initialized

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider =new GoogleAuthProvider()


export { db, auth, storage, provider};