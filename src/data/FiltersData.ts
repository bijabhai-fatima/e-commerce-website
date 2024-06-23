type FilterType = {
    filterName: string
    filterOptions: string[]
}

const filtersData: FilterType[] = [
    {
        filterName: "catagory",
        filterOptions: [
            "Tshirts",
            "Tops",
            "Sweaters",
            "Skirts",
            "Dresses",
            "Jeans",
            "Jackets",
            "Hoodies",
        ],
    },
    {
        filterName: "price",
        filterOptions: [
            "299",
            "300-599",
            "600-999",
            "1000-1499",
            "1500-2499",
            "2500-3999",
            "4000",
        ],
    },
    {
        filterName: "color",
        filterOptions: [
            "black",
            "white",
            "pink",
            "red",
            "blue",
            "green",
            "yellow",
            "Hoodies",
        ],
    },
    {
        filterName: "rating",
        filterOptions: ["1-2", "2-3", "3-4", "4"],
    },
]

export { filtersData }
export type { FilterType }
