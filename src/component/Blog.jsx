import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
const Blog = () => {

    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/blog.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-blog">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt=" Title Arrow" /><p>Blog</p>
                    </div>
                    <div className="blog-summury">
                        <h1>Blog</h1>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                        <p>As technology continues to reshape our digital experiences, it’s essential to stay informed and adapt. In this blog, we dive into the latest trends, tools, and strategies that are redefining how we create and interact online.    </p>
                    </div>

                    <div className="row mt-5 py-5">
                        <div className="col-lg-6">
                            <div className="revolutionizing">
                                <img src="assets/images/img/revolutionizing.png" alt="Revolutionizing" style={{ width: '100%' }} />
                                <h3>Revolutionizing Social Media Collaboration: The Activatree Way</h3>
                                <p>Social media has become an essential part of daily life, a tool that allows us to communicate, share, and create. But as the world of digital content continues to grow, so do the challenges of collaboration...</p>
                                <Link to="/revolutionizing" style={{ fontSize: '16px', fontFamily: 'Poppins, Semibold', fontWeight: '500', textDecoration: 'none', color: " black", cursor: 'pointer' }}>Read More <img src="assets/images/img/rightarrow.png" alt="Read More" style={{ width: '3%' }} /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="impactful">
                                <img src="assets/images/img/impactful.png" alt=" Impactful" style={{ width: '100%' }} />
                                <h3>Impactful Social Media Collaboration: The Activatree Way</h3>
                                <p>Social media has become an essential part of daily life, a tool that allows us to communicate, share, and create. But as the world of digital content continues to grow, so do the challenges of collaboration...</p>
                                <Link to="/impactful" style={{ fontSize: '16px', fontFamily: 'Poppins, Semibold', fontWeight: '500', textDecoration: 'none', color: " black", cursor: 'pointer' }}>Read More <img src="assets/images/img/rightarrow.png" alt="Read More" style={{ width: '3%' }} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
                            maxWidth: "200px",
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
        </>
    )

}

export default Blog;