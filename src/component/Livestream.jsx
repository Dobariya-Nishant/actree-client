import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const Livestream = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <main className="main-content">
                <div className="container">
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
                                        Livestream is on its way.
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


            <footer
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
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 10%",
                        marginBottom: "30px",
                    }}
                >
                    <img
                        src="assets/images/navbar/activa tree logo (2).png"
                        alt="Tree Design"
                        style={{
                            maxWidth: "20%",
                            height: "auto",
                            borderRadius: 8,
                        }}
                    />

                    <Box sx={{ display: "flex", gap: "15px" }}>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/instagram.png"
                                alt="Instagram"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/facebook.png"
                                alt="Facebook"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/x.png"
                                alt="X"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/linkdin.png"
                                alt="LinkedIn"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/tiktok.png"
                                alt="TikTok"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/youtube.png"
                                alt="YouTube"
                                style={{ width: "24px" }}
                            />
                        </Link>
                        <Link href="#" sx={{ color: "white" }}>
                            <img
                                src="assets/images/footer/uo.png"
                                alt="UO"
                                style={{ width: "24px" }}
                            />
                        </Link>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "20px",
                        columnGap: "50px",
                        maxWidth: "1200px",
                        marginLeft: "10%",
                        //borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingTop: "15px",
                    }}
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Company
                        </Typography>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    For Investors
                                </Link>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ marginLeft: "15%" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Support
                        </Typography>
                        <ul style={{ listStyle: "none", padding: 0, }}>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    What's New
                                </Link>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ marginLeft: "15%" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Legal
                        </Typography>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </Box>

                    <Box sx={{ marginLeft: "12%" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "white",
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography sx={{ color: "white", }}>
                            <img
                                className="me-2"
                                src="assets/images/footer/mail.png"
                                alt="Instagram"
                                style={{ width: "24px" }}
                            />
                            info@activatree.com
                        </Typography>
                        <Typography sx={{ color: "white" }}>
                            <img
                                className="me-2"
                                src="assets/images/footer/location.png"
                                alt="Instagram"
                                style={{ width: "24px" }}
                            />
                            State of Georgia, U.S.A
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        textAlign: "center",
                        marginTop: "30px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                        paddingTop: "15px",
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white" }}>
                        © 2024 Activatree, a Subsidiary of Infotree, Inc.
                    </Typography>
                </Box>
            </footer >
            {/* <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="filter-head d-center justify-content-between">
                                <div className="d-center">
                                    <button onClick={goBack} className="cmn-btn third gap-1 me-3" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>
                                        <img className="avatar-img max-un me-3" src="assets/images/socialsidebar/arrow.png" alt="icon" style={{ marginLeft: "-5px" }} />
                                    </button>
                                    <h6>Live Stream</h6>
                                </div>
                            </div>
                            <div className="banner-area pages-create mb-5">
                                <div className="single-box p-5">
                                    <div className="avatar-area">
                                        <img className="avatar-img w-100" src="assets/images/profile-cover-img.png" alt="image" />
                                    </div>
                                    <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between align-items-start">
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="avatar-item p">
                                                <img className="avatar-img max-un" src="assets/images/avatar-14.png" alt="avatar" />
                                            </div>
                                            <div className="text-area text-start">
                                                <h4 className="m-0 mb-2">Live Stream Comming Soon</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main> */}
        </>
    );
}

export default Livestream;