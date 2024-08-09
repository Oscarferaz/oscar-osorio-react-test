import { configureStore } from "@reduxjs/toolkit";
import { authSlice, ProductsSlice } from "./states";
import { Product } from "@/models/product";

export interface AppStore {
    auth: {
        isAuthenticated: boolean
    },
    products: Product[]
}

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: ProductsSlice.reducer
    }
})

export default store