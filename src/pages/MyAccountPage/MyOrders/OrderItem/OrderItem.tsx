import React, { useState, useEffect } from "react"
import "./OrderItem.css"
import OnItsWayIcon from "../../../../assets/order_status_icon/onItsWayIcon.png"
import DeliveredIcon from "../../../../assets/order_status_icon/deliveredIcon.png"
import ReturnedIcon from "../../../../assets/order_status_icon/reternedIcon.png"
import Stars from "./Stars/Stars"
import axios from "axios"
import InputFeildButten from "../../../../components/InputFeild/InputFeildButten/InputFeildButten"
import { useSelector } from "react-redux"
import { RootState } from "../../../../state/store"

type OrderItemProp = {
    productId: string
    name: string
    status: string
    image: string
    quantity: number
    size: string
}

const OrderItem = ({
    productId,
    name,
    status,
    image,
    quantity,
    size,
}: OrderItemProp) => {
    const userId = useSelector((state: RootState) => state.user.userId)

    const [selectedStar, setSelectedStar] = useState(0)
    const [reviewContent, setReviewContent] = useState("")
    const [ifReviewed, setIfReviewed] = useState(false)

    const triggerStars = (value: number) => {
        setSelectedStar(value)
    }

    const handleReviewProduct = async () => {
        setIfReviewed(false)
        if (!(selectedStar == 0 || reviewContent == "")) {
            await axios
                .post("http://localhost:7000/reviewProduct", {
                    userId: userId,
                    stars: selectedStar,
                    content: reviewContent,
                    TimeStamp: new Date(),
                    productId: productId,
                })
                .then((res) => console.log(res.data))
        } else {
            console.log("can not add review")
        }
        setIfReviewed(true)
    }

    const handleEditReviewProduct = () => {
        setIfReviewed(false)
    }

    useEffect(() => {
        async function fetchReview() {
            console.log(productId)
            const review = (
                await axios.get(
                    `http://localhost:7000/checkIfProductIsReviewedByUser/${userId}/${productId}`
                )
            ).data
            setIfReviewed(review.content ? true : false)
            setSelectedStar(review.stars ? review.stars : 0)
            setReviewContent(review.content ? review.content : "")
        }
        fetchReview()
    }, [])

    return (
        <div className="order-item-container">
            <div className="order-item-status-container">
                <img
                    src={
                        status == "delivered"
                            ? DeliveredIcon
                            : status == "returned"
                            ? ReturnedIcon
                            : OnItsWayIcon
                    }
                />
                <div className="order-item-status">{status}</div>
            </div>
            <div className="order-item-content-container">
                <div className="order-item-image-container">
                    <img
                        src={
                            "https://cyan-civic-cow-717.mypinata.cloud/ipfs/" +
                            image.replace(" ", "")
                        }
                    />
                </div>
                <div className="order-item-data-container">
                    <div className="order-item-name">{name}</div>
                    <div className="order-item-details-container">
                        <div className="order-item-detil">{quantity}</div>
                        <div className="order-item-detil">{size}</div>
                    </div>
                    <div className="order-item-review-container">
                        <div className="order-item-review-title">
                            Review the product
                        </div>
                        <div
                            className={`order-item-stars-container ${
                                ifReviewed ? "disabled" : ""
                            }`}
                        >
                            <div className="order-item-stars-title">Rate:</div>
                            <Stars
                                selectedStars={selectedStar}
                                calldata={triggerStars}
                            />
                        </div>
                        <textarea
                            cols={50}
                            rows={4}
                            placeholder={
                                reviewContent.length > 0
                                    ? reviewContent
                                    : "Write review"
                            }
                            onChange={(e) => setReviewContent(e.target.value)}
                            disabled={ifReviewed}
                        />
                        <InputFeildButten
                            name={ifReviewed ? "edit Review" : "save Review"}
                            buttonClicked={async (value) => {
                                value == "save"
                                    ? handleReviewProduct()
                                    : handleEditReviewProduct()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem
