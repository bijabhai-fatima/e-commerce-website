import React from "react"
import "./SingleNotification.css"
import closeIcon from "../../../../assets/closeNotificationIcon.png"
import clockIcon from "../../../../assets/clockIcon.png"

type NotificationProp = {
    content: string
    TimeStamp: string
}

const SingleNotification = ({ content, TimeStamp }: NotificationProp) => {
    return (
        <div className="single-notification-container">
            <div className="upper-section-container">
                <div className="notifictaion-text">{content}</div>
                <img src={closeIcon} className="close-img" />
            </div>
            <div className="lower-section-container">
                <img src={clockIcon} className="clock-img" />
                <div className="notification-time">{TimeStamp}h ago</div>
            </div>
        </div>
    )
}

export default SingleNotification
