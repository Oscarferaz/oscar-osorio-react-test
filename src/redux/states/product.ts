import { Product } from "@/models/product";
import { deleteItemLocalStorage, getLocalStorage, setLocalStorage } from "@/utilities";
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
            const filteredState = current(state).filter((product: Product ) => String(product.id) !== String(action.payload))
            setLocalStorage('products', JSON.stringify(filteredState))
            deleteItemLocalStorage(action.payload)
            state = filteredState
            return state
        },
        updateProduct: (state, action) => {
            setLocalStorage('products', JSON.stringify(action.payload))
            state = action.payload
            return state
        }
    }
})

export const {addProduct, deleteProduct, updateProduct} = ProductsSlice.actions