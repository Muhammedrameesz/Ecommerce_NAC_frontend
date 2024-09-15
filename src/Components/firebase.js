import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHFPAaXqGYLHXzUkFSeHHN6VXAOVLtIhE",
  authDomain: "nac-login-85941.firebaseapp.com",
  projectId: "nac-login-85941",
  storageBucket: "nac-login-85941.appspot.com",
  messagingSenderId: "317424476439",
  appId: "1:317424476439:web:0e88ecbe599c838643d752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;