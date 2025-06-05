// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwsXvlflGSHpMvVqLUmoVdkS8Q_TjkPqA",
  authDomain: "appgestionclientes-5768d.firebaseapp.com",
  projectId: "appgestionclientes-5768d",
  storageBucket: "appgestionclientes-5768d.firebasestorage.app",
  messagingSenderId: "1049422140425",
  appId: "1:1049422140425:web:f4bb4f03e8f5b080a854d8"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default  appFirebase;