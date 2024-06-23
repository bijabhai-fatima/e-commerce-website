import React from "react"
import "./MenuItem.css"

type MenuItemProp = {
    icon: string
    name: string
    calldata: (e: string) => void
    activemenu: string
}

const MenuItem = ({ icon, name, calldata, activemenu }: MenuItemProp) => {
    return (
        <div
            className={`menu-item-container ${
                activemenu == name ? "active-menu" : ""
            }`}
            onClick={() => calldata(name)}
        >
            <div className="menu-icon">
                <img src={icon} />
            </div>
            <div className="menu-name">{name}</div>
        </div>
    )
}

export default MenuItem
