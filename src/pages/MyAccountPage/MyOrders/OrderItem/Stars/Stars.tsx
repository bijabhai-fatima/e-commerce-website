import React from "react"
import "./Stars.css"
import HollowStar from "../../../../../assets/hollowStart.png"
import FilledStar from "../../../../../assets/filledStar.png"

type StarsType = {
    selectedStars: number
    calldata: (e: number) => void
}

const Stars = ({ selectedStars, calldata }: StarsType) => {
    const stars = [0, 1, 2, 3, 4]

    return (
        <div className="stars-container">
            {stars.map((index, item) =>
                index < selectedStars ? (
                    <img
                        id={index.toString()}
                        src={FilledStar}
                        onClick={() => calldata(index + 1)}
                    />
                ) : (
                    <img
                        id={index.toString()}
                        src={HollowStar}
                        onClick={() => calldata(index + 1)}
                    />
                )
            )}
        </div>
    )
}

export default Stars
