import React from "react"
import "../OpenedMenuStyles.css"
import InputFeild from "../../../components/InputFeild/InputFeild"
import InputFeildButten from "../../../components/InputFeild/InputFeildButten/InputFeildButten"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"

const MyDetails = () => {
    const userData = useSelector((state: RootState) => state.user)

    return (
        <div className="my-details-container">
            <div className="my-details-title">My Details</div>
            <div className="my-details-row">
                <InputFeild
                    name="first name"
                    inputType="text"
                    placeholder={userData.name.split(" ")[0]}
                />
                <InputFeild
                    name="middle name"
                    inputType="text"
                    placeholder={""}
                />
                <InputFeild
                    name="last name"
                    inputType="text"
                    placeholder={
                        userData.name.split(" ")[
                            userData.name.split(" ").length - 1
                        ]
                    }
                />
            </div>
            <div className="my-details-row">
                <InputFeild
                    name="phone number"
                    inputType="text"
                    placeholder={userData.phoneNo[0]}
                />
                <InputFeild
                    name="alternate phone number"
                    inputType="text"
                    placeholder={""}
                />
            </div>
            <div className="my-details-row">
                <InputFeild
                    name="email address"
                    inputType="email"
                    placeholder={userData.email}
                />
            </div>
            <div className="my-details-row">
                <InputFeild
                    name="birth date"
                    inputType="date"
                    placeholder={userData.birthdate}
                />
            </div>
            <div className="my-details-row">
                <InputFeildButten name="edit" />
            </div>
        </div>
    )
}

export default MyDetails
