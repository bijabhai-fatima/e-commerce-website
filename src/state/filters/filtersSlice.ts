import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FilterType, filtersData } from "../../data/FiltersData"
import axios from "axios"

type FilterState = {
    filterData: FilterType
    selectedOptions: number[]
}

type FilterPayload = {
    filterName: string
    selectedOptions: number[]
}

interface FiltersState {
    CatagoryState: FilterState
    PriceState: FilterState
    ColorState: FilterState
    RatingState: FilterState
}
const initialState: FiltersState = {
    CatagoryState: { filterData: filtersData[0], selectedOptions: [] },
    PriceState: { filterData: filtersData[1], selectedOptions: [] },
    ColorState: { filterData: filtersData[2], selectedOptions: [] },
    RatingState: { filterData: filtersData[3], selectedOptions: [] },
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSelectedOptions: (state, action: PayloadAction<FilterPayload>) => {
            console.log(
                action.payload.filterName,
                action.payload.selectedOptions
            )
            if (
                action.payload.filterName ==
                state.CatagoryState.filterData.filterName
            ) {
                state.CatagoryState.selectedOptions =
                    action.payload.selectedOptions
            } else if (
                action.payload.filterName ==
                state.ColorState.filterData.filterName
            ) {
                state.ColorState.selectedOptions =
                    action.payload.selectedOptions
            } else if (
                action.payload.filterName ==
                state.PriceState.filterData.filterName
            ) {
                state.PriceState.selectedOptions =
                    action.payload.selectedOptions
            } else {
                state.RatingState.selectedOptions =
                    action.payload.selectedOptions
            }
        },
        resetSelectedOptions: (state) => {
            state.CatagoryState.selectedOptions =
                initialState.CatagoryState.selectedOptions
            state.ColorState.selectedOptions =
                initialState.ColorState.selectedOptions
            state.PriceState.selectedOptions =
                initialState.PriceState.selectedOptions
            state.RatingState.selectedOptions =
                initialState.RatingState.selectedOptions
        },
    },
})

export const { setSelectedOptions, resetSelectedOptions } = filtersSlice.actions

export default filtersSlice.reducer

export type { FilterState }
