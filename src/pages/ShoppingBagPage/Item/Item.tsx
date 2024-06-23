import React, { useEffect, useState } from "react"
import CheckedIcon from "../../../assets/checkUncheck/checkedIcon.png"
import UnCheckedIcon from "../../../assets/checkUncheck/uncheckedIcon.png"
import SortIcon from "../../../assets/sortIcon.png"
import PlusIcon from "../../../assets/plusMinus/plusIcon.png"
import MinusIcon from "../../../assets/plusMinus/minusIcon.png"
import CloseIcon from "../../../assets/closeNotificationIcon.png"
import "./Item.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../state/store"
import axios from "axios"
import { getUpdatedUserStateAsync } from "../../../state/user/userSlice"

type ItemProps = {
    productId: string
    ifChecked: boolean
    calldata: (e: boolean, f: string, g: number, h: number) => void
}

const Item = ({ productId, ifChecked, calldata }: ItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const userData = useSelector((state: RootState) => state.user)

    const [ifOpen, setIfOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const [productData, setProductData] = useState<any>(null)

    const [selectedSize, setSelectedSize] = useState(
        productData && productData.product.productSizes[0]
    )
    useEffect(() => {
        console.log("just rendered", ifChecked)
        async function fetchProductData(productId: string) {
            console.log(
                await axios.get(
                    `http://localhost:7000/getProductById/${productId}`
                )
            )
            setProductData(
                (
                    await axios.get(
                        `http://localhost:7000/getProductById/${productId}`
                    )
                ).data
            )
        }
        if (productId) fetchProductData(productId)
    }, [])

    useEffect(() => {
        setIfOpen(false)
    }, [selectedSize])

    useEffect(() => {
        if (productData) {
            setSelectedSize(productData.product.productSizes[0])
        }
    }, [productData])
    return (
        <div className="shopping-bag-item-container">
            <div className="shopping-bag-item-photo-container">
                <div
                    className="product-checkbox-container"
                    onClick={() =>
                        calldata(
                            !ifChecked,
                            selectedSize,
                            quantity,
                            productData.product.productPrice
                        )
                    }
                >
                    <img src={ifChecked ? CheckedIcon : UnCheckedIcon} />
                </div>
                <div className="product-photo-container">
                    {productData && (
                        <img
                            src={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${productData.product.productPhotos[0].replace(
                                " ",
                                ""
                            )}`}
                        />
                    )}
                </div>
            </div>
            <div className="shoppingbag-content-container">
                <div className="shopping-bag-item-content-container">
                    <div className="shopping-bag-item-name-container">
                        <div className="shopping-bag-item-product-name">
                            {productData && productData.product.productName}
                        </div>
                        <img
                            src={CloseIcon}
                            onClick={async () => {
                                await axios
                                    .post(
                                        "http://localhost:7000/removeProductFromShoppingCart",
                                        {
                                            productId: productId,
                                            userId: userData.userId,
                                        }
                                    )
                                    .then((res) => console.log(res))
                                dispatch(
                                    getUpdatedUserStateAsync({
                                        email: userData.email,
                                        password: userData.password,
                                    })
                                )
                            }}
                        />
                    </div>
                    <div
                        className="shopping-bag-item-product-sizes-container"
                        onClick={() => setIfOpen(true)}
                    >
                        <div>
                            <div className="shopping-bag-item-product-specification-title">
                                Size:
                            </div>
                            <div className="shopping-bag-item-product-sizes-title">
                                <div className="product-size-item">
                                    {selectedSize}
                                </div>
                                <img src={SortIcon} />
                            </div>
                        </div>
                        {ifOpen && (
                            <div className="shopping-bag-item-product-sizes-open-container">
                                {productData &&
                                    productData.product.productSizes.map(
                                        (item: string) => (
                                            <div
                                                className="product-size-item"
                                                onClick={() => {
                                                    setSelectedSize(item)
                                                }}
                                            >
                                                {item}
                                            </div>
                                        )
                                    )}
                            </div>
                        )}
                    </div>
                    <div className="shopping-bag-item-product-quantity-container">
                        <div className="shopping-bag-item-product-specification-title">
                            Quy:
                        </div>
                        <div
                            className="shoppingbag-minus-container"
                            onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1)
                                }
                            }}
                        >
                            <img src={MinusIcon} />
                        </div>
                        <div className="shopping-bag-item-product-quy-title">
                            <div className="product-size-item">{quantity}</div>
                        </div>
                        <div
                            className="shoppingbag-plus-container"
                            onClick={() => {
                                if (quantity < 12) {
                                    setQuantity(quantity + 1)
                                }
                            }}
                        >
                            <img src={PlusIcon} />
                        </div>
                    </div>
                </div>
                <div className="shopping-bag-item-price-container">
                    {productData &&
                        "Rs. " + productData.product.productPrice.toString()}
                </div>
            </div>
        </div>
    )
}

export default Item
