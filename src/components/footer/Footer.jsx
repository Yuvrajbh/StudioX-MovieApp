import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                Experience the magic of cinema with StudioX, your ultimate destination for movie enthusiasts worldwide."

"Discover the best in film and television at StudioX, where entertainment comes to life with a vast collection of reviews, ratings, and behind-the-scenes insights."

"Stay updated with the latest releases, trailers, and exclusive interviews at StudioX, your go-to platform for all things movies and TV shows."

"Join our passionate community of cinephiles at StudioX, where you can discuss your favorite films, share recommendations, and connect with fellow movie buffs."

"At StudioX, we're dedicated to bringing the cinematic world to your fingertips, making every movie night an unforgettable experience."






                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;