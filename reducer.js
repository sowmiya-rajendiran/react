function reducer(state , action){
    console.log(action)
    switch(action.type){
        case 'Increment' : 
            return state+ (action.payload) ;
        case 'Decrement' :
            return state -1 ;
        case 'Reset' :
            return 0 ;
        default:
            return 0;
    }

}

export default reducer;