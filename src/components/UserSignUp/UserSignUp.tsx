import React, { useState } from "react"
import "./UserSignUp.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import { setUserState } from "../../state/user/userSlice"

const UserSignUp = () => {
    const status = useSelector((state: RootState) => state.user.status)
    const name = useSelector((state: RootState) => state.user.name)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [next, setNext] = useState<boolean>(false)
    const [verificationCode, setVerificationCode] = useState<string>("")
    const [name_, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [status_, setStatus] = useState<boolean>(false)

    const handleContinue = async () => {
        console.log("continue.............")
        await axios
            .get("http://localhost:7000/requestEmailVerificationCode", {
                params: {
                    email: email,
                },
            })
            .then((res) => {
                console.log(res)
                if (res.data == "email_send") {
                    setNext(true)
                } else {
                    console.log(res.data)
                }
            })
    }

    const handleVerify = async () => {
        await axios
            .post("http://localhost:7000/VerifieWithCode", {
                email: email,
                verificationCode: verificationCode,
            })
            .then((res) => {
                if (res.data == "verified") {
                    setStatus(true)
                }
            })
    }

    const handleContinueShopping = async () => {
        console.log(email, name, password)
        await axios
            .post("http://localhost:7000/NewUser", {
                email: email,
                name: name_,
                password: password,
            })
            .then((res) => {
                if (res.data == "verified") {
                    dispatch(setUserState(name_))
                    navigate("/")
                }
            })
    }

    return (
        <div className="container-signup">
            {status_ ? (
                <div className="container--inside">
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="text"
                            placeholder="Name here"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="text"
                            placeholder="create password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="the-button"
                        onClick={() => handleContinueShopping()}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : next ? (
                <div className="container--inside">
                    <div className="upper-class-container">
                        <div className="upper-text">Verify with OTP</div>
                    </div>
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="text"
                            placeholder="OTP here"
                            onChange={(e) =>
                                setVerificationCode(e.target.value)
                            }
                        />
                    </div>
                    <button
                        className="the-button"
                        onClick={() => handleVerify()}
                    >
                        Verify
                    </button>

                    <div className="small-link-container">
                        <div className="small-text">resend OTP</div>
                    </div>
                </div>
            ) : (
                <div className="container--inside">
                    <div className="upper-class-container">
                        <div className="upper-text">SignUp</div>
                    </div>
                    <div className="text-input-container">
                        <input
                            className="email-input"
                            type="text"
                            placeholder="email here"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="the-button"
                        onClick={async () => handleContinue()}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserSignUp
