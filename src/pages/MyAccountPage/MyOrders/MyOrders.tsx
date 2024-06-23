import React, { useEffect, useState } from "react"
import "../OpenedMenuStyles.css"
import OrderItem from "./OrderItem/OrderItem"
import one from "../.../../../../assets/men_section/two.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../state/store"
import axios from "axios"
import {
    OrderType,
    pushOrder,
    setOrders,
} from "../../../state/orders/ordersSlice"

const MyOrders = () => {
    const userData = useSelector((state: RootState) => state.user)

    const orders = useSelector((state: RootState) => state.orders)

    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState("")
    const [image, setImage] = useState("")

    const myordersdata = [
        {
            id: 1,
            status: "delivered",
            image: one,
            name: "Zip-through hoodie",
            quantity: 1,
            size: "m",
            color: "black",
        },
        {
            id: 2,
            status: "delivered",
            image: one,
            name: "Zip-through hoodie",
            quantity: 1,
            size: "m",
            color: "black",
        },
    ]

    useEffect(() => {
        dispatch(setOrders([]))
        async function fetchOrders() {
            userData.orders.forEach(async (element) => {
                var data = await axios.get(
                    `http://localhost:7000/getOrder/${element}`
                )
                const order: OrderType = {
                    orderId: data.data._id,
                    productId: data.data.productId,
                    state: data.data.state,
                    image: data.data.image,
                    name: data.data.name,
                    quantity: data.data.quantity,
                    size: data.data.size,
                }
                dispatch(pushOrder(order))
            })
        }
        fetchOrders()
    }, [])

    return (
        <div className="my-details-container">
            <div className="my-details-title">My Orders</div>.
            {orders.orders.map((item) => (
                <OrderItem
                    productId={item.productId}
                    name={item.name}
                    status={item.state}
                    image={item.image}
                    quantity={item.quantity}
                    size={item.size}
                />
            ))}
        </div>
    )
}

export default MyOrders
