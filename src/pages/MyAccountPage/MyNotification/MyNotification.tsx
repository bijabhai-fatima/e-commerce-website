import React from "react"
import "../OpenedMenuStyles.css"
import SingleNotification from "./SingleNotification/SingleNotification"

const MyNotification = () => {
    return (
        <div className="my-details-container">
            <div className="my-details-title">My Notifications</div>
            <div className="my-notification-container__my-profile">
                <SingleNotification
                    content="Your Order for Resort Shirt is successfully placed."
                    TimeStamp="2"
                />
            </div>
        </div>
    )
}

export default MyNotification
