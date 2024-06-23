import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ProductType } from "../../pages/ProductListPage/ProductListPage"
import { Buffer } from "buffer"
import { filtersData } from "../../data/FiltersData"

interface ProductListState {
    ProductList: ProductType[]
}
const initialState: ProductListState = {
    ProductList: [],
}

const newProductSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        setProductList: (state, action: PayloadAction<ProductType[]>) => {
            console.log("action..", action.payload)
            state.ProductList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, () => {
                console.log("uploading.. pending")
            })
            .addCase(
                getProductsAsync.fulfilled,
                (state, action: PayloadAction<ProductType[]>) => {
                    console.log("fullfilled..", action.payload)
                    state.ProductList = action.payload
                }
            ),
            builder
                .addCase(getProductsBySearchQueryAsync.pending, () => {
                    console.log("uploading.. pending")
                })
                .addCase(
                    getProductsBySearchQueryAsync.fulfilled,
                    (state, action: PayloadAction<ProductType[]>) => {
                        console.log("fullfilled..", action.payload)
                        state.ProductList = action.payload
                    }
                ),
            builder
                .addCase(getProductsFilteredAsync.pending, () => {
                    console.log("uploading.. pending")
                })
                .addCase(
                    getProductsFilteredAsync.fulfilled,
                    (state, action: PayloadAction<ProductType[]>) => {
                        console.log("fullfilled..", action.payload)
                        state.ProductList = action.payload
                    }
                )
    },
})

export const getProductsAsync = createAsyncThunk(
    "productList/getProductsAsync",
    async (section: string) => {
        const response = await axios.get(
            `http://localhost:7000/getProducts/${section}`
        )
        console.log(response.data.length)
        var productList_: ProductType[] = []

        response.data.forEach((item: any) => {
            var product_: ProductType = {
                productId: item._id,
                productName: item.productName,
                productDetails: item.productDetails,
                productSizes: item.productSizes,
                productCategorie: item.productCategorie,
                productSection: item.productSection,
                collectionName: item.collectionName,
                productPrice: item.productPrice,
                productPhotos: item.productPhotos,
                productRating: item.productRating,
                productReviews: item.productReviews,
            }
            productList_.push(product_)
        })

        console.log(productList_)
        // const Final: ProductListState = {
        //     ProductList: productList_,
        // }
        // console.log(Final)
        return productList_
    }
)

export const getProductsBySearchQueryAsync = createAsyncThunk(
    "productList/getProductsBySearchQueryAsync",
    async (searchQuery: string) => {
        const response = await axios.get(
            `http://localhost:7000/getSearchResults/${searchQuery}`
        )
        console.log(response.data.length)
        var productList_: ProductType[] = []

        response.data.forEach((item: any) => {
            var product_: ProductType = {
                productId: item._id,
                productName: item.productName,
                productDetails: item.productDetails,
                productSizes: item.productSizes,
                productCategorie: item.productCategorie,
                productSection: item.productSection,
                collectionName: item.collectionName,
                productPrice: item.productPrice,
                productPhotos: item.productPhotos,
                productRating: item.productRating,
                productReviews: item.productReviews,
            }
            productList_.push(product_)
        })

        console.log(productList_)
        // const Final: ProductListState = {
        //     ProductList: productList_,
        // }
        // console.log(Final)
        return productList_
    }
)

export const getProductsFilteredAsync = createAsyncThunk(
    "productList/getProductsFilteredAsync",
    async (filters: any) => {
        console.log(filters)
        const categories: string[] = []
        filters.CatagoryState.selectedOptions.forEach((index: number) =>
            categories.push(filtersData[0].filterOptions[index])
        )
        const prices: string[] = []
        filters.PriceState.selectedOptions.forEach((index: number) =>
            prices.push(filtersData[1].filterOptions[index])
        )
        const ratings: string[] = []
        filters.RatingState.selectedOptions.forEach((index: number) =>
            ratings.push(filtersData[3].filterOptions[index])
        )
        const response = await axios.get(
            `http://localhost:7000/getProductsByFilters/${
                categories.toString().length == 0
                    ? "default"
                    : categories.toString()
            }/${
                prices.toString().length == 0 ? "default" : prices.toString()
            }/${
                ratings.toString().length == 0 ? "default" : ratings.toString()
            }`
        )
        console.log(response.data)
        var productList_: ProductType[] = []

        response.data.forEach((item: any) => {
            var product_: ProductType = {
                productId: item._id,
                productName: item.productName,
                productDetails: item.productDetails,
                productSizes: item.productSizes,
                productCategorie: item.productCategorie,
                productSection: item.productSection,
                collectionName: item.collectionName,
                productPrice: item.productPrice,
                productPhotos: item.productPhotos,
                productRating: item.productRating,
                productReviews: item.productReviews,
            }
            productList_.push(product_)
        })

        console.log(productList_)
        return productList_
    }
)

export const { setProductList } = newProductSlice.actions

export default newProductSlice.reducer

export type { ProductListState }
