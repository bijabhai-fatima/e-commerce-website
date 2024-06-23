import React from "react"
import "./InputFeild.css"

type InputFeildType = {
    name: string
    inputType: string
    placeholder: string
}

const InputFeild = ({ name, inputType, placeholder }: InputFeildType) => {
    const formatDate = (dateString: string) => {
        // Parse the date string
        const date = new Date(dateString)

        // Get day, month, and year components
        const day = date.getDate().toString().padStart(2, "0") // Add leading zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, "0") // Months are zero-based
        const year = date.getFullYear()

        // Construct the formatted date string
        const formattedDate = `${year}-${month}-${day}`

        return formattedDate
    }

    return (
        <div className="input-field-container">
            <div className="input-feild-name">{name.toUpperCase()}</div>
            <div className="input-feild-body">
                {inputType == "date" ? (
                    <input
                        type="date"
                        value={formatDate(placeholder)}
                        disabled
                    />
                ) : inputType == "email" ? (
                    <input
                        type="email"
                        placeholder={placeholder}
                        disabled
                        className="email-field"
                    />
                ) : (
                    <input type="text" placeholder={placeholder} disabled />
                )}
            </div>
        </div>
    )
}

export default InputFeild
