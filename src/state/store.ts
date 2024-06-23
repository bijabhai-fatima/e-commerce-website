import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "./admin/adminSlice"
import newProuctReducer from "./newProduct/newProductSlice"
import userReducer from "./user/userSlice"
import filtersReducer from "./filters/filtersSlice"
import productListReducer from "./productList/productListSlice"
import ordersReducer from "./orders/ordersSlice"

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        newProduct: newProuctReducer,
        user: userReducer,
        filters: filtersReducer,
        productList: productListReducer,
        orders: ordersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
