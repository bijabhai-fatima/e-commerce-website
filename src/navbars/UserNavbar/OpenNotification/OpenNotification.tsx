import React from "react"
import "./OpenNotifiction.css"
import SingleNotification from "./SingleNotification/SingleNotification"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"

const OpenNotification = () => {
    const loggedIn = useSelector((state: RootState) => state.user.status)
    return (
        <>
            {loggedIn ? (
                <div className="open-notifications-container">
                    <SingleNotification
                        content="Your Order for Resort Shirt is successfully placed."
                        TimeStamp="2"
                    />
                </div>
            ) : (
                ""
            )}
        </>
    )
}

export default OpenNotification
