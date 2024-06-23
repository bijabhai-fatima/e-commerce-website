import React, { useEffect, useState } from "react"
import { Upload } from "../components"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../state/store"
import { __addNewProductAsync } from "../../state/newProduct/newProductSlice"
import "./NewProductForm.css"
import { pinFileToIPFS } from "../../pinFileToIpfs"

const NewProductForm = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [productName, setProductName] = useState<string>("")
    const [productDetails, setProductDetails] = useState<string>("")
    const [productSizes, setProductSizes] = useState<string[]>([])
    const [productCategorie, setProductCategorie] = useState<string>("")
    const [productSection, setProductSection] = useState<string>("")
    const [collectionName, setCollectionName] = useState<string>("")
    const [productPrice, setProductPrice] = useState<string>("")
    const [productPhotos, setProductPhotos] = useState<FileList | null>(null)

    let productPhotoUrls: string[] = []

    return (
        <div className="new-product-container">
            NewProductForm
            <input
                placeholder="product name"
                type="text"
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                placeholder="product details seprate with ','"
                type="text"
                onChange={(e) => setProductDetails(e.target.value)}
            />
            <input
                placeholder="product sizes seprate with ','"
                type="text"
                onChange={(e) => setProductSizes(e.target.value.split(","))}
            />
            <input
                placeholder="product categorie"
                type="text"
                onChange={(e) => setProductCategorie(e.target.value)}
            />
            <input
                placeholder="product section"
                type="text"
                onChange={(e) => setProductSection(e.target.value)}
            />
            <input
                placeholder="product collection"
                type="text"
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <input
                placeholder="product price"
                type="text"
                onChange={(e) => setProductPrice(e.target.value)}
            />
            <input
                placeholder="product photos"
                type="file"
                multiple
                onChange={(e) => setProductPhotos(e.target.files)}
            />
            {/* <Upload
                data={productPhotos}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProductPhotos(e.target.files)
                }
            /> */}
            <button
                onClick={async () => {
                    productPhotos &&
                        Array.from(productPhotos).forEach(
                            async (photo: any) => {
                                await pinFileToIPFS(photo, photo.name)
                                    .then((res) => productPhotoUrls.push(res))
                                    .then(() => {
                                        dispatch(
                                            __addNewProductAsync({
                                                productName: productName,
                                                productDetails: productDetails,
                                                productSizes: productSizes,
                                                productCategorie:
                                                    productCategorie,
                                                productSection: productSection,
                                                collectionName: collectionName,
                                                productPrice: productPrice,
                                                productPhotos: productPhotoUrls,
                                            })
                                        )
                                        setProductPhotos(null)
                                        productPhotoUrls = []
                                    })
                            }
                        )
                }}
            >
                Go
            </button>
        </div>
    )
}

export default NewProductForm
