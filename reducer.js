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

export default reducer;