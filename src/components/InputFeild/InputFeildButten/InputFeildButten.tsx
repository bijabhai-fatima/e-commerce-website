import React from "react"
import "./InputFeildButten.css"

type InputFeildButtenType = {
    name: string
    buttonClicked: (e: string) => void
}

const InputFeildButten = ({ name, buttonClicked }: InputFeildButtenType) => {
    return (
        <div className="input-feild-button-container">
            <button
                onClick={() =>
                    name.includes("save")
                        ? buttonClicked("save")
                        : buttonClicked("edit")
                }
                className={name.includes("edit") ? "not-active" : ""}
            >
                {name}
            </button>
        </div>
    )
}

export default InputFeildButten
