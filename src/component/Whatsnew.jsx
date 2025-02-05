import React from "react";
import { Box, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Footer from "./Footer";
const Whatsnew = () => {

    return (
        <>
            <style>
                {`
                .whatsnew-container {
                    width: 90%;
                    max-width: 1100px;
                    margin: auto;
                    padding: 20px 0;
                    text-align: center;
                    font-family: "Poppins", sans-serif;
                }

                .breadcrumb {
                    font-size: 25px;
                    color: #666;
                    margin-bottom: 10px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                }
                .intro-image img {
                    width: 60px;
                    margin-top: 15px;
                }

                .intro-section {
                    position: relative;
                }

                .intro-section h1 {
                    font-size: 36px;
                    font-weight: 700;
                }

                .intro-section p {
                    font-size: 18px;
                    color: #444;
                    max-width: 700px;
                    margin: 10px auto;
                }

                .arrow-icon {
                    width: 70px;
                    margin-top: -20px;
                    margin-left: 10px;
                }

                .features-section {
                    width: 90%;
                    max-width: 800px;
                    margin: auto;
                    padding: 20px 0;
                }

                .features-section h2 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-align: left;
                }

                .features-section ul {
                    text-align: left;
                }
                .features-section h6 {
                    margin-left: 40px;
                    margin-top: -26px;
                }

                .features-section p {
                    margin-left: 40px;
                    margin-top: 5px;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .point-icon {
                    width: 30px;
                    height: auto;
                    align-item:left;
                }

                .feature-text h6 {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .feature-text p {
                    font-size: 16px;
                    color: #666;
                    margin: 0;
                }

                .newsletter-section {
                    margin-top: 30px;
                    padding: 20px;
                }

                .newsletter-box {
                    background: #f8f8f8;
                    padding: 20px;
                    border-radius: 10px;
                }

                .newsletter-form {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 15px;
                }

                .newsletter-form input {
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 30px;
                    width: 250px;
                    font-size: 14px;
                }

                .newsletter-form button {
                    background: #6D0DBE;
                    color: white;
                    font-size: 16px;
                    padding: 12px;
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: 0.3s ease;
                }

                .newsletter-form button:hover {
                    background: #54009B;
                }

                @media (max-width: 768px) {
                    .intro-section h1 {
                        font-size: 30px;
                    }

                    .arrow-icon {
                        width: 50px;
                    }

                    .features-section h2 {
                        font-size: 24px;
                    }

                    .feature-item {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .point-icon {
                        width: 25px;
                    }

                    .newsletter-form {
                        flex-direction: column;
                        align-items: center;
                    }

                    .newsletter-form input {
                        width: 100%;
                        max-width: 300px;
                    }
                }

                @media (max-width: 480px) {
                    .intro-section h1 {
                        font-size: 26px;
                    }

                    .arrow-icon {
                        width: 40px;
                    }
                    .feature-item {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

            `}
            </style>
            <main className="main-content">
                <div className="container">
                    <main className="whatsnew-container">
                        <div className="breadcrumb">Home &nbsp; ❯ &nbsp; What's New</div>

                        <section className="intro-section">
                            <h1>What’s New</h1>
                            <p>
                                We’re excited to announce the launch of Activatree! Here’s what’s available for you.
                            </p>
                            <div className="intro-image">
                                <img src="../assets/images/img/aboutline.png" alt="Decorative" />
                            </div>
                        </section>

                        <section className="features-section">
                            <h2>For Social Media:</h2>
                            <ul>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Create Your Profile:</h6>
                                    <p>Work with multiple creators in real-time on a single post.</p>
                                </li>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Sign-Up is Live!</h6>
                                    <p>It’s easier than ever to join the Activatree community.</p>
                                </li>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Social Media Page Setup:</h6>
                                    <p>Customize your own social media page.</p>
                                </li>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Text, Photo, and Video Posts:</h6>
                                    <p>Share updates, images, and videos easily.</p>
                                </li>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Bookmark Content:</h6>
                                    <p>Save posts for later.</p>
                                </li>
                                <li>
                                    <img src="../assets/images/img/point.png" alt="Pointer icon" className="point-icon" />
                                    <h6>Follow & Follower System:</h6>
                                    <p>Follow others and have them follow you back.</p>
                                </li>
                            </ul>
                            <span className="mt-5">
                                <strong>
                                    This content focuses on the foundational features while encouraging users to join and engage with the platform.
                                </strong>
                            </span>
                        </section>
                        <section className="newsletter-section">
                            <div className="newsletter-box">
                                <p>
                                    <h6>Join us as we grow and continue to add exciting new features to enhance your experience!</h6>
                                </p>
                                <div className="newsletter-form">
                                    <input type="email" placeholder="Your email" />
                                    <button>Get in touch</button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </main>
            <Footer />
        </>
    );
}
export default Whatsnew;