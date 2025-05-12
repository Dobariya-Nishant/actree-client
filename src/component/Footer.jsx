import React from "react";
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <>
            <style>
                {`
                    .footer {
                        background: linear-gradient(to right, rgb(154, 0, 169), rgb(88, 0, 151), rgb(41, 0, 139));
                        color: white;
                        padding: 40px 20px;
                        text-align: center;
                    }

                    .footer-container {
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .footer-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                    }

                    .logo img {
                        width: 300px;
                    }

                    .social-icons img {
                        width: 25px;
                        margin: 0 10px;
                        transition: 0.3s ease;
                    }

                    .social-icons img:hover {
                        transform: scale(1.1);
                    }

                    .footer-links {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        margin: 20px 0;
                    }

                    .footer-column {
                        flex: 1;
                        min-width: 200px;
                        margin-bottom: 20px;
                        text-align: start;
                    }

                    .footer-column h3 {
                        font-size: 18px;
                        margin-bottom: 10px;
                        text-align: start;
                    }

                    .footer-column a {
                        color: white;
                        display: block;
                        text-decoration: none;
                        margin: 5px 0;
                    }
                    .footer-column p {
                        color: white;
                        display: block;
                        text-decoration: none;
                        margin: 5px 0;
                    }

                    .footer-bottom {
                        color: white;
                        margin-top: 20px;
                        font-size: 14px;
                        opacity: 0.8;
                    }

                    // @media (max-width: 768px) {
                    //     .footer-top {
                    //         text-align: start;
                    //     }

                    //     .social-icons {
                    //         margin-top: 10px;
                    //     }

                    //     .footer-links {
                    //         margin-top: 10px;
                    //         text-align: start;
                    //     }

                    //     .footer-column {
                    //         text-align: start;
                    //     }
                    // }
                    @media (max-width: 768px) {
                        .footer-links {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr); 
                            gap: 20px;
                        }

                        .footer-column {
                            min-width: auto;
                            text-align: start;
                        }
                    }

                    // @media (max-width: 480px) {
                    //     .footer-links {
                    //         grid-template-columns: 1fr;
                    //         text-align: center;
                    //     }
                    // }
                    @media (max-width: 480px) {
                        .footer-links {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 15px;
                        }

                        .footer-column {
                            text-align: start;
                        }
                    }

                    @media (max-width: 375px) {
                        .footer-links {
                            grid-template-columns: 1fr;
                            text-align: start;
                        }

                        .footer-column {
                            text-align: start;
                        }
                    }
                `}
            </style>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <h2 className="logo">
                            <img src="assets/images/navbar/activa tree logo (2).png" alt="Logo" />
                        </h2>
                        <div className="social-icons">
                            <Link href="#"><img src="../assets/images/footer/instagram.png" alt="" /></Link>
                            <Link href="#"><img src="../assets/images/footer/facebook.png" alt="" /></Link>
                            <Link href="#"><img src="../assets/images/footer/x.png" alt="" /></Link>
                            <Link href="#"><img src="../assets/images/footer/linkdin.png" alt="" /></Link>
                            <Link href="#"><img src="../assets/images/footer/tiktok.png" alt="" /></Link>
                            <Link href="#"><img src="../assets/images/footer/youtube.png" alt="" /></Link>
                        </div>
                    </div>
                    <hr />
                    <div className="footer-links">
                        <div className="footer-column">
                            <h3>Company</h3>
                            <Link to="/about-us">About Us</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/investors">For Investors</Link>
                        </div>
                        <div className="footer-column">
                            <h3>Support</h3>
                            <Link to="/help-center">Help Center</Link>
                            <Link to="/whats-new">What's New</Link>
                        </div>
                        <div className="footer-column">
                            <h3>Legal</h3>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                            <Link to="/terms-of-service">Terms of Service</Link>
                        </div>
                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <Link href="#"><img src="../assets/images/footer/mail.png" alt="" /> info@activatree.com</Link>
                            <Link href="#"><img src="../assets/images/footer/location.png" alt="" /> State of Georgia, U.S.A</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <hr />
                        <p className="text-white">© 2024 Activatree, a Subsidiary of Infinatree, Inc.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
