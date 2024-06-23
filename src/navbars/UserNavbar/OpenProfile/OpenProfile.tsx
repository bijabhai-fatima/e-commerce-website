import React, { useState } from "react"
import "./OPenProfile.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../state/store"
import { useNavigate } from "react-router-dom"
import { setUserStateToFalse } from "../../../state/user/userSlice"

const OpenProfile = () => {
    const navigate = useNavigate()

    const loggedIn = useSelector((state: RootState) => state.user.status)
    const name = useSelector((state: RootState) => state.user.name)

    const dispatch = useDispatch<AppDispatch>()

    const handleClick = () => {
        navigate("/LogIn")
    }

    return (
        <div
            className="open-profile-container"
            onMouseEnter={() => {
                console.log("enterd openprofile..")
            }}
        >
            {loggedIn ? (
                <>
                    <div className="open-profile-top__in">Hello, {name}</div>
                    <div
                        className="open-profile-menu-item__in"
                        onClick={() => navigate("/MyAccount/Details")}
                    >
                        Account Details
                    </div>
                    <div
                        className="open-profile-menu-item__in"
                        onClick={() => navigate("/MyAccount/Address")}
                    >
                        Addresses
                    </div>
                    <div
                        className="open-profile-menu-item__in"
                        onClick={() => navigate("/MyAccount/Orders")}
                    >
                        Orders
                    </div>
                    <div
                        className="open-profile-menu-item__in"
                        onClick={() => navigate("/MyAccount/Notifications")}
                    >
                        Notifications
                    </div>
                    {/* <div className="open-profile-menu-item__in">
                        Account Setting
                    </div> */}
                    <div
                        className="open-profile-lohout__in"
                        onClick={() => dispatch(setUserStateToFalse())}
                    >
                        LogOut
                    </div>
                </>
            ) : (
                <>
                    <div className="open-profile-top">Welcome, {name}</div>
                    <div className="open-profile-middel">
                        To access account and manage orders
                    </div>
                    <button
                        className="open-profile-button"
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        SinUp/LogIn
                    </button>
                </>
            )}
        </div>
    )
}

export default OpenProfile
