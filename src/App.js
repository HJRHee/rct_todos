import { useState, useEffect, useId } from 'react';
import './App.css';
// 파이어베이서 파일에서 import 해온 db
import {db} from './firebase'
// db 객체
import { collection, getDocs, addDoc, orderBy, query, updateDoc, doc } from "firebase/firestore";

function App() {
  // input으로 받을 새로운 사람의 이름과 나이
  const [newList, setNewList] = useState("");
  // const [newDate, setNewDate] = useState("");

  // console.log(newList, newDate);

 // 데이터 저장 state
  const [todos, setList] = useState([]);
  // db의 todo 컬렉션 가져오기
  const usersCollectionRef = collection(db, "todos");

  // 고유 key 생성
  const uniqueId = useId();
  // console.log(uniqueId)

   // 시작될때 한번만 실행되도록 두번째 인자에 빈 배열 추가
  useEffect(()=>{
  	// 비동기로 데이터 받을준비
    const getList = async () => {
     // getDocs : 컬렉션안에 데이터 가져오기
      const data = await getDocs(
        query(usersCollectionRef, orderBy('d_date', 'desc'))
      );
      // console.log(data);
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setList(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
    }

    getList();
  },[])

  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

  const createList = async () =>{
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    await addDoc(usersCollectionRef, {content: newList, d_date:now_date});
  }

  const updateList = async ( id, content, date) =>{
    // console.log(id+"/"+content+"/"+date)

    const msg = window.prompt('To Do', content)
      if(msg){
        // id를 이용하여 업데이트 하고자 하는 데이터 검색
        const listDoc = doc(db, "todos", id)
        // 업데이트할 데이터
        const editField = {content: msg, d_date:date};
        console.log(editField);
        // updateDoc()을 이용해서 업데이트
        await updateDoc(listDoc, editField);    
      }
  }


// 띄워줄 데이터 key값에 고유ID 입력
const showList = todos.map((value)=> (<div key={uniqueId}> 
  <h2>
    {value.content} 
    <span className='date'>{value.d_date}</span>
    <button onClick={()=>{updateList(value.id, value.content, value.d_date)}}>EDIT</button>
  </h2> 
</div>))

  return (
    <div className="App">
      {/* onchange를 이용해서, 변하는 값을 state로 저장한다. */}
      <input type="text" placeholder='todos...' onChange={(event)=> {setNewList(event.target.value)}}/>
      <button onClick={createList}>Add List</button>
      <hr />
      {showList}
    </div>
  );
}

export default App;