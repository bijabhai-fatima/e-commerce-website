import React from "react"
import "./OpenSorting.css"

type OpenSortingProp = {
    calldata: (e: string) => void
}

const OpenSorting = ({ calldata }: OpenSortingProp) => {
    const options = [
        "Recommendation",
        "Popularity",
        "Price: Low to High",
        "Price: High to Low",
        "Customer Rating",
        "reset",
    ]

    return (
        <div className="open-sorting-container">
            {options.map((item) => (
                <div
                    className="open-sorting-option"
                    onClick={() => calldata(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default OpenSorting
