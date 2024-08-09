import { Product } from "@/models/product";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Product[] = []

export const ProductsSlice = createSlice({
    name: 'products',
    initialState: getLocalStorage('products') 
        ? JSON.parse(getLocalStorage('products') as string)
        : initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload)
            setLocalStorage('products', JSON.stringify(action.payload))
            state = action.payload
            return state
        }
    }
})

export const {addProduct} = ProductsSlice.actions