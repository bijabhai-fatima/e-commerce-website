import React, { useEffect, useState } from "react"
import "./MyAccountPage.css"
import detailsIcon from "../../assets/menu-icons/detailsIcon.png"
import addressIcon from "../../assets/menu-icons/addressIcon.png"
import ordersIcon from "../../assets/menu-icons/ordersIcon.png"
import notificationsIcon from "../../assets/menu-icons/NotificationIcon.png"
import MenuItem from "./MenuItem/MenuItem"
import MyDetails from "./MyDetalis/MyDetails"
import MyAddress from "./MyAddress/MyAddress"
import MyNotification from "./MyNotification/MyNotification"
import MyOrders from "./MyOrders/MyOrders"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import axios from "axios"

type MyAccountPage = {
    menuName: string
}

const MyAccountPage = ({ menuName }: MyAccountPage) => {
    const userData = useSelector((state: RootState) => state.user)

    const navigate = useNavigate()

    const data = [
        { icon: detailsIcon, name: "My Details" },
        { icon: addressIcon, name: "My Address" },
        { icon: ordersIcon, name: "My Orders" },
        { icon: notificationsIcon, name: "My Notifications" },
    ]

    const uri = useLocation()
    const [activeMenu, setActiveMenu] = useState(menuName)

    const chooseMenu = (value: string) => {
        setActiveMenu(value)
    }

    useEffect(() => {
        var temp = activeMenu.split(" ")
        navigate(`/MyAccount/${temp[temp.length - 1]}`)
    }, [activeMenu])

    useEffect(() => {
        var temp = uri.pathname.split("/")
        console.log(temp[temp.length - 1])
        setActiveMenu(`My ${temp[temp.length - 1]}`)
    }, [uri.pathname])

    return (
        <div className="my-account-container">
            <div className="my-account-uppertext">
                <div
                    className="my-account-uppertext__Home"
                    onClick={() => navigate("/")}
                >
                    Home{" "}
                </div>
                <div className="my-account-uppertext__MyAccount">
                    / My Account
                </div>
            </div>
            <div className="my-account-hello">Hello, User!</div>
            <div className="my-account-content-container">
                <div className="my-account-menu-items-container">
                    {data.map((item) => (
                        <MenuItem
                            icon={item.icon}
                            name={item.name}
                            calldata={chooseMenu}
                            activemenu={activeMenu}
                        />
                    ))}
                </div>
                <div className="selected-menu-container">
                    {activeMenu == "My Details" && <MyDetails />}
                    {activeMenu == "My Address" && <MyAddress />}
                    {activeMenu == "My Orders" && <MyOrders />}
                    {activeMenu == "My Notifications" && <MyNotification />}
                </div>
            </div>
        </div>
    )
}

export default MyAccountPage
