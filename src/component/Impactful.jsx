import React from "react";
// import { Box, Typography } from "@mui/material";
// import { Link } from 'react-router-dom';
import Footer from "./Footer";
const Impactful = () => {
    return (
        <>
            <style>
                {`
                    .title-impact {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                    }

                    .title-impact img{
                        width: 2%;
                        height: 2%;
                    }
                    .small-icon {
                        width: 5%;
                        margin-left: -4%;
                        margin-top: -3%;
                    }

                    .title-impact p{
                        font-size: 18px;
                        font-family: "Poppins, Regular", sans-serif;
                        font-weight: normal;
                        margin: 0px;
                        align-items: center;
                    }

                    .impactful-title h3 {
                        font-size: 40px;
                        font-family: "Poppins, Bold" sans-serif;
                        font-weight: 700;
                        text-align: center;
                    }

                    .impactful-summury p {
                        font-size: 20px;
                        font-family: "Poppins, Semibold" sans-serif;
                        font-weight: 600;
                        text-align: left;
                        line-height: 32px;
                        margin-top: 20px;
                    }

                    .activatree p {
                        font-size: 14px;
                        font-family: "Poppins, Mixed" sans-serif;
                        font-weight: 400;
                        color: #63676a;
                        text-align: left;
                        margin-top: 10px;
                    }
                    @media (max-width: 768px) {
                        .impactful-title h3 {
                            font-size: 5vw;                            
                        }

                        .impactful-summury p,
                        .activatree p {
                            font-size: 3vw;
                        }
                        .title-impact img {
                            width: 20px;
                        }

                        .small-icon {
                            width: 30px;
                            left: 2%;
                            top: 5%;
                        }
                    }
                    @media (max-width: 480px) {
                        .impactful-title h3 {
                            font-size: 6vw;
                        }

                        .impactful-summury p,
                        .activatree p {
                            font-size: 4vw;                            
                        }

                        .title-impact {
                            flex-direction: column;
                        }                          

                        .title-impact img {
                            width: 15px;
                        }
                    }

                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="title-impact">
                        <p>Blog</p><img src="../assets/images/img/titlearrow.png" alt="Title Arrow" /><p>Creating Impactful Social Media Content with Activatree’s Unique Features</p>
                    </div>
                    <div className="impactful-title mt-5">
                        <h3>Creating Impactful Social Media Content with Activatree’s Unique Features</h3>
                    </div>

                    <img src="../assets/images/img/impactful1.png" alt="Impactful" className="responsive-img mt-5" />
                    <img src="../assets/images/img/start.png" alt="Star" className="small-icon" />

                    <div className="impactful-summury">
                        <p>In an age where content is king, standing out on social media is a growing challenge. With millions of posts uploaded to platforms like Instagram, TikTok, and Facebook every day, how do you make your voice heard? The answer isn’t just in creating more content but in creating impactful content—content that not only gets attention but also resonates with your audience. Activatree is here to help you achieve that, offering a range of innovative tools designed to optimize your social media presence.</p>
                    </div>

                    <div className="impactful-summury">
                        <p>What Makes Social Media Content Impactful?</p>
                    </div>

                    <div className="activatree">
                        <p>Before we dive into the unique features Activatree offers, it’s important to understand what makes content impactful in today’s saturated digital landscape. Impactful content is authentic, relevant, and provides value to the audience. Whether you’re an influencer, a brand, or a casual user, the goal should always be to create posts that connect with people on a personal leve</p>
                    </div>

                    <div className="impactful-summury">
                        <p>The Activatree Advantage: Personalized Content Creation</p>
                    </div>

                    <div className="activatree">
                        <p>One of Activatree’s standout features is its ability to <b>personalize content</b> like never before. With our platform’s AI-driven tools, you can create posts that are tailored to your audience, increasing the likelihood of engagement. Activatree provides options to build <b>interactive polls</b>, customize <b>post themes</b> for special events or campaigns, and even use <b>AI-generated content insights</b> to optimize messaging.</p>
                        <p>For example, if you’re planning a product launch, you can use Activatree’s AI insights to see which types of posts are trending in your niche, allowing you to create content that taps into popular themes while still staying authentic to your brand voice. Whether you’re sharing a blog, a video, or an image, personalization helps your content stand out in the crowd.</p>
                    </div>

                    <div className="impactful-summury">
                        <p>Building Stronger Communities with Activatree</p>
                    </div>

                    <div className="activatree">
                        <p>Another powerful aspect of Activatree is its focus on <b>community building.</b> Social media is not just about posting content—it’s about connecting with like-minded individuals and building lasting relationships. Activatree offers tools that allow users to create <b>groups and communities</b> around specific interests, fostering deeper engagement.</p>
                        <p>Imagine being able to host <b>live-streams</b> and virtual events directly from your social media platform. Whether you’re organizing a product reveal, a Q&A session, or even a virtual networking event, Activatree provides the infrastructure to make these experiences seamless and engaging. These types of events create strong, loyal communities around your brand or personal profile, boosting engagement and reach. </p>
                    </div>

                    <div className="impactful-summury">
                        <p>The Future of Content Creation: From AI to VR</p>
                    </div>

                    <div className="activatree">
                        <p>Activatree is pushing the boundaries of what’s possible on social media by incorporating advanced features like <b>AI-generated content labelling</b> and <b>virtual reality (VR) content formats.</b> These tools allow you to create next-level content that captures the attention of today’s audiences.</p>
                        <p>The AI-generated content labelling feature helps you categorize your posts more efficiently, allowing your audience to find exactly what they’re looking for. This also improves your content’s discoverability, ensuring it reaches the right people at the right time.</p>
                        <p>On the other hand, VR content formats offer an entirely new dimension for content creators. Imagine creating a post that your audience can not only view but also interact with in a fully immersive VR space. These futuristic tools set Activatree apart from traditional platforms, giving users the ability to explore the latest trends in content creation and stay ahead of the curve.</p>
                    </div>

                    <div className="impactful-summury">
                        <p>Eco-Friendly Social Media for the Modern Age</p>
                    </div>

                    <div className="activatree">
                        <p>At a time when sustainability is a growing concern, Activatree is committed to integrating <b>eco-friendly initiatives</b> into the social media experience. We believe that social media can be both innovative and responsible. By incorporating environmentally conscious features and promoting sustainable practices, Activatree offers users a chance to make a positive impact through their digital interactions.</p>
                        <p>Whether it’s through <b>energy-efficient servers</b>, digital minimalism strategies, or partnerships with eco-friendly organizations, Activatree is designed to ensure that your social media presence doesn’t come at the cost of the planet.</p>
                    </div>

                    <div className="impactful-summury">
                        <p>Conclusion: A Platform Designed for the Future</p>
                    </div>

                    <div className="activatree">
                        <p>Activatree is more than just a social media platform—it’s a tool for creating impactful, innovative, and responsible content. With features like personalized content creation, community-building tools, AI-driven insights, and even VR content formats, Activatree provides everything you need to stay ahead in today’s fast-paced digital world.</p>
                    </div>
                </div>
            </main>
            <Footer />
            {/* <footer
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
            </footer> */}
        </>
    )
};
export default Impactful;