import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import userReducer from "./reducers/userReducer"
import categoryReducer from "./reducers/categoryReducer"
import shoppingCartReducer from "./reducers/shoppingCartReducer"
import modalReducer from "./reducers/modalReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        userReducer,
        categoryReducer,
        shoppingCartReducer,
        modalReducer
    }
})
export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store