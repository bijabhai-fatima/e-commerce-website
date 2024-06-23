import { ItemType } from "./ItemType"
import one from "../assets/men_section/one.png"
import two from "../assets/men_section/two.png"
import three from "../assets/men_section/three.png"
import four from "../assets/men_section/four.png"
import five from "../assets/men_section/five.png"
import six from "../assets/men_section/six.png"
import seven from "../assets/men_section/seven.png"
import eight from "../assets/men_section/eight.png"

export const menSectionData: ItemType[] = [
    {
        id: 1,
        name: "Regular Fit Short-sleeved shirt",
        price: 999,
        image: one,
    },
    { id: 2, name: "Zip-through hoodie", price: 1299, image: two },
    { id: 3, name: "Regular Fit T-shirt", price: 999, image: three },
    {
        id: 4,
        name: "Relaxed Fit Denim jacket",
        price: 399,
        image: four,
    },
    { id: 5, name: "Loose Fit T-shirt", price: 999, image: five },
    {
        id: 6,
        name: "Loose Fit Parachute trousers",
        price: 1999,
        image: six,
    },
    {
        id: 7,
        name: "Regular Fit Oxford shirt",
        price: 1299,
        image: seven,
    },
    { id: 8, name: "Loose Jeans", price: 1299, image: eight },
]
