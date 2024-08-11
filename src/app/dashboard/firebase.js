// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMocwK9nNIxfeqMPpfAjWeNOMnFaPxIPY",
  authDomain: "pantry-tracker-b091b.firebaseapp.com",
  projectId: "pantry-tracker-b091b",
  storageBucket: "pantry-tracker-b091b.appspot.com",
  messagingSenderId: "301490668086",
  appId: "1:301490668086:web:26f03a8591291adb944e97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);