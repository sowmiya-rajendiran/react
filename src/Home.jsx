import { useDispatch, useSelector } from "react-redux";
import { decerement, increment, selectCount, selectdecrement } from "./redux/features/counterSlice";
import { useNavigate } from "react-router";

function Home(){

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let count = useSelector(selectCount);
    let decrement = useSelector(selectdecrement);

    let handleClick = () =>{
        dispatch(increment());
    }

    let handleClickdecrement = () =>{
        dispatch(decerement());
    }

    let handleAbout = () =>{
        navigate('/about');

    }

    return(
        <>
            <h1>Welcome Home </h1>
            <p>Count : {count}</p>
            <button onClick={handleClick}>Click</button>
            <p>Count : {decrement}</p>
            <button onClick={handleClickdecrement}>Click</button>
            <button onClick={handleAbout}>About Page</button>
        </>

    )
}

export default  Home;