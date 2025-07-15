import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : 'counter',
    initialState : {
        count : 0 ,
        decerement : 0 ,
    
    },
    reducers : {
        increment : (state) =>{
            state.count += 1 ;
        },
        decerement : (state) =>{
            state.decerement = state.decerement+1;
        }
    }
});

export const { increment , decerement } = counterSlice.actions ;
export const selectCount = (state) => state.counter.count ;
export const selectdecrement = (state) => state.counter.decerement ;
export default  counterSlice.reducer;