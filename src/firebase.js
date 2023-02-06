// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// 파이어스토어에 접근할수 있게해주는 ID 등등 - 로그인해야지 준다
const firebaseConfig = {
  apiKey: "AIzaSyC2eR89ycyD7-0ciWh1yRRdjuIXjdrt0WM",
  authDomain: "react-project-86820.firebaseapp.com",
  projectId: "react-project-86820",
  storageBucket: "react-project-86820.appspot.com",
  messagingSenderId: "785858976662",
  appId: "1:785858976662:web:9983cb5645b5fd9c9bdbb7"
};

const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);