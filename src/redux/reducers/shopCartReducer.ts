import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ShopCart } from "../../types/ShopCart";
import { ProductsInCart } from "../../types/ProductsInCart";

const initialState :  ShopCart ={
    id:"",
    creationAt:"",
    updateAt:"",
    productsInCart:[]
}
const shopCartSlice = createSlice({
    name:"shopCart",
    initialState: initialState,
    reducers:{
        addProduct:(state, action)=>{
            const item = state.productsInCart.find(entry=> entry.product.id === action.payload.id)
            if(item) item.amount +=1
            else{
                const newEntry: ProductsInCart ={
                    amount: 1,
                    product: action.payload
                }
                state.productsInCart.push(newEntry)
            }
        },
        removeProduct: (state,action: PayloadAction<number>) => {
            return{
                ...state,
                productsInCart: state.productsInCart.filter(entry => entry.product.id !== action.payload)
            }
        },
        updateProduct: (state, action: PayloadAction<{id:number, amount: number}>)=>{
            const item = state.productsInCart.find((entry => entry.product.id === action.payload.id))
            if(item){
                item.amount = action.payload.amount
            }
        },
        emptyShopCart: (state) =>{
            state.productsInCart = []
        }

    }
})
export const { 
    addProduct, 
    removeProduct, 
    updateProduct,
    emptyShopCart
} = shopCartSlice.actions
const shopCartReducer = shopCartSlice.reducer
export default shopCartReducer