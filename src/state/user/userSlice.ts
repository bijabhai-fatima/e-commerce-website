import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface UserState {
    status: boolean
    userId: string
    name: string
    email: string
    password: string
    phoneNo: string[]
    birthdate: any
    addresses: string[]
    shoppingBag: string[]
    orders: string[]
}

interface User {
    email: string
    password: string
}

const initialState: UserState = {
    status: false,
    userId: "",
    name: "",
    email: "",
    password: "",
    phoneNo: [],
    birthdate: null,
    addresses: [],
    shoppingBag: [],
    orders: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<string>) => {
            state.status = true
            state.name = action.payload
        },
        setUserStateToFalse: (state) => {
            state.status = false
            state.name = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logInAsync.pending, () => {
                console.log("increment async pendign")
            })
            .addCase(
                logInAsync.fulfilled,
                (state, action: PayloadAction<any>) => {
                    console.log("fullfilled...")
                    state.userId = action.payload._id
                    state.name = action.payload.name
                    state.status = true
                    state.email = action.payload.email
                    state.password = action.payload.password
                    state.phoneNo.push(action.payload.phoneNo[0])
                    state.addresses.push(action.payload.addresses[0])
                    state.birthdate = new Date(action.payload.birthDate)
                    state.shoppingBag = action.payload.shoppingBag
                    state.orders = action.payload.orders
                }
            )
            .addCase(getUpdatedUserStateAsync.pending, () => {
                console.log("update use state async pendign")
            })
            .addCase(
                getUpdatedUserStateAsync.fulfilled,
                (state, action: PayloadAction<any>) => {
                    console.log("fullfilled...")
                    state.userId = action.payload._id
                    state.name = action.payload.name
                    state.status = true
                    state.email = action.payload.email
                    state.password = action.payload.password
                    state.phoneNo.push(action.payload.phoneNo[0])
                    state.addresses.push(action.payload.addresses[0])
                    state.birthdate = new Date(action.payload.birthDate)
                    state.shoppingBag = action.payload.shoppingBag
                    state.orders = action.payload.orders
                }
            )
    },
})

export const logInAsync = createAsyncThunk(
    "user/logInAsync",
    async (data: User) => {
        const response = await axios.post("http://localhost:7000/LogIn", {
            email: data.email,
            password: data.password,
        })
        console.log(response)
        return response.data
    }
)

export const getAddressAsync = createAsyncThunk(
    "user/getAddressAsync",
    async (addressId: string) => {
        const response = await axios.get(
            `http://localhost:7000/getAddress/${addressId}`
        )
        console.log(response)
        return response.data
    }
)

export const getUpdatedUserStateAsync = createAsyncThunk(
    "user/getUpdatedUserStateAsync",
    async (data: User) => {
        const response = await axios.post("http://localhost:7000/LogIn", {
            email: data.email,
            password: data.password,
        })
        console.log(response)
        return response.data
    }
)

export const { setUserState, setUserStateToFalse } = userSlice.actions

export default userSlice.reducer

export type { User }
