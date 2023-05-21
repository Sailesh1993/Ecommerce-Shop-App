import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import favReducer from "./reducers/favReducer";

const favData = JSON.parse(localStorage.getItem("fav")||"")
const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        favReducer
    },
    preloadedState:{
        productsReducer:{
            loading:false,
            error:"",
            products:[]
        },
        usersReducer:{
            loading:false,
            error:"",
            users:[]
        },
        favReducer: favData
    }
})
store.subscribe(()=>{
    localStorage.setItem("fav",JSON.stringify(store.getState().favReducer))
})
export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store