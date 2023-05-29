import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCT1gImjI4Z1nqoYVR_4gX89e-HVLFlJCI",
    authDomain: "workouttracker-6fd90.firebaseapp.com",
    projectId: "workouttracker-6fd90",
    storageBucket: "workouttracker-6fd90.appspot.com",
    messagingSenderId: "665958696658",
    appId: "1:665958696658:web:5b043a91bcdcf7c58ecf0b",
    measurementId: "G-YTP25GMS60"
};

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore(app);