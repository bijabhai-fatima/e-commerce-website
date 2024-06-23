import React from "react"
import "./Item.css"
import { useNavigate } from "react-router-dom"

type ItemProp = {
    photo: string
    name: string
    price: string
    productId: any
}

const Item = ({ photo, name, price, productId }: ItemProp) => {
    const navigate = useNavigate()

    return (
        <div className="Item-container">
            <img
                src={photo}
                onClick={() => navigate(`/product/${productId}`)}
            />
            <div className="Item-name">{name}</div>
            <div className="Item-price">{price}</div>
        </div>
    )
}

export default Item
