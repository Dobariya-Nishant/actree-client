import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
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
                                        Home Page is on its way.
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        We’re working hard to bring you something amazing. This page is currently under development, but it won’t be long before it’s ready!
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        Stay tuned for upcoming updates and exciting features!
                                    </Typography>
                                    <Typography sx={{ color: "#9A00A9" }}>Thank you for your patience and support!</Typography>
                                    {!token && (
                                        <li className="d-flex">
                                            <Link
                                                to="/login"
                                                className="btn me-2"
                                                style={{
                                                    border: "1px solid black",
                                                    borderRadius: "30px",
                                                    height: "40px",
                                                    width: "90px",
                                                    marginTop: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <span style={{ color: "#131010", fontWeight: "bold" }}>Log In</span>
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="cmn-btn"
                                                style={{
                                                    border: "1px solid black",
                                                    color: "black",
                                                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                    borderRadius: "30px",
                                                    height: "40px",
                                                    width: "110px",
                                                    marginTop: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <span style={{ color: "white", fontWeight: "bold" }}>Join Now</span>
                                            </Link>
                                        </li>
                                    )}
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
            <Footer />
        </>
    );
}
export default Home;