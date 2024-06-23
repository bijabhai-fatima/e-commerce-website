import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ProductState {
    productName: string
    productDetails: string
    productSizes: string[]
    productCategorie: string
    productSection: string
    collectionName: string
    productPrice: string
    productPhotos: any
}
const initialState: ProductState = {
    productName: "",
    productDetails: "",
    productSizes: [],
    productCategorie: "",
    productSection: "",
    collectionName: "",
    productPrice: "",
    productPhotos: null,
}

const newProductSlice = createSlice({
    name: "newProduct",
    initialState,
    reducers: {
        setProductName: (state, action: PayloadAction<string>) => {
            state.productName = action.payload
        },
        setProductPhotos: (state, action: PayloadAction<FileList | null>) => {
            state.productPhotos = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProductAsync.pending, () => {
                console.log("uploading.. pending")
            })
            .addCase(
                addNewProductAsync.fulfilled,
                (state, action: PayloadAction<string>) => {
                    // state = initialState
                }
            )
    },
})

export const addNewProductAsync = createAsyncThunk(
    "admin/addNewProductAsync",
    async (data: ProductState) => {
        console.log("inside asyc", data.productName)
        console.log("the files..", data.productPhotos)
        const formdata = new FormData()
        formdata.append("productName", data.productName)
        formdata.append("productDetails", data.productDetails)
        formdata.append("productSizes", data.productSizes.toString())
        formdata.append("productCategorie", data.productCategorie)
        formdata.append("productSection", data.productSection)
        formdata.append("collectionName", data.collectionName)
        formdata.append("productPrice", data.productPrice)

        const files = new Array<File>()
        const length = data.productPhotos.length
        let i = 0
        while (i < length) {
            console.log(data.productPhotos.item(i))
            files.push(data.productPhotos.item(i))
            formdata.append(`files`, data.productPhotos.item(i))
            ++i
        }

        const response = await axios.post(
            "http://localhost:7000/addNewProduct",
            formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        return response.data.toString()
    }
)

export const __addNewProductAsync = createAsyncThunk(
    "admin/__addNewProductAsync",
    async (data: ProductState) => {
        console.log("inside asyc", data.productName)
        console.log("the urls..", data.productPhotos)
        const formdata = new FormData()
        formdata.append("productName", data.productName)
        formdata.append("productDetails", data.productDetails)
        formdata.append("productSizes", data.productSizes.toString())
        formdata.append("productCategorie", data.productCategorie)
        formdata.append("productSection", data.productSection)
        formdata.append("collectionName", data.collectionName)
        formdata.append("productPrice", data.productPrice)
        formdata.append("productPhotoUrls", data.productPhotos)

        const response = await axios.post(
            "http://localhost:7000/__addNewProduct",
            formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        return response.data.toString()
    }
)
export const { setProductName, setProductPhotos } = newProductSlice.actions

export default newProductSlice.reducer

export type { ProductState }
