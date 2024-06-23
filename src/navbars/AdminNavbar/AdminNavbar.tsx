import React from "react"
import { AddNewProduct, AdminLogIn } from "../../components/components"
import { RootState } from "../../state/store"
import { UseSelector, useSelector } from "react-redux"

const AdminNavbar = () => {
    const isLoggedIn = useSelector((state: RootState) => state.admin.status)
    const name = useSelector((state: RootState) => state.admin.name)
    return (
        <div>
            AdminNavbar
            {isLoggedIn ? `welcome ${name}!` : <AdminLogIn />}
            <AddNewProduct />
        </div>
    )
}

export default AdminNavbar
