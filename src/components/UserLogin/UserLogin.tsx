import React, { useState } from "react"
import "./UserLogin.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import { logInAsync } from "../../state/user/userSlice"

const UserLogin = () => {
    const status = useSelector((state: RootState) => state.user.status)
    const name = useSelector((state: RootState) => state.user.name)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [response, setResponse] = useState<string>("")

    const handleContinue = async () => {
        dispatch(logInAsync({ email: email, password: password }))
        // if (status) {
        navigate("/MyAccount/Details")
        // } else {
        //     navigate("/")
        // }
    }

    return (
        <div className="container-login">
            {status ? (
                <div className="container--inside">
                    <div className="small-text">Welcome, {name}</div>
                </div>
            ) : (
                <div className="container--inside">
                    <div className="upper-class-container">
                        <div className="upper-text">LogIn</div>
                    </div>
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="text"
                            placeholder="email here"
                            onChange={(e) =>
                                setEmail(e.target.value.toLowerCase())
                            }
                        />
                    </div>
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="the-button"
                        onClick={() => handleContinue()}
                    >
                        LogIn
                    </button>
                    <div className="small-link-container__login">
                        <div> Not Registered? </div>
                        <div
                            className="small-text__login"
                            onClick={() => navigate("/SignUp")}
                        >
                            {" "}
                            SignUp
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserLogin
