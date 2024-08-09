import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        
        logout: (state) => {
            state.isAuthenticated = false
        }
    }


})

export const {login, logout} = authSlice.actions