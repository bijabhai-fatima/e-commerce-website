import one from "../assets/smapleProductPhotos/one.png"
import two from "../assets/smapleProductPhotos/two.png"
import three from "../assets/smapleProductPhotos/three.png"

export const sampleProductData = {
    productName: "Zip-Front Slim Fit Bomber Jacket",
    productDetails: [
        "Insert pockets",
        "Ribbed cuffs, neckline and hemline",
        "Slim Fit",
        "Package contains: 1 jacket",
        "Dry clean",
        "94% polyester, 6% spandex",
    ],
    productSizes: ["S", "L", "XL"],
    productCategorie: "men",
    productSection: "shirts",
    collectionName: "summer 24",
    productPrice: "999",
    productPhotos: [one, two, three],
    productRaitng: 4.22,
    productReviews: [
        {
            useName: "alex",
            stars: 4,
            content: "Material is to soft and comfortable go for it...",
            TimeStamp: new Date("2011-04-20T09:30:51.01"),
        },
        {
            useName: "alex",
            stars: 2,
            content: "Did not like it.",
            TimeStamp: new Date("2011-04-20T09:30:51.01"),
        },
    ],
}
