import React from "react"
import "./Footer.css"
import imageFooter from "../../assets/footerImage.png"
import instaIcon from "../../assets/instagramIcon.png"
import twitterIcon from "../../assets/twitterIcon.png"
import facebookIcon from "../../assets/facebookIcon.png"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-top-container">
                <img src={imageFooter} />

                <div className="footer-text">Follow us for latest updates</div>
            </div>
            <div className="footer-socials-container">
                <img src={instaIcon} />
                <img src={twitterIcon} />
                <img src={facebookIcon} />
            </div>
        </div>
    )
}

export default Footer
