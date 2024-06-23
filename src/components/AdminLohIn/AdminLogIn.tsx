import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../state/store"
import { logInAdminAsync } from "../../state/admin/adminSlice"
import { Admin } from "../../state/admin/adminSlice"

const AdminLogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            Admin Log In
            <input
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={({}) =>
                    dispatch(
                        logInAdminAsync({
                            email: email,
                            password: password,
                        })
                    )
                }
            >
                LogIn
            </button>
        </div>
    )
}

export default AdminLogIn
