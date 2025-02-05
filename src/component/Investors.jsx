import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
const Investors = () => {
    return (
        <>
            <style>
                {`
                    body {
                        font-family: "Poppins", sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #333;
                        background-color: #ffffff;
                    }

                    .container {
                        width: 90%;
                        max-width: 1100px;
                        margin: auto;
                        padding: 20px 0;
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

                    .investor-intro {
                        text-align: center;
                        padding: 20px 0;
                    }

                    .investor-intro h1 {
                        font-size: 36px;
                        font-weight: 700;
                    }

                    .investor-engagement h2 {
                        font-size: 36px;
                        font-weight: 700;
                    }

                    .intro-text {
                        font-size: 18px;
                        max-width: 800px;
                        margin: 10px auto;
                        color: #555;
                    }

                    .highlight {
                        color: #9F00AA;
                        font-weight: bold;
                    }

                    .intro-image img {
                        width: 60px;
                        margin-top: 15px;
                    }

                    .why-invest {
                        text-align: center;
                        padding: 40px 0;
                    }

                    .why-invest h2 {
                        font-size: 28px;
                        font-weight: 700;
                    }

                    .invest-text {
                        font-size: 16px;
                        color: #666;
                        max-width: 700px;
                        margin: 10px auto 30px;
                    }

                    .investment-points {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .point {
                        display: flex;
                        align-items: flex-start;
                        gap: 20px;
                        background: #f8f8f8;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                    }

                    .number {
                        font-size: 32px;
                        font-weight: 600;
                        color: #e0e0e0;
                        min-width: 50px;
                    }

                    .point h3 {
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 5px;
                        text-align: start;
                    }

                    .point p {
                        font-size: 14px;
                        color: #666;
                    }

                    .investor-engagement {
                        text-align: center;
                        padding: 50px 20px;
                    }

                    .engagement-content {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 20px;
                    }

                    .investment-opportunities {
                        background: #8400A3;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        flex: 1;
                    }

                    .investment-opportunities h4 {
                        font-size: 20px;
                    }

                    .contact-form {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        flex: 1;
                    }

                    .contact-form h5 {
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 15px;
                        text-align: center;
                    }

                    .contact-form form {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .contact-form input,
                    .contact-form textarea {
                        width: 100%;
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 30px;
                        font-size: 14px;
                    }

                    .contact-form textarea {
                        height: 100px;
                        resize: none;
                    }

                    .contact-form button {
                        background: #6D0DBE;
                        color: white;
                        font-size: 16px;
                        font-weight: bold;
                        padding: 12px;
                        border: none;
                        border-radius: 30px;
                        cursor: pointer;
                        transition: 0.3s ease;
                    }

                    .contact-form button:hover {
                        background: #54009B;
                    }

                    .icon {
                        width: 25px;
                    }

                    .arrow-icon {
                        width: 27%;
                        position: relative;
                        top: -30px;
                        left: 30px;
                    }

                    .money-icon {
                        width: 23%;
                        position: relative;
                        left: -20px;
                        top: 20px;
                    }

                    @media (max-width: 768px) {
                    .investor-intro h1 {
                        font-size: 30px;
                    }

                    .why-invest h2 {
                        font-size: 24px;
                    }

                    .investment-points {
                        flex-direction: column;
                    }

                    .point {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .number {
                        font-size: 24px;
                    }

                    .engagement-content {
                        flex-direction: column;
                        align-items: center;
                    }

                    .investment-opportunities,
                    .contact-form {
                        width: 100%;
                        max-width: 500px;
                    }

                    .contact-form form {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .contact-form form {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                    }

                    .contact-form textarea {
                        grid-column: span 2;
                    }

                    .contact-form button {
                        grid-column: span 2;
                    }

                    .arrow-icon {
                            width: 20%;
                            max-width: 80px;
                            top: -20px;
                            left: 20px;
                        }
                        
                    }

                    @media (max-width: 480px) {
                        .investor-intro h1 {
                            font-size: 26px;
                        }

                        .why-invest h2 {
                            font-size: 22px;
                        }

                        .point {
                            padding: 10px;
                        }

                        .number {
                            font-size: 20px;
                        }

                        .point h3 {
                            font-size: 18px;
                        }
                        
                        .investment-opportunities {
                            padding: 15px;
                        }

                        .contact-form {
                            padding: 15px;
                        }

                        .contact-form input,
                        .contact-form textarea {
                            padding: 10px;
                        }
                            .arrow-icon {
                            width: 18%;
                            max-width: 60px;
                            top: -15px;
                            left: 10px;
                        }
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <nav className="breadcrumb">
                        Home &nbsp; &gt; &nbsp; Investors
                    </nav>
                    <section className="investor-intro">
                        <h1>Dear Potential Investors</h1>
                        <p className="intro-text">
                            Discover the opportunity to invest in <span className="highlight">Activatree</span>,
                            a pioneering social media platform reshaping the way people connect,
                            collaborate, and create. Our mission is to foster innovation in social networking with
                            features that empower users and businesses alike.
                        </p>
                        <div className="intro-image">
                            <img src="../assets/images/img/aboutline.png" alt="Decorative" />
                        </div>
                    </section>
                    <section className="why-invest">
                        <h2>
                            Why Invest in <span className="highlight">Activatree</span>
                        </h2>
                        <p className="invest-text">
                            Activatree empowers creators and professionals to collaborate, monetize,
                            and grow their networks seamlessly.
                        </p>

                        <div className="investment-points">
                            <div className="point">
                                <span className="number">01</span>
                                <div>
                                    <h3>Innovative Platform</h3>
                                    <p>
                                        Activatree is revolutionizing the social media landscape by combining
                                        immersive experiences, AI-driven content curation, and eco-conscious
                                        digital innovation.
                                    </p>
                                </div>
                            </div>

                            <div className="point">
                                <span className="number">02</span>
                                <div>
                                    <h3>High Growth Trajectory</h3>
                                    <p>
                                        With a fast-growing global community and a unique blend of features,
                                        Activatree is positioned to scale rapidly and attract a wide user base.
                                    </p>
                                </div>
                            </div>

                            <div className="point">
                                <span className="number">03</span>
                                <div>
                                    <h3>Strong Leadership</h3>
                                    <p>
                                        Led by a team with a proven track record in tech and social media development.
                                    </p>
                                </div>
                            </div>

                            <div className="point">
                                <span className="number">04</span>
                                <div>
                                    <h3>Tech-Driven Impact</h3>
                                    <p>
                                        From blockchain integrations to AI-powered tools, our platform is
                                        built on a foundation of cutting-edge technologies designed for the future.
                                    </p>
                                </div>
                            </div>

                            <div className="point">
                                <span className="number">05</span>
                                <div>
                                    <h3>Sustainable and Ethical Growth</h3>
                                    <p>
                                        We are committed to building a platform that aligns with environmental
                                        and ethical standards, promoting a sustainable digital ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="investor-engagement">
                        <h2><span>Investor</span> Engagement</h2>
                        <p className="mt-5">
                            At Activatree, we offer strategic investment opportunities in a growing social media platform
                            that blends cutting-edge technology with a sustainable vision. Partner with us to help shape
                            the future of digital networking and innovation.
                        </p>
                        <div className="engagement-content">
                            <div className="investment-opportunities mt-5">
                                <h4 className="">Investment Opportunities</h4>
                                <p className="text-white">Interested in exploring investment opportunities with Activatree?</p>
                                <p className="text-white">We offer in-depth insights into our growth strategy, financial performance, and long-term vision.</p>
                                <p className="text-white">For more information or to schedule a meeting, please reach out to our investor relations team at</p>
                                <div className="contact-email">
                                    <img src="../assets/images/img/email.png" alt="Email Icon" className="icon" />
                                    <span className="text-white">investors@activatree.com</span>
                                    <img src="../assets/images/img/investarrow.png" alt="Arrow Icon" className="arrow-icon" />
                                </div>
                                <img src="../assets/images/img/money.png" alt="Money Icon" className="money-icon" />
                            </div>
                            <div className="contact-form">
                                <h5>Join us in shaping the future of social media.</h5>
                                <form>
                                    <input type="text" placeholder="Your name" />
                                    <input type="text" placeholder="Your company name" />
                                    <input type="text" placeholder="Your phone number" />
                                    <input type="email" placeholder="Your email" />
                                    <textarea placeholder="Your message"></textarea>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}
export default Investors;