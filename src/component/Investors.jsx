import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
const Investors = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/invetors.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);
    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-investor">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt="Title Arrow" /><p>Investors</p>
                    </div>
                    <div className="investors-summury">
                        <h1>Dear Potential Investors</h1>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                        <p>Discover the opportunity to invest in Activatree, a pioneering social media platform reshaping the way people connect, collaborate, and create. Our mission is to foster innovation in social networking with features that empower users and businesses alike.</p>
                    </div>
                    <div className="invest mt-5">
                        <div className="invest-activatree" style={{ width: '620px' }}>
                            <h1>Why Invest in <span style={{ fontSize: '45px', fontFamily: 'Poppins, Mixed', fontWeight: 400, color: '#9F00AA' }}>Activatree</span></h1>
                            <p>Activatree empowers creators and professionals to collaborate, monetize, and grow their networks seamlessly. With cutting-edge tools and AI-driven personalization, it's the platform where creativity meets opportunity.</p>
                        </div>
                        <div className="innovatives mt-4 mb-5">
                            <img src="assets/images/img/one.png" alt="Platform" />
                            <div className="innovative py-3">
                                <h2>Innovative Platform</h2>
                                <p>Activatree is revolutionizing the social media landscape by combining immersive experiences, AI-driven content creation, and eco-conscious digital innovation.</p>
                            </div>
                        </div>
                        <div className="innovatives mt-4 mb-5">
                            <img src="assets/images/img/two.png" alt="High Growth Trajectory" />
                            <div className="innovative py-3">
                                <h2>High Growth Trajectory</h2>
                                <p>With a fast-growing global community and a unique blend of features, Activatree is positioned to scale rapidly and attract a wide user base.</p>
                            </div>
                        </div>
                        <div className="innovatives mt-4 mb-5">
                            <img src="assets/images/img/three.png" alt="Strong Leadership" />
                            <div className="innovative py-3">
                                <h2>Strong Leadership</h2>
                                <p>Led by a team with a proven track record in tech and social media development.</p>
                            </div>
                        </div>
                        <div className="innovatives mt-4 mb-5">
                            <img src="assets/images/img/four.png" alt="Tech-Driven Impact" />
                            <div className="innovative py-3">
                                <h2>Tech-Driven Impact</h2>
                                <p>From blockchain integration to AI-powered tools, our platform is built on a foundation of cutting-edge technologies designed for the future.</p>
                            </div>
                        </div>
                        <div className="innovatives mt-4 mb-5">
                            <img src="assets/images/img/five.png" alt="Sustainable" />
                            <div className="innovative py-3">
                                <h2>Sustainable and Ethical Growth</h2>
                                <p>We are committed to building a platform that aligns with environmental and ethical standards, promoting a sustainable digital ecosystem.</p>
                            </div>
                        </div>
                    </div>
                    <div className="invest-engage">
                        <div className="invest" style={{ width: '620px' }}>
                            <h1>Investor <span style={{ fontSize: '45px', fontFamily: 'Poppins, Mixed', fontWeight: 400, color: '#9F00AA' }}>Engagement</span></h1>
                            <p>At Activatree, we offer strategic investment opportunities in a growing social media platform that blends cutting-edge technology with a sustainable vision. Partner with us to help shape the future of digital networking and innovation.</p>
                        </div>
                        <div className="container my-5">
                            <div className="row">
                                <div className="col-lg-5 mb-4">
                                    <div className="investment-opportunities p-4" style={{ backgroundColor: '#8400A3', borderRadius: '15px' }}>
                                        <h2 className="text-white">Investment Opportunities</h2>
                                        <p className="text-white">
                                            Interested in exploring investment opportunities with Activatree?
                                        </p>
                                        <p className="text-white">
                                            We offer in-depth insights into our growth strategy, financial performance, and long-term vision.
                                        </p>
                                        <p className="text-white">
                                            For more information or to schedule a meeting, please reach out to our investor relations team at
                                        </p>
                                        <div className="email-sections">
                                            <p className="email-section">
                                                <img src="assets/images/img/email.png" alt=" Email Icon" style={{ width: '25px', marginRight: '10px' }} />
                                                <span className="text-white">investors@activatree.com</span>
                                            </p>
                                            <div className="text-white">
                                                <img src="assets/images/img/investarrow.png" alt=" Arrow Icon" style={{ width: '27%', position: 'relative', top: '-2pc', left: '3pc' }} />
                                            </div>
                                        </div>
                                        <div className="text-white">
                                            <img src="assets/images/img/money.png" alt="Money Icon" style={{ width: '23%', position: 'relative', left: '-2pc', top: '2pc' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 mb-4">
                                    <div className="contact-form p-6" style={{ backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
                                        <h5>Join us in shaping the future of social media.</h5>
                                        <form className="mt-2">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <input type="text" className="form-control" placeholder="Your name" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <input type="text" className="form-control" placeholder="Your company name" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <input type="text" className="form-control" placeholder="Your phone number" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <input type="email" className="form-control" placeholder="Your email" />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <textarea className="form-control" placeholder="Your message" rows="4"></textarea>
                                                </div>
                                                <div className="col-12 d-flex flex-row-reverse">
                                                    <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)', borderWidth: '0px' }}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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
            </footer>
        </>
    )
}
export default Investors;