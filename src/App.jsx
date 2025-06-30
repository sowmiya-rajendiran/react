import { useReducer } from "react";

import reducer from "../reducer";

function App(){
    let [state,dispatch] = useReducer(reducer , 0);

    let handleIncrese = () =>{
        dispatch ({type : 'Increment' , payload : 5});
    }
    let handleDecrese = () => {
        dispatch({type : 'Decrement'});
    }
    let handleRest = () =>{
        dispatch({type : 'Reset'})
    }

    return(
        <>
            <h1>This is value {state} </h1>
            <button onClick={handleIncrese}>Click</button>
            <button onClick={handleDecrese}>Click</button>
            <button onClick= {handleRest}>Reset</button>
        </>
    )

}
export default App;