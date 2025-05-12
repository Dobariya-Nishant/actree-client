import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Container, Paper, List, ListItem, ListItemIcon, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import {
    ShoppingCart, Work, Subscriptions, Camera, EmojiPeople, GridView, Store, RocketLaunch, CheckCircle
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Swiper, SwiperSlide } from 'swiper/react';
//import { Pagination } from 'swiper/modules';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Slider from 'react-slick';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/homepage.css";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const featureData = [
        { image: "home-1.png", text: "Social Media Post" },
        { image: "home-2.png", text: "AI-Powered Feed" },
        { image: "home-3.png", text: "Co-Creator Posting" },
        { image: "home-4.png", text: "Tips & Donations" },
        { image: "home-5.png", text: "Groups & Communities" },
        { image: "home-6.png", text: "More Features" },
        { image: "home-7.png", text: "ActivaPost" },
        { image: "home-8.png", text: "Digital Marketplace" },
        { image: "home-9.png", text: "Activa Finance" },
        { image: "home-10.png", text: "Find a Job" },
        { image: "home-11.png", text: "Messaging" },
        { image: "home-12.png", text: "Instant Payments" },
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const monetizationOptions = [
        {
            title: "Tips & Donations",
            description: "Get paid for content directly.",
            image: "/assets/images/home/monetize1.png",
        },
        {
            title: "Ad Revenue Share",
            description: "Earn from your audience engagement.",
            image: "/assets/images/home/monetize2.png",
        },
        {
            title: "Paid Subscriptions",
            description: "Offer exclusive content to followers.",
            image: "/assets/images/home/monetize3.png",
        },
        {
            title: "Marketplace Sales",
            description: "Sell products, digital goods, and services.",
            image: "/assets/images/home/monetize4.png",
        },
        {
            title: "Get Your Payments Instantly",
            description: "No more delays.",
            image: "/assets/images/home/monetize5.png",
        },
    ];
    // const monetizationOptions = [
    //     { title: "Tips & Donations", description: "Get paid for content directly.", active: true },
    //     { title: "Ad Revenue Share", description: "Earn from your audience engagement." },
    //     { title: "Paid Subscriptions", description: "Offer exclusive content to followers." },
    //     { title: "Marketplace Sales", description: "Sell products, digital goods, and services." },
    //     { title: "Get Your Payments Instantly", description: "No more delays." },
    // ];

    const features = [
        {
            title: "Sell physical & digital products.",
            description:
                "Discover the power of selling both physical and digital products on the Activatree website. With our user-friendly platform, enjoy seamless transactions and robust support. Start your journey with Activatree today!",
            icon: "../assets/images/home/sell.png",
            active: true,
        },
        {
            title: "Offer freelance services.",
            description:
                "Looking to showcase your skills? Offer your freelance services on Activatree! Whether you're a graphic designer, writer, or developer, this platform connects you with clients seeking your expertise.",
            icon: "../assets/images/home/offer.png",
        },
        {
            title: "Subscription-based services.",
            description:
                "Explore the benefits of subscription-based services on the Activatree platform. Our intuitive website allows you to easily manage your subscriptions, ensuring smooth transactions and excellent customer support.",
            icon: "../assets/images/home/subscription.png",
        },
        {
            title: "Accept tips & donations.",
            description:
                "Our intuitive platform allows you to receive support from your community effortlessly, ensuring smooth transactions and reliable assistance. Begin your journey of connecting with supporters on Activatree now!",
            icon: "../assets/images/home/accept.png",
        },
    ];

    const [digitalActiveIndex, setDigitalActiveIndex] = useState(0);
    const handleCardClick = (index) => {
        setDigitalActiveIndex(index);
    };

    const plans = [
        {
            title: "Free Plan",
            icon: "../assets/images/home/FreePlan.png",
            features: "Basic social features, Posts, Limited monetisation.",
            price: "$0.00",
            subtitle: "For Casual Users",
        },
        {
            title: "Creator Plus",
            icon: "../assets/images/home/LifetimePlan.png",
            features: "Advanced analytics, tipping, premium posts",
            price: "$9.99/mo",
            subtitle: "Influencers, content creators",
        },
        {
            title: "Business Pro",
            icon: "../assets/images/home/BusinessPlan.png",
            features: "Marketplace store, priority support, brand collabs.",
            price: "$29.99/mo",
            subtitle: "Businesses, sellers",
        },
        {
            title: "Enterprise",
            icon: "../assets/images/home/PremiumPlan.png",
            features: "Custom features, revenue share deals.",
            price: "Custom",
            subtitle: "Large brands",
        },
    ];

    const featuresActivatree = [
        {
            title: "Monetisation",
            description: "Tips, Ads, Sales, Subscriptions",
        },
        {
            title: "Revenue Cut",
            description: "25% (Very Low Fees)",
        },
        {
            title: "Co-Creation",
            description: "Multi-Creator Posting",
        },
        {
            title: "Marketplace",
            description: "Sell Digital & Physical Goods",
        },
    ];


    const testimonials = [
        {
            image: "../assets/images/home/JohnCreator.png",
            username: '@JohnCreator',
            title: 'I doubled my income since switching to Activatree!',
            description:
                '“Before Activatree, I was struggling to grow my audience and make consistent sales. Since switching, I\'ve not only doubled my income but also built a loyal community that supports my work. The best part? I keep 97% of my earnings, which is unheard of elsewhere!”',
        },
        {
            image: "../assets/images/home/ShopOwner.png",
            username: '@ShopOwner',
            title: 'Finally, a platform that truly supports creators!',
            description:
                '“I used to jump from platform to platform, hoping to find one that actually cared about creators. Activatree gave me exactly what I needed—fair earnings, a supportive community, and incredible visibility. My shop has seen a 200% revenue boost!”',
        },
        {
            image: "../assets/images/home/CreativeJen.png",
            username: '@CreativeJen',
            title: 'I quit my 9-to-5 job thanks to Activatree!',
            description:
                '“This platform helped me turn my passion into a full-time career. With Activatree\'s low fees and a massive audience, I\'m earning more than ever before—without needing a traditional job. If you\'re a creator, this is where you need to be!”',
        },
        {
            image: "../assets/images/home/LuxeCrafts.png",
            username: '@LuxeCrafts',
            title: 'Sales skyrocketed! My small shop became a brand.',
            description:
                '“I was selling handmade crafts as a side hustle, barely making ends meet. After joining Activatree, my store blew up! More exposure, real buyers, and fair earnings made all the difference. I’ve since expanded my product line and quit my day job!”',
        },
        {
            image: "../assets/images/home/TechGuru.png",
            username: '@TechGuru',
            title: 'No more fighting the algorithm Activatree is all about real engagement.',
            description: '"I used to struggle on other platforms where my posts barely got seen. Here, my content reaches the right audience, and my follower count has doubled in just 3 months!"',
        },
        {
            image: "../assets/images/home/VlogQueen.png",
            username: '@VlogQueen',
            title: 'I get 97% of my earnings—no other platform does that!',
            description: '"On mainstream platforms, I lost a huge chunk of my income to fees. Activatree changed that. Now, nearly all my earnings stay with me, and I’ve been able to reinvest in my content and grow my audience."',
        },
        {
            image: "../assets/images/home/FitnessPro.png",
            username: '@FitnessPro',
            title: 'I gained 20,000 followers in 6 months—without paying for ads!',
            description: '"Activatree has built-in tools that actually help creators grow organically. No need to pay for promotions—just post great content and let the community do the rest!"',
        },
        {
            image: "../assets/images/home/MusicMan.png",
            username: '@MusicMan',
            title: 'My music streams have exploded!',
            description: '"As an independent artist, getting noticed was tough. But since joining Activatree, my music has reached thousands of new fans. My streaming numbers have skyrocketed, and I’m finally making real money from my passion!"',
        },
        {
            image: "../assets/images/home/LocalBiz.png",
            username: '@LocalBiz',
            title: 'The best platform for small businesses!',
            description: '"I’ve tried selling on other marketplaces, but high commission fees made it impossible to profit. Activatree gives me complete control and lets me keep nearly all my earnings. My brand is thriving here!"',
        },
        {
            image: "../assets/images/home/HandmadeHeaven.png",
            username: '@HandmadeHeaven',
            title: 'My engagement is 3x higher than any other platform!',
            description: '"I was tired of social media sites where my posts barely reached my followers. Here, every post gets seen, and my sales have grown like never before. Best decision I ever made!"',
        },
        {
            image: "../assets/images/home/ShopVibes.png",
            username: '@ShopVibes',
            title: 'No more hidden fees—just real profits!',
            description: '"Other platforms kept taking massive cuts from my sales. Activatree is transparent, fair, and designed for creators like me. I finally feel like I’m in control of my business."',
        },
        {
            image: "../assets/images/home/LifestyleGuru.png",
            username: '@LifestyleGuru',
            title: 'The community here is incredible!',
            description: '"It’s not just about sales—it’s about real connections. The support from other creators has been amazing, and I’ve collaborated with so many talented people. Activatree feels like home!"',
        },
    ];

    const primiumplans = [
        {
            title: 'Free Plan',
            icon: '🎫',
            price: '$0.00',
            features: [
                '300-character limit for posts & comments',
                'Access to basic features (Posting, Following, Basic Analytics for Marketplace)',
                'Earn up to 5¢ per post in ActivaTips',
                '2-14-day pay-out for earnings',
                '28% on Seller',
            ],
            button: 'Stay on Free Plan',
            buttonColor: 'bg-gray-200 text-black',
            borderColor: 'border-gray-300'
        },
        {
            title: 'Premium Subscription',
            icon: '🚀',
            price: '$9.99/mo',
            features: [
                'Unlimited access to all digital products',
                'ActivaTips Pro: No earning limits on tips',
                'Advanced Marketplace Analytics for sellers',
                'Extended Video Features: 20MB uploads, 800+ character posts, video downloads',
                'Fast Payouts: Earnings processed within 24 hours',
                'Ad-Free* Experience: Hide ads or select preferred ad categories',
                'Priority Customer Support',
                'Exclusive Social Features: Beta access to ActivaPost, monetization tools, etc.',
                'Unlimited Post Edits & Deletes',
            ],
            button: 'Choose a Plan',
            buttonColor: 'bg-purple-500 text-white',
            borderColor: 'border-purple-300'
        },
        {
            title: 'Lifetime Membership',
            icon: '📦',
            price: '$299 or $399',
            features: [
                'All benefits of the Premium Subscription',
                'Perpetual access to all current and future digital products and features',
                'Exclusive "Founding Member" badge',
                'Early access to new features and product launches',
            ],
            button: 'Choose a Plan',
            buttonColor: 'bg-purple-500 text-white',
            borderColor: 'border-purple-300'
        },
    ];

    const faqData = [
        'How do I earn money?',
        'How is Activatree different from other social platforms?',
        'What fees does Activatree charge?',
        'How do co-creators split earnings?',
    ];

    const images = [
        { id: 1, position: 'leftTop', src: '../assets/images/home/leftTop.png' },
        { id: 2, position: 'rightTop', src: '../assets/images/home/rightTop.png' },
        { id: 3, position: 'leftBottom', src: '../assets/images/home/leftBottom.png' },
    ];

    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>
                {`
                .hero-section {
                    position: relative;
                    width: 100%;
                    height: 800px;
                    overflow: hidden;
                }
                .hero-bg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                }
                .hero-content {
                    position: absolute;
                    top: 55%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                }
                .hero-title {
                    margin-top: 50px;
                    font-size: 25px;
                    font-weight: bold;
                }
                .hero-subtext {
                    margin-top: 10px;
                    font-size: 14px;
                    margin-bottom: 20px;
                    color: white;
                    font-weight: 400px;
                }
                
                .hero-buttons {
                    margin-top: 5px;
                    display: flex;
                    text-align: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-left: 20%;
                }
                .btn-primary1 {
                    background: white;
                    color: black;
                    padding: 4px 10px;
                    border-radius: 30px;
                    //font-weight: 600;
                    font-size: 18px;
                    margin-top: 10px;
                }
                .btn-secondary {
                    border: 1px solid white !important;
                    color: white !important;
                    padding: 6px 10px;
                    //font-weight: 600;
                    border-radius: 30px;
                    text-transform: none !important;
                    font-size: 16px;
                    margin-top: 10px;
                }
                    
                .features-section {
                    text-align: center;
                    padding: 50px 0;
                }
                .section-title {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 700;
                    font-size: 30px;
                }
                .features-row {
                    overflow: hidden;
                    justify-content: start;
                    gap: 0;
                }
                .features-grid {
                    margin-top: 20px;
                }
                .feature-card {
                    flex: 0 0 auto;
                    padding: 1px;
                }
                .image-container {
                    margin: 0;
                    position: relative;
                }
                .feature-image {
                   border-radius: 15px;
                   display: block;
                   width: 100%;
                }
                .image-text {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    color: white;
                   // background: rgba(0, 0, 0, 0.6);
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 500;
                }

                @media (max-width: 600px) {
                    .features-section {
                        padding: 30px 10px;
                    }

                    .section-title {
                        font-size: 22px;
                    }

                    .feature-card {
                        text-align: center;
                    }

                    .feature-image {
                        width: 100%;
                    }
                    .image-text {
                        font-size: 12px;
                        padding: 3px 6px;
                    }

                    .btn-button {
                        font-size: 14px;
                        padding: 8px 16px;
                    }
                }
                
                .btn-button {
                    //border: 2px solid #9A00A9 !important;
                    border: 1px solid black;
                    //background: #9A00A9;
                    background: linear-gradient(to right, rgb(154, 0, 169), rgb(88, 0, 151), rgb(41, 0, 139));
                    color: white !important;
                    //padding: 10px 20px;
                    border-radius: 30px;
                    font-size:16px;
                    font-weight: 500;
                    text-transform: none !important;
                    margin-top: 20px;
                }

                .monetization-section {
                    background: #EEEDED;
                    padding: 60px 0;
                    border-radius: 30px;
                }            

                .swiper-pagination-bullet {
                    background: #9A00A9;
                }

                .fade-image {
                    opacity: 0;
                }

                .fade-image.active {
                    opacity: 1;
                }

                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Box className="hero-section">
                                <img src="assets/images/home/home.png" alt="Hero" className="hero-bg" />
                                <Box className="hero-content">
                                    <Typography variant="h3" className="hero-title">
                                        The Future of Social Media & Monetization - Empowering Creators & Sellers
                                    </Typography>
                                    <Typography variant="" className="hero-subtext">
                                        Engage, sell, and create opportunities built for you.
                                    </Typography>
                                    <Box className="hero-buttons">
                                        {!token && (
                                            <Link to="/signup" variant="contained" className="btn-primary1">Join Now</Link>
                                        )}
                                        <Link to="/marketPlace" variant="" className="btn-secondary">Explore Marketplace</Link>
                                        {token && (
                                            <Link to="/socialMedia" variant="" className="btn-secondary">Social Media</Link>
                                        )}
                                    </Box>
                                </Box>
                            </Box>

                            <Container className="features-section">
                                <Typography variant="h5" className="section-title">Unique Social Networking Features</Typography>
                                <Box className="features-row">
                                    <Slider {...settings}>
                                        {featureData.map((item, index) => (
                                            <Box key={index} className="feature-card">
                                                <div className="image-container">
                                                    <img
                                                        src={`../assets/images/home/${item.image}`}
                                                        alt={item.text}
                                                        className="feature-image"
                                                    />
                                                    <div className="image-text">{item.text}</div>
                                                </div>
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>
                                {!token && (
                                    <Button variant="contained" mt={5} className="btn-button" onClick={() => navigate('')}>Sign up for free</Button>
                                )}
                                {token && (
                                    <Button variant="contained" mt={5} className="btn-button" onClick={() => navigate('/socialMedia')}>Social Media</Button>
                                )}
                            </Container>

                            <Box className="monetization-section" sx={{ bgcolor: "#F7F7F8", py: 6, borderRadius: "30px" }}>
                                <Container>
                                    <Grid container spacing={4} alignItems="center">
                                        {/* Left Side - Title & Monetization List */}
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="h5" fontWeight={700} fontFamily="Poppins" fontSize={30} mb={2}>
                                                Monetisation – Earn from Content & Sales
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                                {monetizationOptions.map((item, index) => (
                                                    <Box
                                                        key={index}
                                                        onClick={() => setActiveIndex(index)}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            p: 2.5,
                                                            borderRadius: "30px",
                                                            bgcolor: activeIndex === index ? "#EAC4FC" : "white",
                                                            color: activeIndex === index ? "black" : "#333",
                                                            fontWeight: activeIndex === index ? 700 : 500,
                                                            cursor: "pointer",
                                                            transition: "0.3s",
                                                            position: "relative",
                                                            boxShadow: activeIndex === index ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
                                                        }}
                                                    >
                                                        <Typography variant="h6" fontWeight={600}>
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2">{item.description}</Typography>
                                                        {activeIndex === index && (
                                                            <ArrowForwardIcon
                                                                sx={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}
                                                            />
                                                        )}
                                                    </Box>
                                                ))}

                                                {/* {monetizationOptions.map((item, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            p: 2.5,
                                                            borderRadius: "30px",
                                                            bgcolor: item.active ? "#EAC4FC" : "white",
                                                            color: item.active ? "black" : "#333",
                                                            fontWeight: item.active ? 700 : 500,
                                                            cursor: "pointer",
                                                            transition: "0.3s",
                                                            position: "relative",
                                                            boxShadow: item.active ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
                                                        }}
                                                    >
                                                        <Typography variant="h6" fontWeight={600}>
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2">{item.description}</Typography>
                                                        {item.active && (
                                                            <ArrowForwardIcon sx={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }} />
                                                        )}
                                                    </Box>
                                                ))} */}
                                            </Box>
                                        </Grid>

                                        {/* Right Side - Extra Text, Button, and Image */}
                                        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
                                            <Typography variant="body1" fontWeight={500} fontSize={18} color="#131010">
                                                Creators & sellers how to generate revenue.
                                            </Typography>
                                            <Typography variant="body1" fontWeight={400} fontSize={18} color="131010" mb={2}>
                                                Some Ways to Earn.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                className="btn-button"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: 600,
                                                    px: 4,
                                                    //py: 1.5,
                                                    borderRadius: "30px",
                                                    mb: 3,
                                                }}
                                                onClick={() => navigate('/marketPlace')}
                                            >
                                                Start Earning
                                            </Button>
                                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                {/* <img
                                                    src="../assets/images/home/Monetisation.png"
                                                    alt="Monetization"
                                                    style={{ maxWidth: "100%", borderRadius: "20px" }}
                                                /> */}
                                                <img
                                                    src={monetizationOptions[activeIndex].image}
                                                    alt={monetizationOptions[activeIndex].title}
                                                    style={{ maxWidth: "100%", borderRadius: "20px", transition: "0.3s" }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>

                            <Box className="digital-marketplace" sx={{ py: 6 }}>
                                <Container>
                                    <Grid container justifyContent="space-between" alignItems="center" mb={4}>
                                        <Grid item>
                                            <Typography variant="h5" fontWeight={700} fontFamily="Poppins" fontSize={30}>
                                                Digital Marketplace – Sell & Buy <br /> Products & Services
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                className="btn-button"
                                                sx={{
                                                    fontWeight: 600,
                                                    px: 4,
                                                    //py: 1.5,
                                                    borderRadius: "30px",
                                                }}
                                                onClick={() => navigate('/marketPlace')}
                                            >
                                                Explore Marketplace
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        {features.map((feature, index) => {
                                            const isActive = digitalActiveIndex === index;
                                            return (
                                                <Grid item xs={12} sm={6} md={3} key={index}>
                                                    <Box
                                                        onClick={() => handleCardClick(index)}
                                                        sx={{
                                                            bgcolor: isActive ? "#2A0081" : "#F7F7F8",
                                                            color: isActive ? "white" : "black",
                                                            p: 3,
                                                            pt: 6,
                                                            px: 3,
                                                            pb: 3,
                                                            borderRadius: "20px",
                                                            height: "100%",
                                                            cursor: "pointer",
                                                            transition: "0.3s",
                                                            position: "relative",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 50,
                                                                height: 50,
                                                                backgroundColor: "white",
                                                                borderRadius: "12px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                position: "absolute",
                                                                top: -20,
                                                                left: 20,
                                                                boxShadow: 3,
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            <img src={feature.icon} alt={feature.title} style={{ width: 24, height: 24 }} />
                                                        </Box>
                                                        <Box sx={{ pt: 8 }}>
                                                            <Typography variant="h6" fontWeight={600}>
                                                                {feature.title}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{
                                                                mt: 1,
                                                                bgcolor: isActive ? "#2A0081" : "#F7F7F8",
                                                                color: isActive ? "white" : "black",
                                                            }}>
                                                                {feature.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>

                                    {/* <Grid container spacing={3}>
                                        {features.map((feature, index) => (
                                            <Grid item xs={12} sm={6} md={3} key={index}>
                                                <Box
                                                    sx={{
                                                        bgcolor: feature.active ? "black" : "#F7F7F8",
                                                        color: feature.active ? "white" : "black",
                                                        p: 3,
                                                        borderRadius: "20px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 1,
                                                        height: "100%",
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <img src={feature.icon} style={{ backgroundColor: "white" }} />
                                                    </Box>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {feature.title}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ backgroundColor: "white" }}>
                                                        {feature.description}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid> */}
                                </Container>
                            </Box>

                            {/* <Box sx={{ py: 6, backgroundColor: "#F9F9F9" }}>
                                <Container>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        fontWeight={700}
                                        gutterBottom
                                        fontFamily="Poppins"
                                        fontSize={30}
                                    >
                                        Plans & Memberships
                                    </Typography>

                                    <Grid container spacing={3} justifyContent="center" mt={2}>
                                        {plans.map((plan, index) => (
                                            <Grid item xs={12} sm={6} md={3} key={index}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        borderRadius: "16px",
                                                        border: "1px solid #E0E0E0",
                                                        p: 3,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 1,
                                                        alignItems: "flex-start",
                                                        height: "100%",
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <img src={plan.icon} alt="Free plan" />
                                                        <Typography variant="subtitle1" fontWeight={600}>
                                                            {plan.title}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                            mt: 1,
                                                        }}
                                                    >
                                                        <CheckCircle sx={{ fontSize: 18 }} />
                                                        <Typography variant="body2">{plan.features}</Typography>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#F2F2F2",
                                                            borderRadius: 2,
                                                            py: 2,
                                                            px: 2,
                                                            mt: 2,
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <Typography variant="h6" fontWeight={600}>
                                                            {plan.price}
                                                        </Typography>
                                                        <Typography variant="caption">{plan.subtitle}</Typography>
                                                        <Button
                                                            className="btn-button"
                                                            sx={{
                                                                mt: 2,
                                                                background:
                                                                    "linear-gradient(90deg, #9900FF 0%, #8000FF 100%)",
                                                                color: "#fff",
                                                                fontWeight: 600,
                                                                borderRadius: "10px",
                                                                textTransform: "none",
                                                                //py: 1.2,
                                                            }}
                                                        >
                                                            Choose a Plan
                                                        </Button>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>
                            </Box> */}

                            <Box
                                sx={{
                                    backgroundColor: "#FCEEFF",
                                    py: { xs: 6, md: 8 },
                                    px: { xs: 2, md: 4 },
                                    borderRadius: "60px",
                                    mt: 5,
                                    mx: { xs: 2, md: 4 },
                                }}
                            >
                                <Container maxWidth="lg">
                                    <Grid
                                        container
                                        spacing={5}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant="h5"
                                                fontWeight={700}
                                                gutterBottom
                                                sx={{ fontFamily: "Poppins" }}
                                                fontSize={30}
                                            >
                                                Why Activatree?
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {featuresActivatree.map((featureAt, i) => (
                                                    <Grid item xs={6} key={i}>
                                                        <List disablePadding>
                                                            <ListItem disableGutters>
                                                                <ListItemIcon sx={{ minWidth: 30 }}>
                                                                    <ChevronRightIcon sx={{ color: "#9900FF" }} />
                                                                </ListItemIcon>
                                                                <Box>
                                                                    <Typography fontWeight={600} fontSize="14px">
                                                                        {featureAt.title}
                                                                    </Typography>
                                                                    <Typography variant="body2" fontSize="13px">
                                                                        {featureAt.description}
                                                                    </Typography>
                                                                </Box>
                                                            </ListItem>
                                                        </List>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "20px",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                >
                                                    <video
                                                        //controls
                                                        autoPlay
                                                        muted
                                                        loop
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: "20px",
                                                            display: "block",
                                                        }}
                                                    >
                                                        <source src="../assets/images/home/FrameActivatree.mp4" type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    {/* <img
                                                        src="../assets/images/home/FrameActivatree.png"
                                                        alt="Why Activatree"
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: "20px",
                                                            display: "block",
                                                            //height: '40vh',
                                                            //maxWidth: "600px"
                                                        }}
                                                    /> */}
                                                    {/* <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            width: 60,
                                                            height: 60,
                                                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                            borderRadius: "50%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            boxShadow: 3,
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="28"
                                                            viewBox="0 0 24 24"
                                                            fill="#9900FF"
                                                        >
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </Box> */}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>

                            <div className="bg-[#fdfdfd] py-14 px-4 md:px-12 text-center">
                                <h4 className="text-4xl font-bold text-black mb-12">The Client Experience</h4>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{ clickable: true }}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    modules={[Pagination, Autoplay]}
                                    className="w-full"
                                >
                                    {testimonials.map((item, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="bg-white rounded-2xl shadow-md px-6 py-8 text-left h-full flex flex-col justify-between mx-auto max-w-sm">
                                                <div className="flex items-center mb-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.username}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                </div>
                                                <h6 className="font-semibold text-lg text-black mb-2 text-gray-800">{item.title}</h6>
                                                <p className="text-gray-700 text-sm mb-4 text-start">{item.description}</p>
                                                <h6 className="font-semibold text-black text-sm text-start">{item.username}</h6>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            {/* <div className="bg-[#fdfdfd] py-14 px-4 md:px-12 text-center w-full overflow-hidden">
                                <h3 className="text-4xl font-bold text-black mb-12">The Client Experience</h3>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    modules={[Pagination]}
                                    className="w-full"
                                >
                                    {testimonials.map((item, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="bg-white rounded-2xl shadow-md px-6 py-8 text-left h-full flex flex-col justify-between mx-auto max-w-sm">
                                                <div className="flex items-center mb-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.username}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                </div>
                                                <h6 className="font-semibold text-lg text-black mb-2 text-gray-800">{item.title}</h6>
                                                <p className="text-gray-700 text-sm mb-4 text-start">{item.description}</p>
                                                <h6 className="font-semibold text-black text-sm text-start">{item.username}</h6>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div> */}

                            <Box
                                sx={{
                                    width: '100%',
                                    backgroundImage: 'url("../assets/images/home/Monetization.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '70vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '100px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    px: 2,
                                    mt: 5,
                                }}
                            >
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        color: 'white',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    Live Activity Feed
                                </Typography>
                                {images.map((img, index) => {
                                    let positionStyles = {};
                                    if (img.position === 'leftTop') {
                                        positionStyles = { top: '10%', left: '5%' };
                                    } else if (img.position === 'rightTop') {
                                        positionStyles = { top: '10%', right: '5%' };
                                    } else if (img.position === 'leftBottom') {
                                        positionStyles = { bottom: '10%', left: '5%' };
                                    }

                                    return (
                                        <Box
                                            key={img.id}
                                            className={`fade-image ${activeImage === index ? 'active' : ''}`}
                                            component="img"
                                            src={img.src}
                                            sx={{
                                                position: 'absolute',
                                                width: '250px',
                                                height: 'auto',
                                                borderRadius: '15px',
                                                transition: 'opacity 0.8s ease-in-out',
                                                opacity: 0,
                                                ...positionStyles,
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                            {/* <Box
                                sx={{
                                    width: '100%',
                                    backgroundImage: 'url("../assets/images/home/Monetization.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '70vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '100px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    px: 2,
                                    mt: 5,
                                }}
                            >
                            </Box> */}

                            <Box sx={{ mt: 10, py: 6, backgroundColor: "#F2F2F2" }}>
                                <Container>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        fontWeight={700}
                                        gutterBottom
                                        fontFamily="Poppins"
                                        fontSize={30}
                                    >
                                        Activatree Premium Subscription Plan
                                    </Typography>

                                    <Grid container spacing={3} justifyContent="center" mt={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    backgroundColor: "#F2F2F2",
                                                    borderRadius: "16px",
                                                    border: "1px solid #E0E0E0",
                                                    p: 3,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    alignItems: "flex-start",
                                                    height: "100%",
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img src="../assets/images/home/FreePlan.png" alt="Free plan" />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Free Plan
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">300-character limit for posts & comments</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Access to basic features (Posting, Following, Basic Analytics for Marketplace)</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Earn up to $5 per post in ActivaTips</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">2-14-day pay-out for earnings</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="">28% on Seller</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#F9F9F9",
                                                        borderRadius: 2,
                                                        py: 2,
                                                        px: 2,
                                                        mt: 2,
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Typography variant="h6" fontWeight={600}>
                                                        $0.00
                                                    </Typography>
                                                    <Button
                                                        className=""
                                                        sx={{
                                                            mt: 2,
                                                            background:
                                                                "#6D6D6D",
                                                            color: "#fff",
                                                            fontWeight: 600,
                                                            borderRadius: "30px",
                                                            textTransform: "none",
                                                            //py: 1.2,
                                                        }}
                                                    >
                                                        Stay on Free Plan
                                                    </Button>
                                                </Box>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    backgroundColor: "#F5E6F6",
                                                    borderRadius: "16px",
                                                    border: "1px solid #E0E0E0",
                                                    p: 3,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    alignItems: "flex-start",
                                                    height: "100%",
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img src="../assets/images/home/PremiumPlan.png" alt="Premium plan" />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Premium Subscription
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="">Unlimited access to all digital products</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">ActivaTips Pro: No earning limits on tips</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Advanced Marketplace Analytics for sellers</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Extended Video Features: 20MB uploads, 800-character posts, video downloads</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Fast Payouts: Earnings processed within 24 hours</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Ad-Free+ Experience: Hide ads or select preferred ad categories</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Priority Customer Support</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Exclusive Social Features: Beta access to ActivaPost, monetization tools, etc.</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Unlimited Post Edits & Deletes</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#F9F9F9",
                                                        borderRadius: 2,
                                                        py: 2,
                                                        px: 2,
                                                        mt: 2,
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Typography variant="h6" fontWeight={600}>
                                                        $9.99
                                                    </Typography>
                                                    <Typography variant="body2">Per Month</Typography>
                                                    <Button
                                                        className="btn-button"
                                                        sx={{
                                                            mt: 2,
                                                            background:
                                                                "linear-gradient(90deg, #9900FF 0%, #8000FF 100%)",
                                                            color: "#fff",
                                                            fontWeight: 600,
                                                            borderRadius: "10px",
                                                            textTransform: "none",
                                                            //py: 1.2,
                                                        }}
                                                    >
                                                        Choose a Plan
                                                    </Button>
                                                </Box>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    backgroundColor: "#F5E6F6",
                                                    borderRadius: "16px",
                                                    border: "1px solid #E0E0E0",
                                                    p: 3,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    alignItems: "flex-start",
                                                    height: "100%",
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <img src="../assets/images/home/LifetimePlan.png" alt="Lifetime plan" />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Lifetime Membership
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">All benefits of the Premium Subscription</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Perpetual access to all current and future digital products and features</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Exclusive "Founding Member" badge</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">Early access to new features and product launches</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 18 }} />
                                                    <Typography variant="body2">28% on Seller</Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        backgroundColor: "#F9F9F9",
                                                        borderRadius: 2,
                                                        py: 2,
                                                        px: 2,
                                                        mt: 2,
                                                        width: "100%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Typography variant="h6" fontWeight={600}>
                                                        $299 or $399
                                                    </Typography>
                                                    <Typography variant="body2">One Time Payment</Typography>
                                                    <Button
                                                        className="btn-button"
                                                        sx={{
                                                            mt: 2,
                                                            background:
                                                                "linear-gradient(90deg, #9900FF 0%, #8000FF 100%)",
                                                            color: "#fff",
                                                            fontWeight: 600,
                                                            borderRadius: "10px",
                                                            textTransform: "none",
                                                            //py: 1.2,
                                                        }}
                                                    >
                                                        Choose a Plan
                                                    </Button>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        {/* <Button
                                            className="btn-button"
                                            sx={{
                                                mt: 2,
                                                background:
                                                    "linear-gradient(90deg, #9900FF 0%, #8000FF 100%)",
                                                color: "#fff",
                                                fontWeight: 600,
                                                borderRadius: "10px",
                                                textTransform: "none",
                                                //py: 1.2,
                                            }}
                                        >
                                            See Fully Features
                                        </Button> */}
                                    </Grid>
                                </Container>
                            </Box>

                            <Box sx={{ py: 8, px: 2, textAlign: "center" }}>
                                <Typography variant="h5" fontWeight={700} fontSize={30} mb={1}>
                                    How It Works
                                </Typography>
                                <Typography variant="body1" color="text.secondary" mb={6}>
                                    Join a thriving community and get creative.
                                </Typography>

                                <Grid container spacing={4} justifyContent="center">
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <img src="../assets/images/home/claimfree.png" alt="Claim Free Trial" width="90%" />
                                            <Typography variant="h6" fontWeight={600} mt={2}>
                                                Claim Free Trial
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1}>
                                                Create your account and Build | Customize your profile.
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <img src="../assets/images/home/connectglobal.png" alt="Connect Globally" width="70%" />
                                            <Typography variant="h6" fontWeight={600} mt={2}>
                                                Connect Globally
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1}>
                                                Network with other creators and professionals. Develop ideas and collaborate.
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <img src="../assets/images/home/earn.png" alt="Earn without restriction" width="70%" />
                                            <Typography variant="h6" fontWeight={600} mt={2}>
                                                Earn without restriction
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1}>
                                                Monetize your Content. Sell your digital products and services.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Button
                                    className="btn-button"
                                    sx={{
                                        mt: 2,
                                        background:
                                            "linear-gradient(90deg, #9900FF 0%, #8000FF 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        //py: 1.2,
                                    }}
                                >
                                    Sign up for free
                                </Button>
                            </Box>

                            <Box sx={{ px: 4, py: 6, backgroundColor: "#fafafa" }}>
                                <Typography variant="h5" fontWeight="bold" fontSize={30}>
                                    FAQ & Support,
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" fontSize={30} mb={4}>
                                    Increase Audience Engagement
                                </Typography>

                                <Grid container spacing={2}>
                                    {faqData.map((faq, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "50px",
                                                    px: 3,
                                                    py: 1.5,
                                                    backgroundColor: "#fff",
                                                }}
                                            >
                                                <Typography variant="body1" fontWeight={500}>
                                                    {faq}
                                                </Typography>
                                                <IconButton
                                                    sx={{
                                                        backgroundColor: "#f2f2f2",
                                                        borderRadius: "50%",
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box
                                    mt={8}
                                    sx={{
                                        bgcolor: '#24028c',
                                        borderRadius: '32px',
                                        color: '#fff',
                                        p: { xs: 4, md: 6 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold">
                                        Join Activatree – The Future Of Social Media & Monetization"
                                    </Typography>
                                    <Button
                                        variant="text"
                                        endIcon={
                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: "2rem",
                                                }}
                                            />
                                        }
                                        sx={{
                                            mt: { xs: 2, md: 0 },
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: "3rem",
                                        }}
                                    >
                                        →
                                    </Button>
                                </Box>
                            </Box>

                            {/* <Box
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
                            </Box> */}
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>
    );
}
export default Home;