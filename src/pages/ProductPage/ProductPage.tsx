import React, { useEffect, useState } from "react"
import "./ProductPage.css"
import { useNavigate, useRouteLoaderData } from "react-router-dom"
// import { sampleProductData } from "../../data/SampleProductData"
import ArrowIcon from "../../assets/arrowIcon.png"
import FilledStarIcon from "../../assets/filledStar.png"
import HollowStarIcon from "../../assets/hollowStart.png"
import { menSectionData } from "../../data/menSectionData"
import Item from "../LandingPage/Item/Item"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../state/store"
import axios from "axios"
import { getUpdatedUserStateAsync } from "../../state/user/userSlice"

const ProductPage = () => {
    const navigate = useNavigate()

    const userData = useSelector((state: RootState) => state.user)
    const productList = useSelector((state: RootState) => state.productList)

    const dispatch = useDispatch<AppDispatch>()

    const [productId, setProductId] = useState<string>("")
    const [productData, setProductData] = useState<any>()
    const [productReviews, setProductReviews] = useState<any>([])

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const [activePhoto, setActivePhoto] = useState(
        productData ? productData.productPhotos[0] : null
    )

    const [selectedSize, setSelectedSize] = useState<string>()

    const fetchproductData = async (productId: any) => {
        const response = await axios.get(
            `http://localhost:7000/getProductById/${productId}`
        )
        console.log(response)
        return response.data
    }

    useEffect(() => {
        var urlTemp = window.location.pathname.split("/")
        setProductId(urlTemp[urlTemp.length - 1])

        async function fetchDataAndSubscribe() {
            const data = await fetchproductData(urlTemp[urlTemp.length - 1])
            setProductData(data.product)
            setProductReviews(data.productReviews)
        }
        fetchDataAndSubscribe()
    }, [])

    return (
        <div className="product-page-container">
            {productData && (
                <>
                    <div className="product-page-product-container">
                        <div className="product-page-product-photos-container">
                            <div className="main-big-pictures-container">
                                <div className="left-arrow-container">
                                    <img
                                        src={ArrowIcon}
                                        onClick={() =>
                                            setActivePhoto(
                                                productData.productPhotos[
                                                    (productData.productPhotos.indexOf(
                                                        activePhoto
                                                    ) -
                                                        1) %
                                                        productData
                                                            .productPhotos
                                                            .length
                                                ]
                                            )
                                        }
                                    />
                                </div>
                                {activePhoto ? (
                                    <img
                                        src={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${activePhoto.replace(
                                            " ",
                                            ""
                                        )}`}
                                    />
                                ) : (
                                    <img
                                        src={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${productData.productPhotos[0].replace(
                                            " ",
                                            ""
                                        )}`}
                                    />
                                )}
                                <div className="right-arrow-container">
                                    <img
                                        src={ArrowIcon}
                                        onClick={() =>
                                            setActivePhoto(
                                                productData.productPhotos[
                                                    (productData.productPhotos.indexOf(
                                                        activePhoto
                                                    ) +
                                                        1) %
                                                        productData
                                                            .productPhotos
                                                            .length
                                                ]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="little-pictures-container">
                                {productData.productPhotos.map(
                                    (item: string) => (
                                        <div
                                            className={`${
                                                item === activePhoto
                                                    ? "no-filter"
                                                    : "yes-filter"
                                            } `}
                                        >
                                            <img
                                                src={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${item.replace(
                                                    " ",
                                                    ""
                                                )}`}
                                                onClick={() =>
                                                    setActivePhoto(item)
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="product-page-product-content-container">
                            <div className="product-page-product-title-container">
                                <div
                                    className="my-account-uppertext__Home"
                                    onClick={() => navigate("/")}
                                >
                                    Home /
                                </div>
                                <div
                                    className="my-account-uppertext__Home"
                                    onClick={() => navigate("/")}
                                >
                                    men /
                                </div>
                                <div className="parduct-title-categorie">
                                    {productData.productSection}
                                </div>
                            </div>
                            <div className="product-content-name">
                                {productData.productName}
                            </div>
                            <div className="product-content-price">
                                {"₹" + productData.productPrice}
                            </div>
                            <div className="product-content-rating">
                                <div className="product-stars-container">
                                    {new Array(1, 2, 3, 4, 5).map((item) => (
                                        <img
                                            src={
                                                item <=
                                                productData.productRating
                                                    ? FilledStarIcon
                                                    : HollowStarIcon
                                            }
                                        />
                                    ))}
                                </div>
                                <div>{`(${
                                    productData.productRating
                                        ? productData.productRating
                                        : "0"
                                }/5.0)`}</div>
                                <div className="dot">-</div>
                                <div>
                                    {productData.productReviews.length} Reviews
                                </div>
                            </div>
                            <div className="product-content-sizes">
                                <div className="product-content-sizes-title">
                                    Available Sizes
                                </div>
                                <div className="product-content-sizes-container">
                                    {productData.productSizes.map(
                                        (item: string) => (
                                            <div
                                                className={`product-content-single-size ${
                                                    selectedSize === item
                                                        ? "active-size"
                                                        : ""
                                                }`}
                                            >
                                                {item}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="product-content-details">
                                <div className="product-content-details-title">
                                    Product Details
                                </div>
                                <ul className="product-content-details-container">
                                    {productData.productDetails.map(
                                        (item: string) => (
                                            <li>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={async () => {
                                    await axios
                                        .post(
                                            "http://localhost:7000/addProductToCart",
                                            {
                                                productId: productData._id,
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
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                    <div className="product-page-reviews-container">
                        <div className="product-page-reviews-title-container">
                            <div className="line"></div>
                            <div className="product-reviews-title">Reviews</div>
                            <div className="line"></div>
                        </div>
                        <div className="product-page-reviews-content-container">
                            {productReviews.map((item: any) => (
                                <div className="product-page-single-review-container">
                                    <div className="product-page-single-review-header-container">
                                        <div className="product-page-single-review-use-name">
                                            {item.username}
                                        </div>
                                        <div className="product-page-single-review-timestamp-container">
                                            {new Date(
                                                item.TimeStamp
                                            ).getDate() +
                                                " " +
                                                monthNames[
                                                    new Date(
                                                        item.TimeStamp
                                                    ).getMonth()
                                                ] +
                                                " " +
                                                new Date(
                                                    item.TimeStamp
                                                ).getFullYear()}
                                        </div>
                                    </div>
                                    <div className="product-page-siggle-review-stars-container">
                                        {new Array(1, 2, 3, 4, 5).map(
                                            (_item) => (
                                                <img
                                                    src={
                                                        _item <= item.stars
                                                            ? FilledStarIcon
                                                            : HollowStarIcon
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="product-page-single-review-content">
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product-page-reviews-container">
                        <div className="product-page-reviews-title-container">
                            <div className="line"></div>
                            <div className="product-reviews-title">
                                Simmilar Styles
                            </div>
                            <div className="line"></div>
                        </div>
                        <div className="product-page-simmilar-styler-container">
                            {productList.ProductList.map((item) =>
                                item.productCategorie ===
                                productData.productCategorie ? (
                                    <Item
                                        photo={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${item.productPhotos[0].replace(
                                            " ",
                                            ""
                                        )}`}
                                        name={item.productName}
                                        price={`₹${item.productPrice.toString()}`}
                                    />
                                ) : (
                                    ""
                                )
                            )}
                        </div>
                    </div>
                    <div className="product-page-reviews-container">
                        <div className="product-page-reviews-title-container">
                            <div className="line"></div>
                            <div className="product-reviews-title">
                                Recently Viewed
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductPage
