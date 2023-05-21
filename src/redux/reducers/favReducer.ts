import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: number[] = []
const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers:{
        addOneFav: (state, action: PayloadAction<number>)=>{
            state.push(action.payload)   
        },
        removeFromFav: (state, action:PayloadAction<number>)=>{
            const newState = state.filter(number => number !== action.payload)
            return newState
        },
    }
})
const favReducer = favSlice.reducer
export const {addOneFav,removeFromFav} = favSlice.actions
export default favReducer