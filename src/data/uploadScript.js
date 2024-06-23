import axios from "axios"

const menSectionData = [
    {
        id: 1,
        name: "Zip-through hoodie",
        price: 1499,
        catagory: "hoodies",
        productPhotos: [
            "QmeRuBmufKSmXCjwgujuh3PiM2rXyxneRsxs1cdXg6fpP3",
            "QmdHpg8CGa3hzTpRKCpj9f2TKaj6BuvtTm5XH1bM4xmrJg",
            "QmVNFhjztfwN23tngs8X4TFiUNxzxB5e6NDRH7tngotCXf",
        ],
    },
    {
        id: 2,
        name: "Resort shirt",
        price: 1299,

        catagory: "shirts",
        productPhotos: [
            "QmZbcWmMAA1YKpckVD8kuE8i7WcEDLAXuuQaoGTtu6WF5h",
            "QmZCt4GF8VuEt3A5ZwghJoWe6vd4W6sVK989KHaVXmg4Qc",
        ],
    },
    {
        id: 3,
        name: "Square-neck dress",
        price: 1499,
        catagory: "Tshirts",
        productPhotos: [
            "QmRGzCeu3vrDaYkUgUtjoE1igUhajUXJeHZbY7z7AosTWd",
            "QmSJFnQBLocigpMkAbAwJqud2raP8iu2sDforYvEozXBP6",
            "QmdoyDiphhEHcz1XfQWNTaqmVAdT5kdcoJ85VW2GAzLxCd",
        ],
    },
    {
        id: 4,
        name: "Flared High Jeans",
        price: 1299,
        catagory: "jeans",
        productPhotos: [
            "QmcUEQj7GUhmMdzENP9MP93VEgimmp5B56AEhrHZp4t5C7",
            "QmQLyiBAaWaRswPfBfsK5k1A7tjVuoLWDy9baSmBUCGNM6",
        ],
    },
    {
        id: 5,
        name: "Linen-blend circular skirt",
        price: 2499,
        catagory: "skirts",
        productPhotos: [
            "QmSGPg5Riq6zwZRoazrDYdHx6BtFRbkREGk5usoPCLs144",
            "QmYM8YhPgWTjfhGqPDuSQ9iv1SWYK8p1mRfhxhi7FwKtvj",
            "QmNyysfjZx3xuYNQhx5YbDEHpCjXW8qthGWvXQ4ZawipRQ",
        ],
    },
    {
        id: 6,
        name: "Fitted jacket",
        price: 2299,
        catagory: "jackets",
        productPhotos: [
            "QmREnoTEJsoE65sEfQN8FxsLbQ89bNVrU66pJdXiRD4M1h",
            "QmNxS2uH4r8Br86X84qTMTFERjx2jeydnRXYDUVF2S1MoU",
        ],
    },
    {
        id: 7,
        name: "Oversized shirt dress",
        price: 1499,
        catagory: "dresses",
        productPhotos: [
            "QmRxoxqWkRCPuzVP9HB6mv8R1NJtjwZzGyMUNqKWKSSqst",
            "QmdgMFM9jDtkD6K2p5NfMyRHCmb7qRKTNjpgxiqRh48LKY",
        ],
    },
    {
        id: 8,
        name: "Printed T-shirt",
        print: 399,
        catagory: "Tshirts",
        productPhotos: [
            "QmS7ZR2JutogJy5vtT46RYhQbREBZqChF5ofq2bUyMP11b",
            "QmccGnhdX7E7Rot2cDvSsryQGyYxQJFgmaU1UMVME1b42L",
        ],
    },
    {
        id: 9,
        name: "Broderie anglaise bandeau dress",
        price: 2999,

        catagory: "dresses",
        productPhotos: [
            "QmT2Dx4uEhkEFu5rRwzL44QedkLxWfd9YbRSnWGu3gWrqZ",
            "QmcyBbPypGGncW2zCUW92NDMjjZWWXZeEJHCfyc5NQC6dF",
            "QmQN9caAvzuuncoQtvXdZwAE7nwSHJRmp2DzgXutdkcDec",
        ],
    },

    {
        id: 10,
        name: "Linen-blend blazer dress",
        price: 2499,

        catagory: "dresses",
        productPhotos: [
            "QmRSBy8Y2zJJvnoFK49UA22WiJTHQM4rF5bwQsUENAXVwe",
            "QmfGa1KuR7k65JSb2icCG7SF1nammt4R9x9Gc1Cn5uM58K",
        ],
    },
    {
        id: 11,
        name: "Buckle-detail tailored trousers",
        price: 1599,

        catagory: "trousers",
        productPhotos: [
            "QmXYTym4KhgWH3CafyfYcvypUMjyzQGrk5VkieZRhHbLTY",
            "QmP2YY8okVKoSFTN4M1rTV8kXZK2EQ582zM9BzeUvchQPx",
        ],
    },

    {
        id: 12,
        name: "Pleated skirt",
        price: 2499,

        catagory: "skirts",
        productPhotos: [
            "QmQFeovZg3PMwvHf2gBEYsjC8zHTHMiRM4gno2F7FeyxYp",
            "QmRnEkkmBZJB4Eybr53AW688czLMP46Po2eNGn8V8kfWuP",
            "Qmd19AJeYrAyY62TTaBv7BUP9UBgZZRgrU4NoeAgf7xp3p",
        ],
    },
]

const __addingNewProduct = async (data) => {
    console.log("inside asyc", data.name)
    console.log("the urls..", data.productPhotos)
    const formdata = new FormData()
    formdata.append("productName", data.name)
    formdata.append(
        "productDetails",
        "Insert pockets, Ribbed cuffs, neckline and hemline, Slim Fit, Package contains: 1 jacket, Dry clean"
    )
    formdata.append("productSizes", ["M", "L"])
    formdata.append("productCategorie", data.catagory)
    formdata.append("productSection", "men")
    formdata.append("collectionName", "24")
    formdata.append("productPrice", data.price)
    formdata.append("productPhotoUrls", data.productPhotos)

    const response = await axios.post(
        "http://localhost:7000/__addNewProduct",
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
    )
    return response.data
}

menSectionData.forEach(async (element) => {
    await __addingNewProduct(element)
})
