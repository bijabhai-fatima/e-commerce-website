import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface OrdersState {
    orders: OrderType[]
}

type OrderType = {
    orderId: string
    productId: string
    state: string
    image: string
    name: string
    quantity: number
    size: string
}

const initialState: OrdersState = {
    orders: [],
}
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderType[]>) => {
            console.log("action..", action.payload)
            state.orders = action.payload
        },
        pushOrder: (state, action: PayloadAction<OrderType>) => {
            console.log("actiom....", action.payload)
            state.orders.push(action.payload)
        },
    },
})

export const { setOrders, pushOrder } = ordersSlice.actions

export default ordersSlice.reducer

export type { OrderType }
