import React, { useRef, useState, useEffect } from "react"
import "./UserNavbar.css"
import Search from "../../components/Search/Search"
import profileIcon from "../../assets/profileIcon.png"
import bellIcon from "../../assets/bellIcon.png"
import shoppingBag from "../../assets/shoppingbagIcon.png"
import OpenProfile from "./OpenProfile/OpenProfile"
import OpenNotification from "./OpenNotification/OpenNotification"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../state/store"
import { getProductsAsync } from "../../state/productList/productListSlice"

const UserNavbar = () => {
    const uri = useLocation()

    const dispatch = useDispatch<AppDispatch>()

    const [searchQuery, setSearchQuery] = useState<string | null>(null)
    const [openedMenu, setOPenedmenu] = useState("")
    const sections = ["men", "women", "unisex", "kids", "buety"]
    const [section, setSection] = useState("")
    const navigate = useNavigate()

    const triggerSearch = (value: string) => {
        setSearchQuery(value)
        console.log("the query...", value)
        navigate(`/search/${value}`)
    }

    useEffect(() => {
        var urlTemp = window.location.pathname.split("/")
        if (urlTemp[urlTemp.length - 2] == "search") {
            setSection("")
        }
    }, [uri.pathname])
    return (
        <div className="navbar-container">
            <div className="first-half-container">
                <div className="logo-container" onClick={() => setSection("")}>
                    <Link to="/" className="link">
                        LOGO
                    </Link>
                </div>
                <div className="sections-container">
                    {sections.map((item) => (
                        <div
                            className={`single-section ${
                                section == item ? "active" : ""
                            }`}
                            onClick={() => setSection(item)}
                        >
                            <Link
                                to={`/section/${item}`}
                                className={`${
                                    item == "men" || item == "women"
                                        ? "link"
                                        : "disable"
                                }`}
                            >
                                {item.toUpperCase()}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="second-half-container">
                <div className="seach-container">
                    <Search calldata={triggerSearch} />
                </div>
                <div className="icons-container-container">
                    <div
                        className="icon-container"
                        onMouseEnter={() => {
                            setOPenedmenu("profile")
                        }}
                    >
                        <img
                            src={profileIcon}
                            id="profileIcon"
                            className={`${
                                openedMenu == "profile" ? "active-icon" : ""
                            }`}
                        />
                        {openedMenu == "profile" && (
                            <div
                                onMouseLeave={() => {
                                    setOPenedmenu("")
                                }}
                            >
                                <OpenProfile />
                            </div>
                        )}
                    </div>
                    <div
                        className="icon-container"
                        onMouseEnter={() => setOPenedmenu("bell")}
                    >
                        <img
                            src={bellIcon}
                            id="bellIcon"
                            className={`${
                                openedMenu == "bell" ? "active-icon" : ""
                            }`}
                        />
                        {openedMenu == "bell" && (
                            <div onMouseLeave={() => setOPenedmenu("")}>
                                <OpenNotification />
                            </div>
                        )}
                    </div>
                    <div
                        className="icon-container"
                        onMouseEnter={() => {
                            setOPenedmenu("bag")
                        }}
                    >
                        <img
                            src={shoppingBag}
                            className={`${
                                openedMenu == "bag" ? "active-icon" : ""
                            }`}
                            onClick={() => {
                                setOPenedmenu("bag")
                                navigate("/ShoppingBag")
                            }}
                        />
                        {openedMenu == "bag" && (
                            <div>{/* <OpenProfile /> */}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserNavbar
