import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom"
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
//import "../assets/css/homepage.css";


const Home = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/homepage.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);
    return (
        <>

            {/* <div className="container-fluid">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-lg-6 col-md-6">
                            <div className="header">
                                <ul className="title-header p-0">
                                    <img className="dot" src="" alt="" />
                                    <li className="p-2">
                                        A Digital Ecosystem For Young Entrepreneurs To:
                                    </li>
                                </ul>
                                <h2>
                                    Network. Collaborate. Acquire Skills. Innovate. Showcase
                                    Ideas. Build and Monetize Your Brand.
                                </h2>
                                <p>Turn Your CRAZY IDEAS Into REALITY</p>
                                <div className="details mt-5">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        //onClick={handleLoginClick}
                                        className="hover-expand-btn"
                                        sx={{
                                            mr: 2,
                                            borderRadius: "30px",
                                            padding: "0px",
                                            width: "88px",
                                            height: "47px",
                                            fontFamily: "poppins",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            background:
                                                "linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)",
                                            textTransform: "none",
                                        }}
                                    >
                                        Login
                                        <span className="arrow-icon">
                                            <img
                                                src=""
                                                alt="Forword"
                                                style={{ width: "80%" }}
                                            />
                                        </span>
                                    </Button>

                                    <Button
                                        //onClick={handleSignUpClick}
                                        variant="contained"
                                        color="white"
                                        sx={{
                                            p: 0,
                                            borderRadius: "30px",
                                            border: "1px solid black",
                                            width: "115px",
                                            height: "47px",
                                            fontFamily: "poppins",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#000",
                                            textTransform: "none",
                                        }}
                                    >
                                        Join Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="home-img">
                                <img className="girl" src="" alt="" />
                                <img className="upercomment3" src="{upercommnet}" alt="" />
                                <img className="like" src="{like}" alt="" />
                                <img className="people" src="{people}" alt="" />
                                <img className="uparrow" src="{uparrow}" alt="" />
                                <img className="downcomment3" src="{downcomment}" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <img className="line" src="{line}" alt="" />
                <img className="line1" src="{line1}" alt="" />
            </div>

            <div
                className="container mb-5"
                style={{ position: "relative", top: "-20pc" }}
            >
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="solution1">
                            <img
                                src="{solution1}"
                                alt="Social Media Icons"
                                className="image-left"
                            />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="text-container">
                            <h1>Why Choose</h1>
                            <h2>Activatree</h2>
                            <p>Save Time On Content Creation</p>
                            <p>
                                Easily integrate and manage your social media accounts from one
                                Dashboard. Grow your audience globally, and build your brand.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="solution2">
                            <img
                                src="{solution2}"
                                alt="Person with Tablet"
                                className="image-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container platforms">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="platform">
                            <h1>
                                Our Platform{" "}
                                <span
                                    style={{
                                        color: "#9F00AA",
                                        fontFamily: "poppins",
                                        fontWeight: 200,
                                    }}
                                >
                                    Features
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="platform">
                            <p>
                                Explore a suite of powerful tools designed to enhance
                                collaboration, creativity and professional growth. From
                                real-time co-creation to AI-powered networking, Activatree
                                offers everythinng you need to succeed
                            </p>
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Global Network</h2>
                            <p>
                                Connect globally. Expand your network. Build professional
                                relationships. Build high-value teams.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{globalnetwork}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Mentorship & Support</h2>
                            <p>
                                Connect with experienced mentors have Access to successful teen
                                entrepreneurs, and solid community support system.{" "}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{mns}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Collaborate in Real-Time</h2>
                            <p>
                                Whether it's co-creating posts, sharing a project, or
                                contributing to discussions, we make interaction simple and
                                effective, to build the ideas that matter to you.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{collobraterealtime}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Professional Accounts & Profiles</h2>
                            <p>
                                Set up Individual or Business Accounts & Profiles Pages to represent who you are and
                                showcase your business
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{pnp}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Learning & Resources</h2>
                            <p>
                                Acquire in-demand business development skills: Entrepreneurship,
                                marketing, and sales training.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{lnr}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Earn Without Restriction</h2>
                            <p>
                                Interactive marketplace to buy and sell digital products.
                                Monetize your expertise.
                                Create subscription models to turn your
                                content into revenue.

                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{ewr}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Forums & Community</h2>
                            <p>
                                Join discussions that support your goals, share knowledge, solve
                                industry relevant problems.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{fnc}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>A Safe Space</h2>
                            <p>
                                <li>Protected Environment.</li>
                                <li>Age-appropriate content. </li>
                                <li>Safe networking.</li>
                                <li>
                                    Privacy protection with 24/7 user support.</li>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{ass}" alt="" />
                        </div>
                    </div>
                </div>

            </div>



            <div className="container working-steps mt-5 py-5">
                <header className="working">
                    <h1>How It <span className='works'>Works</span></h1>
                    <p>Sign up for Activatree. Define your goals. Build your profile. Connect and network with professionals. Collaborate on Ideas and Projects. Build your brand, business, and team. Monetize your expertise or content.</p>
                    <p><span style={{ fontWeight: '600', fontSize: '20px', color: '#000' }}>Join a thriving community and get creative.</span></p>
                </header>
                <div className="steps">
                    <div className="row" style={{ gap: 23, alignItems: 'center' }}>
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{singup2}" alt="Sign Up" style={{ marginBottom: '70px' }} />
                                <h2>Claim Free Trial</h2>
                                <p>Create your account and Build / customize your profile.</p>
                            </div>
                        </div>
                        <img src="{secondstage}" alt="Stapes" className='nextstep' />
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{connectglobally}" alt="Build Up Your Profile" />
                                <h2>Connect Globally</h2>
                                <p>Network with other creators and professionals. Develop Ideas and collaborate.</p>
                            </div>
                        </div>
                        <img src="{thirdstage}" alt="Stapes" className='nextstep' />
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{earnwithoutrestriction}" alt="Start Creating or Selling" />
                                <h2>Earn without restriction</h2>
                                <p>Monetize your Content. Sell your digital products and services.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    //onClick={handleSignUpClick}
                    className="hover-expand-btn"
                    sx={{
                        mr: 2,
                        borderRadius: "30px",
                        padding: "0px",
                        ml: 2,
                        width: "115px",
                        height: "47px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        fontSize: "16px",
                        background:
                            "linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)",
                        textTransform: "none",
                    }}
                >
                    Join Now
                    <span className="arrow-icon">
                        <img
                            src="{forword}"
                            alt="Forword"
                            style={{ width: "80%" }}
                        />
                    </span>
                </Button>


            </div> */}

            <main className="main-content">
                <div className="container">
                    {/* <div className="row py-5">
                        <div className="col-lg-6 col-md-6">
                            <div className="header">
                                <ul className="title-header p-0">
                                    <img className="dot" src="" alt="" />
                                    <li className="p-2">
                                        A Digital Ecosystem For Young Entrepreneurs To:
                                    </li>
                                </ul>
                                <h2>
                                    Network. Collaborate. Acquire Skills. Innovate. Showcase
                                    Ideas. Build and Monetize Your Brand.
                                </h2>
                                <p>Turn Your CRAZY IDEAS Into REALITY</p>
                                <div className="details mt-5">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        //onClick={handleLoginClick}
                                        className="hover-expand-btn"
                                        sx={{
                                            mr: 2,
                                            borderRadius: "30px",
                                            padding: "0px",
                                            width: "88px",
                                            height: "47px",
                                            fontFamily: "poppins",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            background:
                                                "linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)",
                                            textTransform: "none",
                                        }}
                                    >
                                        Login
                                        <span className="arrow-icon">
                                            <img
                                                src=""
                                                alt="Forword"
                                                style={{ width: "80%" }}
                                            />
                                        </span>
                                    </Button>

                                    <Button
                                        //onClick={handleSignUpClick}
                                        variant="contained"
                                        color="white"
                                        sx={{
                                            p: 0,
                                            borderRadius: "30px",
                                            border: "1px solid black",
                                            width: "115px",
                                            height: "47px",
                                            fontFamily: "poppins",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#000",
                                            textTransform: "none",
                                        }}
                                    >
                                        Join Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="home-img">
                                <img className="girl" src="" alt="" />
                                <img className="upercomment3" src="{upercommnet}" alt="" />
                                <img className="like" src="{like}" alt="" />
                                <img className="people" src="{people}" alt="" />
                                <img className="uparrow" src="{uparrow}" alt="" />
                                <img className="downcomment3" src="{downcomment}" alt="" />
                            </div>
                        </div>
                    </div>
                    <img className="line" src="{line}" alt="" />
                    <img className="line1" src="{line1}" alt="" /> */}


                    <div className="row">
                        <div className="col-lg-12">
                            <Box
                                sx={{
                                    py: 1,
                                    px: 10,
                                }}
                            >
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    alignItems: "center",
                                    justifyContent: "start",
                                    //height: "100vh",
                                    px: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >


                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#29008B" }}>
                                        Home Page is on its way.
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        We’re working hard to bring you something amazing. This page is currently under development, but it won’t be long before it’s ready!
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        Stay tuned for upcoming updates and exciting features!
                                    </Typography>
                                    <Typography sx={{ color: "#9A00A9" }}>Thank you for your patience and support!</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        flex: 1,
                                        display: { xs: "none", md: "flex" },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        p: 1,
                                    }}
                                >
                                    <img
                                        src="assets/images/navbar/Commingsoon.png"
                                        alt="Tree Design"
                                        style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                                    />
                                </Box>
                            </Box>

                        </div>
                    </div>
                </div>
            </main>

            {/* <div
                className="container mb-5"
                style={{ position: "relative", top: "-20pc" }}
            >
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="solution1">
                            <img
                                src="{solution1}"
                                alt="Social Media Icons"
                                className="image-left"
                            />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="text-container">
                            <h1>Why Choose</h1>
                            <h2>Activatree</h2>
                            <p>Save Time On Content Creation</p>
                            <p>
                                Easily integrate and manage your social media accounts from one
                                Dashboard. Grow your audience globally, and build your brand.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="solution2">
                            <img
                                src="{solution2}"
                                alt="Person with Tablet"
                                className="image-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container platforms">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="platform">
                            <h1>
                                Our Platform{" "}
                                <span
                                    style={{
                                        color: "#9F00AA",
                                        fontFamily: "poppins",
                                        fontWeight: 200,
                                    }}
                                >
                                    Features
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="platform">
                            <p>
                                Explore a suite of powerful tools designed to enhance
                                collaboration, creativity and professional growth. From
                                real-time co-creation to AI-powered networking, Activatree
                                offers everythinng you need to succeed
                            </p>
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Global Network</h2>
                            <p>
                                Connect globally. Expand your network. Build professional
                                relationships. Build high-value teams.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{globalnetwork}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Mentorship & Support</h2>
                            <p>
                                Connect with experienced mentors have Access to successful teen
                                entrepreneurs, and solid community support system.{" "}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{mns}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Collaborate in Real-Time</h2>
                            <p>
                                Whether it's co-creating posts, sharing a project, or
                                contributing to discussions, we make interaction simple and
                                effective, to build the ideas that matter to you.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{collobraterealtime}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Professional Accounts & Profiles</h2>
                            <p>
                                Set up Individual or Business Accounts & Profiles Pages to represent who you are and
                                showcase your business
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{pnp}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Learning & Resources</h2>
                            <p>
                                Acquire in-demand business development skills: Entrepreneurship,
                                marketing, and sales training.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{lnr}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>Earn Without Restriction</h2>
                            <p>
                                Interactive marketplace to buy and sell digital products.
                                Monetize your expertise.
                                Create subscription models to turn your
                                content into revenue.

                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{ewr}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="global-network row">
                    <div className="col-lg-6">
                        <div className="gloabal-network">
                            <h2>Forums & Community</h2>
                            <p>
                                Join discussions that support your goals, share knowledge, solve
                                industry relevant problems.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="global-network-img">
                            <img src="{fnc}" alt="" />
                        </div>
                    </div>
                </div>

                <div className="mns row">
                    <div className="col-lg-6">
                        <div className="mns-text">
                            <h2>A Safe Space</h2>
                            <p>
                                <li>Protected Environment.</li>
                                <li>Age-appropriate content. </li>
                                <li>Safe networking.</li>
                                <li>
                                    Privacy protection with 24/7 user support.</li>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mns-img">
                            <img src="{ass}" alt="" />
                        </div>
                    </div>
                </div>

            </div>



            <div className="container working-steps mt-5 py-5">
                <header className="working">
                    <h1>How It <span className='works'>Works</span></h1>
                    <p>Sign up for Activatree. Define your goals. Build your profile. Connect and network with professionals. Collaborate on Ideas and Projects. Build your brand, business, and team. Monetize your expertise or content.</p>
                    <p><span style={{ fontWeight: '600', fontSize: '20px', color: '#000' }}>Join a thriving community and get creative.</span></p>
                </header>
                <div className="steps">
                    <div className="row" style={{ gap: 23, alignItems: 'center' }}>
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{singup2}" alt="Sign Up" style={{ marginBottom: '70px' }} />
                                <h2>Claim Free Trial</h2>
                                <p>Create your account and Build / customize your profile.</p>
                            </div>
                        </div>
                        <img src="{secondstage}" alt="Stapes" className='nextstep' />
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{connectglobally}" alt="Build Up Your Profile" />
                                <h2>Connect Globally</h2>
                                <p>Network with other creators and professionals. Develop Ideas and collaborate.</p>
                            </div>
                        </div>
                        <img src="{thirdstage}" alt="Stapes" className='nextstep' />
                        <div className="col-lg-3">
                            <div className="step">
                                <img src="{earnwithoutrestriction}" alt="Start Creating or Selling" />
                                <h2>Earn without restriction</h2>
                                <p>Monetize your Content. Sell your digital products and services.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    //onClick={handleSignUpClick}
                    className="hover-expand-btn"
                    sx={{
                        mr: 2,
                        borderRadius: "30px",
                        padding: "0px",
                        ml: 2,
                        width: "115px",
                        height: "47px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        fontSize: "16px",
                        background:
                            "linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)",
                        textTransform: "none",
                    }}
                >
                    Join Now
                    <span className="arrow-icon">
                        <img
                            src="{forword}"
                            alt="Forword"
                            style={{ width: "80%" }}
                        />
                    </span>
                </Button>


            </div> */}

            {/* <footer
                style={{
                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                    color: "white",
                    padding: "40px 20px",
                    marginTop: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 17% 0px 10%",
                        marginBottom: "10px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingBottom: "20px",
                    }}
                >
                    <img
                        src="assets/images/navbar/activa tree logo (2).png"
                        alt="Tree Design"
                        style={{
                            maxWidth: "20%",
                            height: "auto",
                            marginLeft: "11%",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            marginLeft: "8%",
                            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                            paddingLeft: "1%",
                            paddingRight: "1%",
                            height: "45px",
                        }}
                    >
                        {[
                            "instagram",
                            "facebook",
                            "x",
                            "linkdin",
                            "tiktok",
                            "youtube",
                            "uo",
                        ].map((icon, index) => (
                            <Link href="#" key={index} sx={{ color: "white" }}>
                                <img
                                    src={`assets/images/footer/${icon}.png`}
                                    alt={icon}
                                    style={{ width: "24px" }}
                                />
                            </Link>
                        ))}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "20px",
                        columnGap: "50px",
                        maxWidth: "1200px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {[

                        {
                            title: "Company",
                            links: ["About Us", "Blog", "For Investors"],
                        },
                        {
                            title: "Support",
                            links: ["Help Center", "What's New"],
                        },
                        {
                            title: "Legal",
                            links: ["Privacy Policy", "Terms of Service"],
                        },
                        {
                            title: "Contact Us",
                            details: [
                                {
                                    text: "info@activatree.com",
                                    icon: "mail",
                                },
                                {
                                    text: "State of Georgia, U.S.A",
                                    icon: "location",
                                },
                            ],
                        },
                    ].map((section, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: "1 1 calc(25% - 50px)",
                                minWidth: "200px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginBottom: "10px",
                                    color: "white",
                                }}
                            >
                                {section.title}
                            </Typography>
                            {section.links ? (
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                href="#"
                                                sx={{
                                                    color: "white",
                                                    textDecoration: "none",
                                                    fontSize: "14px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                section.details?.map((detail, i) => (
                                    <Typography
                                        key={i}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "white",
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <img
                                            src={`assets/images/footer/${detail.icon}.png`}
                                            alt={detail.icon}
                                            style={{
                                                width: "20px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        {detail.text}
                                    </Typography>
                                ))
                            )}
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        marginTop: "30px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingTop: "15px",
                        marginLeft: "18%",
                        marginRight: "18%",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
                        © 2024 Activatree, a Subsidiary of Infinatree, Inc.
                    </Typography>
                </Box>
            </footer> */}


            <footer
                style={{
                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                    color: "white",
                    padding: "40px 5%",
                    marginTop: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        padding: "0 5%",
                        marginBottom: "20px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingBottom: "20px",
                    }}
                >
                    <img
                        src="assets/images/navbar/activa tree logo (2).png"
                        alt="Tree Design"
                        style={{
                            maxWidth: "280px",
                            height: "auto",
                            marginLeft: "20px",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                            padding: "10px 20px",
                            margin: "20px 0",
                        }}
                    >
                        {["instagram", "facebook", "x", "linkdin", "tiktok", "youtube", "uo"].map(
                            (icon, index) => (
                                <a
                                    href="#"
                                    key={index}
                                    style={{ color: "white", textDecoration: "none" }}
                                >
                                    <img
                                        src={`assets/images/footer/${icon}.png`}
                                        alt={icon}
                                        style={{ width: "24px" }}
                                    />
                                </a>
                            )
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        rowGap: "20px",
                        columnGap: "30px",
                        margin: "0 auto",
                        padding: "0 10%",
                    }}
                >
                    {[
                        {
                            title: "Company",
                            links: [
                                { label: "About Us", to: "/about-us" },
                                { label: "Blog", to: "/blog" },
                                { label: "For Investors", to: "/investors" },
                            ],
                        },
                        {
                            title: "Support",
                            links: [
                                { label: "Help Center", to: "/help-center" },
                                { label: "What's New", to: "/whats-new" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: [
                                { label: "Privacy Policy", to: "/privacy-policy" },
                                { label: "Terms of Service", to: "/terms-of-service" },
                            ],
                        },
                        {
                            title: "Contact Us",
                            details: [
                                {
                                    text: "info@activatree.com",
                                    icon: "mail",
                                },
                                {
                                    text: "State of Georgia, U.S.A",
                                    icon: "location",
                                },
                            ],
                        },
                    ].map((section, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: "1 1 calc(50% - 30px)",
                                minWidth: "200px",
                                maxWidth: "300px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginBottom: "10px",
                                    color: "white",
                                }}
                            >
                                {section.title}
                            </Typography>
                            {section.links && (
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                to={link.to}
                                                style={{
                                                    color: "white",
                                                    textDecoration: "none",
                                                    fontSize: "14px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.details?.map((detail, i) => (
                                <Typography
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        fontSize: "14px",
                                        lineHeight: "24px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <img
                                        src={`assets/images/footer/${detail.icon}.png`}
                                        alt={detail.icon}
                                        style={{
                                            width: "20px",
                                            marginRight: "10px",
                                        }}
                                    />
                                    {detail.text}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        marginTop: "30px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                        padding: "15px 5%",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
                        © 2024 Activatree, a Subsidiary of Infinatree, Inc.
                    </Typography>
                </Box>
            </footer>

            {/* <footer
                style={{
                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                    color: "white",
                    padding: "40px 20px",
                    marginTop: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 17% 0px 10%",
                        marginBottom: "10px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingBottom: "20px",
                    }}
                >
                    <img
                        src="assets/images/navbar/activa tree logo (2).png"
                        alt="Tree Design"
                        style={{
                            maxWidth: "20%",
                            height: "auto",
                            marginLeft: "11%",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            marginLeft: "8%",
                            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                            paddingLeft: "1%",
                            paddingRight: "1%",
                            height: "45px",
                        }}
                    >
                        {["instagram", "facebook", "x", "linkdin", "tiktok", "youtube", "uo"].map(
                            (icon, index) => (
                                <a
                                    href="#"
                                    key={index}
                                    style={{ color: "white", textDecoration: "none" }}
                                >
                                    <img
                                        src={`assets/images/footer/${icon}.png`}
                                        alt={icon}
                                        style={{ width: "24px" }}
                                    />
                                </a>
                            )
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "20px",
                        columnGap: "50px",
                        maxWidth: "1200px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {[
                        {
                            title: "Company",
                            links: [
                                { label: "About Us", to: "/about-us" },
                                { label: "Blog", to: "/blog" },
                                { label: "For Investors", to: "/investors" },
                            ],
                        },
                        {
                            title: "Support",
                            links: [
                                { label: "Help Center", to: "/help-center" },
                                { label: "What's New", to: "/whats-new" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: [
                                { label: "Privacy Policy", to: "/privacy-policy" },
                                { label: "Terms of Service", to: "/terms-of-service" },
                            ],
                        },
                        {
                            title: "Contact Us",
                            details: [
                                {
                                    text: "info@activatree.com",
                                    icon: "mail",
                                },
                                {
                                    text: "State of Georgia, U.S.A",
                                    icon: "location",
                                },
                            ],
                        },
                    ].map((section, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: "1 1 calc(25% - 50px)",
                                minWidth: "200px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginBottom: "10px",
                                    color: "white",
                                }}
                            >
                                {section.title}
                            </Typography>
                            {section.links && (
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                to={link.to}
                                                style={{
                                                    color: "white",
                                                    textDecoration: "none",
                                                    fontSize: "14px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.details?.map((detail, i) => (
                                <Typography
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        fontSize: "14px",
                                        lineHeight: "24px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <img
                                        src={`assets/images/footer/${detail.icon}.png`}
                                        alt={detail.icon}
                                        style={{
                                            width: "20px",
                                            marginRight: "10px",
                                        }}
                                    />
                                    {detail.text}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        marginTop: "30px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingTop: "15px",
                        marginLeft: "18%",
                        marginRight: "18%",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
                        © 2024 Activatree, a Subsidiary of Infinatree, Inc.
                    </Typography>
                </Box>
            </footer> */}
        </>
    );
}
export default Home;