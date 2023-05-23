import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../../redux/reducers/productsReducer";
import shopCartReducer from "../../redux/reducers/shopCartReducer";
import usersReducer from "../../redux/reducers/usersReducer";

const store = configureStore({
    reducer:{
        productsReducer,
        usersReducer,
        shopCartReducer

    }
})
export default store