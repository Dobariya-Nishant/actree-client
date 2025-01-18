import React from "react";
import { Box, Typography, Button, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
const StyledListItem = styled(ListItem)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
}));
const Whatsnew = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/whatsnew.css";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);
    const features = [
        {
            title: 'Create Your Profile:',
            description:
                "Work with multiple creators in real-time on a single post. Expand your content's potential through collaboration and innovation.",
        },
        {
            title: 'Sign-Up is Live!:',
            description:
                'It’s easier than ever to join the Activatree community. Start today and build your presence.',
        },
        {
            title: 'Social Media Page Setup:',
            description: 'Customize your own social media page to showcase your brand or personal profile.',
        },
        {
            title: 'Text, Photo, and Video Posts:',
            description: 'Share updates, images, and videos easily with your audience and engage with your community.',
        },
        {
            title: 'Bookmark Content:',
            description: 'Save posts for later, so you can revisit the content that matters most to you.',
        },
        {
            title: 'Follow & Follower System:',
            description:
                'Follow others to stay updated with their posts, and have your friends or audience follow you in return.',
        },
    ];
    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-whatsnew">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt=" Title Arrow" /><p>What's New</p>
                    </div>
                    <div className="whats-summury">
                        <h1>What's New</h1>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                        <p>We're excited to announce the launch of Activatree! Here's what's available for you.</p>
                    </div>
                    <Box sx={{ marginTop: '5pc' }}>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize: '45px', fontFamily: 'Poppins, Bold', fontWeight: '700' }}>
                            For Social Media:
                        </Typography>
                        <List>
                            {features.map((feature, index) => (
                                <StyledListItem key={index}>
                                    <ListItemIcon>
                                        <img src="assets/images/img/point.png" alt="Pointer icon" style={{ width: '24px', height: '24px' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" component="h3" fontWeight="bold" margin={0} sx={{ fontSize: '20px', fontFamily: 'Poppins, Bold', margin: '0px' }}>
                                                {feature.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px', fontFamily: 'Poppins, Regular', color: '#63676A' }}>
                                                {feature.description}
                                            </Typography>
                                        } sx={{ marginTop: '-5px' }}
                                    />
                                </StyledListItem>
                            ))}
                        </List>
                        <Typography variant="body1" color="textSecondary" align="flex-start" fontWeight="bold" sx={{ marginTop: '2rem', fontSize: '20px', fontFamily: 'Poppins, Bold', color: 'black' }}>
                            This content focuses on the foundational features while encouraging users to join and engage with the platform.
                        </Typography>
                        <div className="row mt-5 mb-5">
                            <div className="col-lg-6">
                                <Box sx={{ textAlign: 'justify' }}>
                                    <Typography variant="h6" sx={{ fontSize: '24px', fontFamily: 'Poppins, Medium', fontWeight: '500', lineHeight: '1.2' }}>
                                        Join us as we grow and continue to add exciting new features to enhance your experience!
                                    </Typography>
                                </Box>
                            </div>
                            <div className="col-lg-6">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Your email"

                                        sx={{
                                            mb: 2,
                                            '& .MuiOutlinedInput-root': { borderRadius: '50px', width: '300px', padding: '1px 14px' }
                                        }}
                                    />
                                    <Button variant="contained" sx={{ height: '47px', borderRadius: '30px', fontFamily: 'poppins', fontWeight: '600', fontSize: '14px', background: 'linear-gradient(90deg, #9A00A9 34%, #580097 77%, #29008B 100%)', textTransform: 'none' }}>
                                        Get in touch
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </Box>
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
    );
}
export default Whatsnew;