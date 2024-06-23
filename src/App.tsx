import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import AdminNavbar from "./navbars/AdminNavbar/AdminNavbar"
import Upload from "./components/Upload/Upload"
import UserNavbar from "./navbars/UserNavbar/UserNavbar"
import UserLogin from "./components/UserLogin/UserLogin"
import UserSignUp from "./components/UserSignUp/UserSignUp"
import LandingPage from "./pages/LandingPage/LandingPage"
import Footer from "./components/Footer/Footer"
import {
    BrowserRouter,
    Route,
    Router,
    Routes,
    useParams,
} from "react-router-dom"
import ProductListPage from "./pages/ProductListPage/ProductListPage"
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage"
import { useSelector } from "react-redux"
import { RootState } from "./state/store"
import NewProductForm from "./components/NewProductForm/NewProductForm"
import ProductPage from "./pages/ProductPage/ProductPage"
import ShopingBagPage from "./pages/ShoppingBagPage/ShopingBagPage"
function App() {
    const status = useSelector((state: RootState) => state.user.status)

    const [productPhotos, setProductPhotos] = useState<FileList | null>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPhotos(e.target.files)
    }

    return (
        <BrowserRouter>
            <UserNavbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/section/:id" element={<ProductListPage />} />
                <Route
                    path="/search/:searchquery"
                    element={<ProductListPage />}
                />
                <Route path="/LogIn" element={<UserLogin />} />
                <Route path="/SignUp" element={<UserSignUp />} />
                <Route path="/ShoppingBag" element={<ShopingBagPage />} />
                <Route path="/new" element={<NewProductForm />} />
                <Route path="/Product/:id" element={<ProductPage />} />
                <Route
                    path="/MyAccount/Details"
                    element={
                        status ? (
                            <MyAccountPage menuName="My Details" />
                        ) : (
                            <div className="not-login-warning-container">
                                You are not logged in
                            </div>
                        )
                    }
                />
                <Route
                    path="/MyAccount/Address"
                    element={
                        status ? (
                            <MyAccountPage menuName="My Adress" />
                        ) : (
                            <div className="not-login-warning-container">
                                You are not logged in
                            </div>
                        )
                    }
                />
                <Route
                    path="/MyAccount/Orders"
                    element={
                        status ? (
                            <MyAccountPage menuName="My Orders" />
                        ) : (
                            <div className="not-login-warning-container">
                                You are not logged in
                            </div>
                        )
                    }
                />
                <Route
                    path="/MyAccount/Notifications"
                    element={
                        status ? (
                            <MyAccountPage menuName="My Notifications" />
                        ) : (
                            <div className="not-login-warning-container">
                                You are not logged in
                            </div>
                        )
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
