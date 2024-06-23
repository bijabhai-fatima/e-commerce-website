import React, { useState } from "react"
import "./LandingPage.css"
import LnadingImage from "../../assets/landingPageImage.png"
import itemOne from "../../assets/itemOne.png"
import itemTwo from "../../assets/itemTwo.png"
import itemThree from "../../assets/itemThree.png"
import catagoryEx from "../../assets/catagoryEx.png"
import Item from "./Item/Item"
import { menSectionData } from "../../data/menSectionData"
import { womenSectionData } from "../../data/womenSectionData"
import { kidsSectionData } from "../../data/kidsSectionData"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../state/store"
import { getProductsAsync } from "../../state/productList/productListSlice"

const LandingPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [section, setSection] = useState("men")
    const [sectionData, setSectionData] = useState(menSectionData)

    return (
        <div className="landingpage-container">
            <div className="top-section-container">
                <div className="content-container">
                    <div className="top-content">
                        Find the Best Fashion Style for You
                    </div>
                    <div className="pera-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ullamcorper congue eros, eget tincidunt ipsum
                        eleifend ut.
                    </div>
                    <button
                        className="explore-button"
                        onClick={() =>
                            (window.location.href = "#shopByCatagory")
                        }
                    >
                        Explore Now
                    </button>
                </div>
                <div className="photo-container">
                    <img src={LnadingImage} className="landing-photo" />
                </div>
            </div>
            <div className="newcollection-container">
                <div className="newcollection-title">New Collection</div>
                <div className="newCollection-pera">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    ullamcorper{" "}
                </div>
                <div className="newCollection-ites-container">
                    <div className="item">
                        <img src={itemOne} className="item-photo" />
                        <div className="item-name">Cardigans</div>
                    </div>
                    <div className="item">
                        <img src={itemTwo} className="item-photo" />
                        <div className="item-name">jackets</div>
                    </div>
                    <div className="item">
                        <img src={itemThree} className="item-photo" />
                        <div className="item-name">SWEATERS</div>
                    </div>
                </div>
            </div>
            <div className="shopByCatagory-container" id="shopByCatagory">
                <div className="shopByCatagory-title">Shop By Category</div>
                <div className="shopByCatagory-catagories-container">
                    <div
                        className={`catagirie ${
                            section == "men" ? "active" : ""
                        }`}
                        onClick={() => {
                            setSection("men")
                            setSectionData(menSectionData)
                        }}
                    >
                        MEN
                    </div>
                    <div
                        className={`catagirie ${
                            section == "women" ? "active" : ""
                        }`}
                        onClick={() => {
                            setSection("women")
                            setSectionData(womenSectionData)
                        }}
                    >
                        WOMEN
                    </div>
                    <div className="catagirie disable">UNISEX</div>
                    <div
                        className={`catagirie ${
                            section == "kids" ? "active" : ""
                        }`}
                        onClick={() => {
                            setSection("kids")
                            setSectionData(kidsSectionData)
                        }}
                    >
                        KIDS
                    </div>
                    <div className="catagirie disable">BEUTY</div>
                </div>
                <div className="shopByCatagory-items-container">
                    {sectionData.map((item) => (
                        <Item
                            photo={item.image}
                            name={item.name}
                            price={`₹${item.price.toString()}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LandingPage
