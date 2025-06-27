import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Form from "./components/form";

ReactModal.setAppElement('#root');


let App = () =>{
  // let [like, setlike] = useState(0);
  // let [dislike, setdislike] = useState(0);
  // let handleLike = ()=>{
  //   setlike(like +1)
  // }
  // let handledisLike = () =>{
  //   setdislike(dislike +1)
  // }

 let [count , setCount] = useState({
  likes : 0,
  disLike : 0
 })

 let [list , setList] = useState ([]);

  useEffect(()=>{
    console.log("Mounted");

    fetch(`https://684f0235f0c9c9848d29d782.mockapi.io/api/test/users`)
    .then(res => res.json())
    .then(data => setList(data));

    
  
  },[]);
  console.log(list);
  

  let handleLike = () =>{
    setCount({
      ...count ,
      likes: count.likes + 1,
      
    })

  }
  let handledisLike = () =>{
    setCount({
      ...count ,
      disLike : count.disLike +1
    })

  }

  let [user , setUser] = useState({
    name : '',
    age:''
  });

  let changeInput = (e) =>{
    setUser({
      ...user ,
      name : e.target.value 
    })
    console.log(e.target.value)
  }

  let [track , setTrack] = useState(0);

  let handleTrack = () =>{
    setTrack(track+1)
  }

  let [modalOpen , setmodalOpen] = useState(false);
  
  return(
    <>
    <button onClick = {() => setmodalOpen(true)}>Modal Open</button>
    <ReactModal
    isOpen ={modalOpen}
    onRequestClose={()=>setmodalOpen(false)}
    contentLabel={
    "Example Modal"}
    style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '2rem'
          }
        }}
    >
      <h2>Hello from Modal</h2>
      <p>This is a modal using the `react-modal` library.</p>
      <button onClick ={()=> setmodalOpen(false)}>Close Modal</button>
    </ReactModal>

    <Form />
    
      <h1 className="text-3xl">Count is : {count.likes}</h1>
      <button onClick = {handleLike}>Like</button><br></br>
      <h1>DisLike Count is : {count.disLike}</h1>
      <button onClick = {handledisLike}>DisLike</button>

      <div>
        <input type="text" placeholder="Name" onChange={changeInput}></input>
        <p>This Is my {user.name}</p>
        <p>Another tarck : {track}</p>
        <button onClick = {handleTrack}>Track</button>
      </div>

    </>
  )
}

export default App;