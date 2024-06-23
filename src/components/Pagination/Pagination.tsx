import React, { useEffect } from "react"
import "./Pagination.css"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

type PaginationProp = {
    pageSize: number
    currentPage: number
    callback: (e: number) => void
}

const Pagination = ({ pageSize, currentPage, callback }: PaginationProp) => {
    const productList = useSelector(
        (state: RootState) => state.productList.ProductList
    )

    const pageArray = Array.from(
        { length: Math.ceil(productList.length / pageSize) },
        (_, index) => index + 1
    )

    useEffect(() => {}, [productList])

    return (
        <div className="pagination-container">
            <div className="previus-botton-container">
                <button
                    onClick={() => {
                        if (currentPage !== 1) {
                            callback(currentPage - 1)
                        }
                    }}
                >
                    previus
                </button>
            </div>
            <div className="pages-container">
                {pageArray.map((item) => (
                    <div
                        className={`page ${
                            item == currentPage && "page-active"
                        }`}
                        onClick={() => callback(item)}
                    >
                        {item.toString()}
                    </div>
                ))}
            </div>
            <div className="next-botton-container">
                <button
                    onClick={() => {
                        if (currentPage !== pageArray.length) {
                            callback(currentPage + 1)
                        }
                    }}
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default Pagination
