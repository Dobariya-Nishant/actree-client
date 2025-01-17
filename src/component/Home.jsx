import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";


const Home = () => {



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
                                        Home is on its way.
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
            </footer >



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
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 10%",
                        marginBottom: "30px",
                        marginLeft: "8%",
                    }}
                >
                    <img
                        src="assets/images/navbar/activa tree logo (2).png"
                        alt="Tree Design"
                        style={{
                            maxWidth: "20%",
                            height: "auto",
                        }}
                    />
                    <Box sx={{ display: "flex", gap: "20px", marginLeft: "5px" }}>
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
                                    style={{ width: "24px", }}
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
                        <Box key={index} sx={{ flex: "1 1 calc(25% - 50px)", minWidth: "200px" }}>
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
                                        }}
                                    >
                                        <img
                                            src={`assets/images/footer/${detail.icon}.png`}
                                            alt={detail.icon}
                                            style={{ width: "20px", marginRight: "10px" }}
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
                    }}
                >
                    <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
                        © 2024 Activatree, a Subsidiary of Infotree, Inc.
                    </Typography>
                </Box>
            </footer> */}


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
            </footer> */}


            {/* <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
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
                                                <h4 className="m-0 mb-2">Home Page</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="page-details">
                                        <ul className="nav mt-5 pt-4 flex-wrap gap-2 tab-area">
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-post.html" className="nav-link d-center active">Post</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-about.html" className="nav-link d-center">About</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-photos.html" className="nav-link d-center">Photos</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-group.html" className="nav-link d-center">Groups</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-connections.html" className="nav-link d-center">Connections</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a href="profile-events.html" className="nav-link d-center">Events</a>
                                            </li>
                                        </ul>
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

export default Home;