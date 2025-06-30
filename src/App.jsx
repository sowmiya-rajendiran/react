import { useReducer } from "react";

function reducer(state , action){
    switch (action.type){
        case 'Name' :
            return {
                ...state ,
                name : action.payload
            }
        case 'Email' :
            return {
                ...state ,
                email : action.payload
            }
        case 'Password' :
            return {
                ...state ,
                password : action.payload
            }
    }
}

function App(){

    let [state , dispatch] = useReducer(reducer , {
        name :'',
        email : '',
        password :''
    })

    let handleSubmit = (event) =>{
        event.preventDefault();
        console.log(state);
    }
    let changeName = (event) =>{
        dispatch({type : 'Name' , payload : event.target.value})
    }
    let changeEmail = (event) =>{
        dispatch({type : 'Email' , payload : event.target.value})

    }
    let changePassword = (event) =>{
        dispatch({type : 'Password' , payload : event.target.value})

    }
    return(
        <>
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" value={state.name} onChange={changeName}></input><br></br><br></br>
                <input type="email" placeholder="email" value={state.email} onChange={changeEmail}></input><br></br><br></br>
                <input type="password" placeholder="password" value={state.password} onChange={changePassword}></input><br></br><br></br>
                <button type="submit">Submit</button>
            </form>
        </>
    )

}
export default App;