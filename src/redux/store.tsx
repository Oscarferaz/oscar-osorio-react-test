import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./states";

export interface AppStore {
    auth: {
        isAuthenticated: boolean
    }
}

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export default store