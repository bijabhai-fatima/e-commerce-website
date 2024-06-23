import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface AdminState {
    status: boolean
    name: string
}

interface Admin {
    email: string
    password: string
}

const initialState: AdminState = {
    status: false,
    name: "",
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminState: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logInAdminAsync.pending, () => {
                console.log("increment async pendign")
            })
            .addCase(
                logInAdminAsync.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.name = action.payload
                    state.status = true
                }
            )
    },
})

export const logInAdminAsync = createAsyncThunk(
    "admin/logInAdminAsync",
    async (data: Admin) => {
        const response = await axios.post("http://localhost:7000/adminLogIn", {
            email: data.email,
            password: data.password,
        })
        return response.data.toString()
    }
)

export const { setAdminState } = adminSlice.actions

export default adminSlice.reducer

export type { Admin }
