import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import ShoppingCart from "../../types/ShoppingCart"
import { Product } from "../../types/Product"
import ProductsInCart from "../../types/ProductsInCart"

const initialState: ShoppingCart = {
    id: '',
    creationAt: '',
    updateAt: '',
    productsInCart: []
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCartReducer',
    initialState: initialState,
    reducers: {
        addProduct:(state, action: PayloadAction<Product>) => {
            const item = state.productsInCart.find(entry => entry.product.id === action.payload.id)
            if (item) item.amount += 1
            else {
                const newEntry: ProductsInCart = {
                    amount: 1,
                    product: action.payload
                }
                state.productsInCart.push(newEntry)
            }

        },
        removeProduct: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                productsInCart: state.productsInCart.filter(entry => entry.product.id !== action.payload)
            }
        },
        updateProduct: (state, action: PayloadAction<{id: number, amount: number}>) => {
            const item = state.productsInCart.find(entry => entry.product.id === action.payload.id)
            if(item) {
                item.amount = action.payload.amount
            }
        },
        emptyShoppingCart: (state) => {
            state.productsInCart = []
        }
    }
})

export const { addProduct, removeProduct, updateProduct, emptyShoppingCart } = shoppingCartSlice.actions
const shoppingCartReducer = shoppingCartSlice.reducer
export default shoppingCartReducer
