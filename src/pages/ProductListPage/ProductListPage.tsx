import React, { useEffect, useState } from "react"
import "./ProductListPage.css"

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { menSectionData } from "../../data/menSectionData"
import Filter from "./Filter/Filter"
import { filtersData } from "../../data/FiltersData"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import Item from "../LandingPage/Item/Item"
import Pagination from "../../components/Pagination/Pagination"
import { womenSectionData } from "../../data/womenSectionData"
import SortIcon from "../../assets/sortIcon.png"
import OpenSorting from "./OpenSorting/OpenSorting"
import {
    getProductsAsync,
    getProductsBySearchQueryAsync,
    setProductList,
} from "../../state/productList/productListSlice"
import {
    resetSelectedOptions,
    setSelectedOptions,
} from "../../state/filters/filtersSlice"

type ProductType = {
    productId: any
    productName: string
    productDetails: string[]
    productSizes: string[]
    productCategorie: string
    productSection: string
    collectionName: string
    productPrice: Number
    productPhotos: string[]
    productRating: number
    productReviews: any[]
}

const ProductListPage = () => {
    const { id } = useParams()
    const { searchquery } = useParams()

    const uri = useLocation()

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const productsData = useSelector(
        (state: RootState) => state.productList.ProductList
    )

    const [openSort, setOpenSort] = useState(false)
    const [option, setOption] = useState("reset")

    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = 8
    const [totalPages, setTotalPages] = useState<number>(
        productsData.length / pageSize
    )

    const catagoryFilter = useSelector(
        (state: RootState) => state.filters.CatagoryState
    )
    const priceFilterData = useSelector(
        (state: RootState) => state.filters.PriceState
    )
    const colorFilterData = useSelector(
        (state: RootState) => state.filters.ColorState
    )
    const ratingFilterData = useSelector(
        (state: RootState) => state.filters.RatingState
    )

    useEffect(() => {
        var urlTemp = window.location.pathname.split("/")
        console.log(urlTemp[urlTemp.length - 1])
        if (searchquery) {
            console.log("we are search quering..", searchquery)
            dispatch(getProductsBySearchQueryAsync(searchquery))
        } else if (id) {
            dispatch(getProductsAsync(id))
        } else {
            dispatch(getProductsAsync(urlTemp[urlTemp.length - 1].toString()))
        }
        dispatch(resetSelectedOptions())
    }, [uri.pathname])

    useEffect(() => {
        if (option == "Price: Low to High") {
            dispatch(
                setProductList(
                    [...productsData].sort(
                        (a, b) =>
                            Number(a.productPrice) - Number(b.productPrice)
                    )
                )
            )
        } else if (option == "Price: High to Low") {
            dispatch(
                setProductList(
                    [...productsData].sort(
                        (a, b) =>
                            Number(b.productPrice) - Number(a.productPrice)
                    )
                )
            )
        }
    }, [option])

    return (
        <div className="product-list-container">
            <div className="product-list-filters-section-container">
                <div className="product-list-filtered-title">Filters</div>
                <div className="product-list-filteres-container">
                    <Filter
                        filter={catagoryFilter.filterData}
                        selectedOptionIndexs={catagoryFilter.selectedOptions}
                    />
                    <Filter
                        filter={priceFilterData.filterData}
                        selectedOptionIndexs={priceFilterData.selectedOptions}
                    />
                    <Filter
                        filter={ratingFilterData.filterData}
                        selectedOptionIndexs={ratingFilterData.selectedOptions}
                    />
                    <Filter
                        filter={colorFilterData.filterData}
                        selectedOptionIndexs={colorFilterData.selectedOptions}
                    />
                </div>
            </div>
            <div className="product-list-main-content-container">
                <div className="product-list-header-section-container">
                    <div className="product-list-header-section-title">
                        <div
                            className="my-account-uppertext__Home"
                            onClick={() => navigate("/")}
                        >
                            Home{" "}
                        </div>
                        <div className="my-account-uppertext__MyAccount">
                            {id
                                ? ` / ${id}'s clothing`
                                : ` / Results for ${searchquery}`}
                        </div>
                    </div>
                    <div className="product-list-header-sort-section-container">
                        <div
                            className="product-list-header-sort-section-container__inside"
                            onMouseEnter={() => {
                                setOpenSort(true)
                            }}
                        >
                            <div className="product-list-header-sort-text">
                                {option == "reset" ? "Sort By:" : option}
                            </div>
                            <div className="product-list-header-sort-icon-container">
                                <img src={SortIcon} />
                            </div>
                        </div>

                        {openSort && (
                            <div onMouseLeave={() => setOpenSort(false)}>
                                <OpenSorting
                                    calldata={(value) => setOption(value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="product-list-content-container">
                    {productsData
                        .slice(
                            (currentPage - 1) * pageSize,
                            (currentPage - 1) * pageSize + pageSize
                        )
                        .map((item) => (
                            <Item
                                photo={`https://cyan-civic-cow-717.mypinata.cloud/ipfs/${item.productPhotos[0].replace(
                                    " ",
                                    ""
                                )}`}
                                name={item.productName}
                                price={`₹${item.productPrice.toString()}`}
                                productId={item.productId}
                            />
                        ))}
                </div>
                <div className="product-list-pagenation-container">
                    <Pagination
                        pageSize={pageSize}
                        currentPage={currentPage}
                        callback={(value) => setCurrentPage(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductListPage
export type { ProductType }
