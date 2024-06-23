import React, { useEffect } from "react"
import "./Filter.css"
import CheckedIcon from "../../../assets/checkUncheck/checkedIcon.png"
import UnCheckedIcon from "../../../assets/checkUncheck/uncheckedIcon.png"
import { FilterType } from "../../../data/FiltersData"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../state/store"
import { setSelectedOptions } from "../../../state/filters/filtersSlice"
import { getProductsFilteredAsync } from "../../../state/productList/productListSlice"

type FilterType_ = {
    filter: FilterType
    selectedOptionIndexs: number[]
}

const Filter = ({ filter, selectedOptionIndexs }: FilterType_) => {
    const filters = useSelector((state: RootState) => state.filters)

    const dispatch = useDispatch<AppDispatch>()

    // const handleClick = (index: number) => {
    //     var selectedOptions = selectedOptionIndexs
    //     selectedOptions.push(index)
    //     console.log("handle click...", selectedOptions)
    //     calldata(selectedOptions)
    // }

    useEffect(() => {
        console.log("filter renders...", selectedOptionIndexs)
        dispatch(getProductsFilteredAsync(filters))
    }, [filters])

    return (
        <div className="filter-container">
            <div className="filter-title">{filter.filterName}</div>
            <div className="filter-options-container">
                {filter.filterOptions.map((item, index) => (
                    <div className="filter-option-container">
                        <img
                            src={
                                selectedOptionIndexs.includes(index)
                                    ? CheckedIcon
                                    : UnCheckedIcon
                            }
                            onClick={async () => {
                                var selectedOptions = [...selectedOptionIndexs]
                                if (!selectedOptions.includes(index)) {
                                    selectedOptions.push(index)
                                    console.log("asaasasa....", selectedOptions)
                                    dispatch(
                                        setSelectedOptions({
                                            filterName: filter.filterName,
                                            selectedOptions: selectedOptions,
                                        })
                                    )
                                } else {
                                    selectedOptions = selectedOptions.filter(
                                        (item) => item !== index
                                    )
                                    console.log("asaasasa....", selectedOptions)
                                    dispatch(
                                        setSelectedOptions({
                                            filterName: filter.filterName,
                                            selectedOptions: selectedOptions,
                                        })
                                    )
                                }
                            }}
                        />
                        <div className="filter-option-name">
                            {item.toString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter
