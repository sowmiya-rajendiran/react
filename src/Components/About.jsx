
import { useCustom } from "../App";

function About(){

    let {data , setData} = useCustom();

    let handleClick =() =>{
        setData(data+1);
    }

    return(
        <>
            <h1>This is About Section</h1>
            <h2>{data}</h2>
            <button onClick={handleClick}>Click Data</button>
        </>
    )
}

export default About;