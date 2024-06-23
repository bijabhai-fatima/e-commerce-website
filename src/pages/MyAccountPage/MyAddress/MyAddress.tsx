import React, { useEffect, useState } from "react"
import "../OpenedMenuStyles.css"
import InputFeild from "../../../components/InputFeild/InputFeild"
import InputFeildButten from "../../../components/InputFeild/InputFeildButten/InputFeildButten"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../state/store"
import axios from "axios"

const MyAddress = () => {
    const userData = useSelector((state: RootState) => state.user)

    const [address, setAddress] = useState<any>(null)

    useEffect(() => {
        const addressId = userData.addresses[0].toString()
        async function fetchAddressData(addressId: string) {
            setAddress(
                (
                    await axios.get(
                        `http://localhost:7000/getAddress/${addressId}`
                    )
                ).data
            )
        }
        fetchAddressData(addressId)
    }, [])

    return (
        <div className="my-details-container">
            <div className="my-details-title">My Address</div>
            <div className="my-address-sub-title">Default address</div>
            <div className="my-details-row">
                <InputFeild
                    name="detalis"
                    inputType="text"
                    placeholder={address ? address.details : ""}
                />
                <InputFeild
                    name="pincode"
                    inputType="text"
                    placeholder={address ? address.pincode : ""}
                />
            </div>
            <div className="my-details-row">
                <InputFeild
                    name="city/district"
                    inputType="text"
                    placeholder={address ? address.city : ""}
                />
                <InputFeild
                    name="state"
                    inputType="text"
                    placeholder={address ? address.state : ""}
                />
                <InputFeild
                    name="saved as"
                    inputType="text"
                    placeholder={"Home"}
                />
            </div>
            <div className="my-details-row">
                <InputFeildButten name="edit" />
                <InputFeildButten name="add new" />
            </div>
        </div>
    )
}

export default MyAddress
