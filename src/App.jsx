import { useEffect, useState } from "react";

function App(){

    let [data,setData] = useState(0);
    let [list,setList] = useState(1);
    let [display , setDisplay] = useState([]);

    let handleClick = () =>{
        setData(data+1);
    }
    let handleList = () =>{
        setList(list+5);
    }
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(resdata => setDisplay(resdata))
    },[]);

    let displayList = display.map((item)=>(
        <p key={item.id}>{item.title}</p>
    ))
    
    return(
        <>
            <h1>{data}</h1>
            <button onClick={handleClick}>Increment</button>
            <h2>{list}</h2>
            <button onClick={handleList}>List Increment</button>
            <div>
                {displayList}
            </div>
        </>
    )

}

export default App;