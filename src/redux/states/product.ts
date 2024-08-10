import { Product } from "@/models/product";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: Product[] = []

export const ProductsSlice = createSlice({
    name: 'products',
    initialState: getLocalStorage('products') 
        ? JSON.parse(getLocalStorage('products') as string)
        : initialState,
    reducers: {
        addProduct: (state, action) => {
            setLocalStorage('products', JSON.stringify(action.payload))
            state = action.payload
            return state
        },
        deleteProduct: (state, action) => {
            const filteredState = current(state).filter((product: Product ) => String(product.id) !== String(action.payload.id))
            setLocalStorage('products', JSON.stringify(filteredState))
            state = filteredState
            return state
        },
        updateProduct: (state, action) => {
            setLocalStorage('products', action.payload)
            state = action.payload
            return state
        }
    }
})

export const {addProduct, deleteProduct, updateProduct} = ProductsSlice.actions