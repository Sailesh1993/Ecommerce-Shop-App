import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "../../redux/reducers/productsReducer"
import userReducer from "../../redux/reducers/userReducer"

const store = configureStore({
    reducer:{
        productsReducer,
        userReducer,
    }
})
export default store