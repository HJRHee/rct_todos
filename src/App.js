import { useState, useEffect } from 'react';
import './App.css';
// 파이어베이서 파일에서 import 해온 db
import {db} from './firebase'
// db 객체
import { collection, getDocs } from "firebase/firestore";

function App() {
 // 데이터 저장 state
  const [todos, setTodos] = useState([]);
  // db의 todo 컬렉션 가져오기
  const usersCollectionRef = collection(db, "todos");

   // 시작될때 한번만 실행되도록 두번째 인자에 빈 배열 추가
  useEffect(()=>{
  	// 비동기로 데이터 받을준비
    const getUsers = async () => {
     // getDocs : 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      console.log(data);
    }

    getUsers();
  },[])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;