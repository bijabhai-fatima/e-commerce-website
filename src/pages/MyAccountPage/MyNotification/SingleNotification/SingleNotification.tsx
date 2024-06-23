import React from "react"
import "./SingleNotification.css"
import clockIcon from "../../../../assets/clockIcon.png"
type NotificationProp = {
    content: string
    TimeStamp: string
}

const SingleNotification = ({ content, TimeStamp }: NotificationProp) => {
    return (
        <div className="single-notification-container__inside">
            <div className="upper-section-container">{content}</div>
            <div className="lower-section-container__inside">
                <img src={clockIcon} className="clock-img" />
                <div className="notification-time">{TimeStamp}h ago</div>
            </div>
        </div>
    )
}

export default SingleNotification
