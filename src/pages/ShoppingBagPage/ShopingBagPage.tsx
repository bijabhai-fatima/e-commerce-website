import React, { useEffect, useState } from "react"
import "./ShoppingBagPage.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import UnchechedIcon from "../../assets/checkUncheck/uncheckedIcon.png"
import TheIcon from "../../assets/shoppingBagSelectedIcon.png"
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom"
import Item from "./Item/Item"

const ShoppingBagPage = () => {
    const userData = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    type SelectedProductType = {
        productId: string
        userId: string
        quantity: number
        size: string
        price: number
    }
    const [shoppingBagProducts, setShoppingBagProducts] = useState([])

    const [selectedProducts, setSelectedProducts] = useState<
        SelectedProductType[]
    >([])

    const [_selectedProducts, _setSelectedProducts] = useState([""])

    const [activeMenu, setActiveMenu] = useState("shopping bag")

    const findTotalPrice = () => {
        let totalPrice = 0
        selectedProducts.forEach((element) => {
            totalPrice += element.quantity * element.price
        })
        return totalPrice
    }

    const handlePlaceOrder = () => {
        selectedProducts.forEach(async (element) => {
            await axios
                .post("http://localhost:7000/placeSingleOrder", {
                    userId: element.userId,
                    productId: element.productId,
                    quantity: element.quantity,
                    size: element.size,
                })
                .then((res) => console.log(res.data))
        })
    }

    useEffect(() => {
        async function fetchAddressData(userId: string) {
            setShoppingBagProducts(
                (
                    await axios.get(
                        `http://localhost:7000/getShoppingBag/${userData.userId}`
                    )
                ).data
                // userData.shoppingBag
            )
        }
        console.log(`http://localhost:7000/getShoppingBag/${userData.userId}`)
        fetchAddressData(userData.userId)
    }, [])
    useEffect(() => {}, [userData.shoppingBag])
    return (
        <div className="shopping-bag-conatainer">
            <div className="shopping-bag-header-container">
                <div>
                    <div
                        className={`shopping-bag-menu-item-container  ${
                            activeMenu == "shopping bag" ? "active" : ""
                        }`}
                    >
                        shopping bag
                    </div>
                    <div className="arrow"></div>
                    <div
                        className={`shopping-bag-menu-item-container  ${
                            activeMenu == "address" ? "active" : ""
                        }`}
                    >
                        address
                    </div>
                    <div className="arrow"></div>
                    <div
                        className={`shopping-bag-menu-item-container  ${
                            activeMenu == "payment" ? "active" : ""
                        }`}
                    >
                        payment
                    </div>
                </div>
            </div>
            <div className="shopping-bag-main-section-container__">
                <div className="shopping-bag-main-content-container">
                    <div className="shopping-bag-main-content-header-container">
                        <div className="upper-left-part">
                            <img
                                src={
                                    _selectedProducts.length > 0
                                        ? TheIcon
                                        : UnchechedIcon
                                }
                            />
                            <div className="upper-left-text">
                                {_selectedProducts.length}/
                                {shoppingBagProducts.length} items selected
                            </div>
                        </div>
                        <div className="upper-right-part">
                            <div className="upper-right-text">empty bag</div>
                        </div>
                    </div>
                    <div className="shopping-bag-main-content-inside-container">
                        {shoppingBagProducts.length > 0 &&
                            userData.shoppingBag.map((item) => (
                                <Item
                                    productId={item}
                                    ifChecked={_selectedProducts.includes(item)}
                                    calldata={(
                                        ifChecked,
                                        selectedSize,
                                        quantity,
                                        price
                                    ) => {
                                        if (ifChecked) {
                                            _setSelectedProducts([
                                                ..._selectedProducts,
                                                item,
                                            ])
                                            setSelectedProducts([
                                                ...selectedProducts,
                                                {
                                                    productId: item,
                                                    userId: userData.userId,
                                                    quantity: quantity,
                                                    size: selectedSize,
                                                    price: price,
                                                },
                                            ])
                                        } else {
                                            let data = _selectedProducts
                                            _setSelectedProducts(
                                                data.filter(
                                                    (element) =>
                                                        element !== item
                                                )
                                            )
                                            setSelectedProducts(
                                                selectedProducts.filter(
                                                    (element) =>
                                                        element.productId !==
                                                        item
                                                )
                                            )
                                        }
                                    }}
                                />
                            ))}
                    </div>
                </div>
                <div className="shopping-bag-side-content-container">
                    <div className="shopping-bag-side-content-header-container">
                        <div
                            className="my-account-uppertext__Home"
                            onClick={() => navigate("/")}
                        >
                            Home{" "}
                        </div>
                        <div
                            className="my-account-uppertext__Home"
                            onClick={() => navigate("/MyAccount/Details")}
                        >
                            / My Account{" "}
                        </div>
                        <div className="my-account-uppertext__MyAccount">
                            / Shopping Bag
                        </div>
                    </div>
                    <div className="shopping-bag-bag-content-inside-container">
                        <div className="price-details-title-container">
                            <div className="price-details-title">
                                price details
                            </div>
                            <div className="price-details-items">
                                {" (" + _selectedProducts.length}
                                {_selectedProducts.length == 1
                                    ? "Item)"
                                    : "Items)"}
                            </div>
                        </div>
                        <div className="bill-container">
                            <div className="bill-item-mrp">
                                <div className="bill-item-mrp-title">
                                    Total MRP
                                </div>
                                <div className="bill-item-mrp-total">
                                    {"Rs. " + findTotalPrice().toString()}
                                </div>
                            </div>
                            <div className="bill-item-shipping">
                                <div className="bill-item-shipping-title">
                                    Shipping Fee
                                </div>
                                <div className="bill-item-shipping-fee">
                                    FREE
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="bill-total">
                                <div className="bill-total-title">
                                    Total Amount
                                </div>
                                <div className="bill-total-total">
                                    {"Rs. " + findTotalPrice().toString()}
                                </div>
                            </div>
                        </div>
                        <div className="continue-button-container">
                            <button
                                className="the-button"
                                onClick={() => handlePlaceOrder()}
                            >
                                place order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingBagPage
