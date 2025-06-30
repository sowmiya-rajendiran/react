import { useRef, useState } from "react";

function App(){
    let [count , setCount] = useState(0);
    let [check , setCheck] = useState(0);

    let dataRef = useRef(0);

    let dataClick = () => {
        setCount(count+1)
    }

    let datacheck = () =>{
        setCheck(check+1)
    }
    let handleClick = () =>{
        dataRef.current +=1;
        console.log(dataRef)
    }

    return(
        <>
        <h1>{count}</h1>
        <button onClick={dataClick}>Click</button>
        <h1>{check}</h1>
        <button onClick={datacheck}>Click</button>
        <button onClick={handleClick}>Click</button>
        </>
    )

}
export default App;