import React from "react";
// import { Link } from 'react-router-dom';
// import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
const AboutUs = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/aboutus.css";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);
    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-aboutus mt-5">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt="Title Arrow" /><p>About Us</p>
                    </div>
                    <div className="about-summury mb-5 dark mt-5">
                        <h3 className="mb-5">Become a Teenpreneur, Your Journey Starts Here</h3>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                        <p>The Infinatree | Be A Teenpreneur | Build Your Activatree | The Teenpreneur Hub | Turning Ordinary People Into Extraordinary Entrepreneurs</p>
                    </div>
                    <img src="assets/images/img/aboutus.png" alt="About Us" style={{ width: '100%', marginTop: "10px" }} />
                    <div className="about-activatree mt-5 mb-5">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="about-details mt-5">
                                    <h3>About <span style={{ fontWeight: '300', color: '#9F00AA' }}>Activatree</span></h3>
                                    <p className="mt-5">Activatree empowers creators and professionals to collaborate, monetize, and grow their networks seamlessly. With cutting-edge tools and AI-driven personalization, it's the platform where creativity meets opportunity.</p>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="about-details1 mt-5">
                                    <p>Activatree is the culmination of a bold vision: to create a platform where creativity, innovation, and community building converge in a digital ecosystem unlike any other making entrepreneurship accessible to all young individuals, ensuring they can ideate, initiate, and innovate their dreams into successful realities no matter the case. Proudly founded in the State of Georgia, U.S.A., as a Subsidiary of Infinatree, Inc., Activatree is more than a social media network — it's a space where individuals and businesses can connect, express themselves, share their journey, and grow their Activatrees collectively!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="history mt-5 mb-5">
                        <h3>Our Journey & <span style={{ fontWeight: '300', color: '#9F00AA' }}>History</span></h3>
                        <p className="mt-5">The seeds of Activatree were planted with a simple yet profound idea: to revolutionize how people communicate and network in the digital world. Activatree began its journey in 2023 under the original name, Activitry, and was dedicated to enhancing the high school experience for teenagers across the globe. The platform connected students with a diverse range of extracurricular opportunities, bridging the gap between youth and organizations seeking passionate young individuals. From international internships to local clubs, Activitry served as a marketplace where teenagers could find unique activities to complement their academic lives and develop skills beyond the classroom.</p>
                        <p className="mt-5">Throughout 2023, Activitry evolved, expanding its services to empower more youth by offering tools for personal and professional growth. The idea saw early success, but it became evident that the vision extended beyond simply matching students with opportunities. The potential to not only connect teens with activities but also foster entrepreneurial thinking and leadership skills led to a bold pivot.</p>
                        <p className="mt-5">In 2024, the company underwent a strategic rebranding to Infinatree, Inc. to better reflect its mission of cultivating teenpreneurs and future industry pioneers. With this transformation, the company launched Activatree, a global platform designed to inspire, guide, and empower the next generation of entrepreneurs. This new direction allowed Activatree to provide more than just extracurricular activities — it gave young people the resources, network, and tools to build their own businesses and brands from the ground up. Through this rebranding, Activatree firmly positioned itself as a leader in youth innovation, focusing on developing a safe and positive community, where teens could turn their passions into lifelong ventures.</p>
                        <p className="mt-5">With time, it became clear that we needed more than Activitry — a place where users could connect, grow, and showcase their Activatrees to the world. This evolution marked the birth of Activatree, where we took inspiration from the natural world to create a digital ecosystem focused on nurturing both personal and professional growth.</p>
                        <p className="mt-5">With time, it became clear that we needed more than Activitry — a place where users could connect, grow, and showcase their Activatrees to the world. This evolution marked the birth of Activatree, where we took inspiration from the natural world to create a digital ecosystem focused on nurturing both personal and professional growth.</p>
                        <p className="mt-5">Throughout 2023, Activitry evolved, expanding its services to empower more youth by offering tools for personal and professional growth. The idea saw early success, but it became evident that the vision extended beyond simply matching students with opportunities. The potential to not only connect teens with activities but also foster entrepreneurial thinking and leadership skills led to a bold pivot.</p>
                        <p className="mt-5">What began as a small-scale initiative has grown into a dynamic, tree-like platform that empowers individuals and businesses to build their unique Activatree made up of their activities, passions, and interests. Each profile is a tree of personal or professional growth, where every branch represents the things that matter to you, from your entrepreneurial pursuits and brands to your creative endeavors!</p>
                        <p className="mt-5">As we evolved, our vision expanded beyond traditional social networking to become a platform dedicated to building people, businesses, and dreams. Our early roots were grounded in providing a place where the next generation of teenpreneurs could thrive, and today, our platform serves as fertile soil for anyone ready to nurture their ideas into reality</p>
                        <p className="mt-5">Today, Activatree stands at the crossroads of social media and professional networking, offering a fresh take on how people build relationships in a digital-first world. Through our platform, users can:</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="about-profile mt-5">
                                <h6>Create Individual & Business Profiles</h6>
                                <p className="mt-5">Whether you're an aspiring entrepreneur, student, or an established company, Activatree enables you to set up a personalized profile to share your story, showcase your activities, and connect with like-minded individuals. These profiles act as your unique Activatree — a tree of activities
                                    that represents your journey.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="about-profile mt-5">
                                <h6>Network & Collaborate</h6>
                                <p className="mt-5">We offer dedicated spaces for networking, allowing users to find collaborators, mentors, and opportunities to grow their personal and professional brands.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="about-profile mt-5">
                                <h6>Marketplace & Workspaces</h6>
                                <p className="mt-5">Our integrated marketplace empowers users to explore, trade, and grow their businesses, while our virtual workspaces offer tools to enhance productivity and foster collaboration.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mission mt-5 mb-5">
                        <div className="row">
                            <div className="col-lg-6 mt-4">
                                <div className="ourmission mt-5">
                                    <h3>Our <span style={{ fontWeight: '300', color: '#9F00AA' }}>Mission</span></h3>
                                    <h6 className="mt-5">Our mission is simple yet profound: Empowering Growth, Shaping Tomorrow. Activatree aims to empower a global community of passionate youth with a dynamic space to cultivate their dreams, connect with others, and build their future through meaningful relationships. We are creating a platform where people can truly plant their Activatree — a tree of activities, passions, and interests — and watch it grow, branch out, and thrive in a supportive environment!</h6>
                                    <p className="mt-5">We don’t just build connections; we grow possibilities. Whether you’re a budding entrepreneur or teenpreneur, an experienced professional, or someone who wants to explore new avenues, Activatree provides the tools to root your ideas and nurture them into success. Our focus is on raising the next generation of entrepreneurs — those who will grow from teenpreneurs to leading innovators, and beyond!</p>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="ourmission mt-5">
                                    <img src="assets/images/img/mission.png" alt="Mission" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="root mt-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="rooting mt-5">
                                    <img src="assets/images/img/root.png" alt="Root" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="rooting mt-5">
                                    <h3>Rooted in Growth: <span className="mt-4" style={{ fontWeight: '300', color: '#9F00AA' }}>Building Your Activatree</span></h3>
                                    <p className="mt-5">At Activatree, we use the metaphor of growth to define our user experience. Just as trees grow and branch out, so do the passions and endeavors of our users. Build your Activatree by cultivating the branches of your interests — whether it's a business venture, creative pursuit, or personal goal. Every branch reflects the unique aspects of who you are and what you aim to achieve</p>
                                    <p className="mt-5">Our platform helps you:</p>
                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/be.png" alt="Platform" style={{ width: '10%', height: '10%', position: 'relative', top: '-1pc' }} />
                                        <div className="build-branch py-3">
                                            <h6>Choose Your Branch; Build Your Branch</h6>
                                            <p>Whether you're diving into entrepreneurship, learning new skills, or expanding your network, you can choose how to shape your journey.</p>
                                        </div>
                                    </div>
                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/van.png" alt="High Growth Trajectory" style={{ width: '10%', height: '10%', position: 'relative', top: '-1pc' }} />
                                        <div className="build-branch py-3">
                                            <h6>Rooted in Growth, Branching into the Future</h6>
                                            <p>Your Activatree is a living, evolving profile that grows with you. As you take on new challenges, collaborations, and passions, your branches multiply, representing the depth and breadth of your activities.</p>
                                        </div>
                                    </div>
                                    <p>The vision of Activatree is to create a space where everyone’s Activatree can flourish — a place where your efforts and passions are seen and appreciated. My Activatree, Your Activatree, Our Activatree!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sets mt-5">
                        <div className="row">
                            <div className="col-lg-8">
                                <h3 className="mt-5">What Sets <span className="mt-5" style={{ fontWeight: '300', color: '#9F00AA' }}>Us Apart</span></h3>
                                <p className="mt-5">Activatree isn't just a social media platform — it's an all-in-one ecosystem and global community designed to empower growth, innovation, and collaboration. While most platforms focus on connecting users through content, we go beyond by providing a comprehensive suite of features tailored to help users build, manage, and showcase their personal or business journey in a unique and meaningful way.</p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-9">
                                <div className="platform-design">
                                    <h4>Our platform is designed with innovation at its core. We are continually evolving, adding features that make your social experience richer and more dynamic. On Activatree, users can:</h4>
                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/profileses.png" alt="Platform" style={{ width: '5%', height: '10%', position: 'relative', top: '-1pc' }} />
                                        <div className="build-branch py-3">
                                            <h6>Create Individual & Business Profiles</h6>
                                            <p>Set up a personalized or professional page to represent who you are or showcase your business.</p>
                                        </div>
                                    </div>

                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/videoses.png" alt="High Growth Trajectory" style={{ width: '5%', height: '10%', position: 'relative', top: '-1pc' }} />
                                        <div className="build-branch py-3">
                                            <h6>Post Text, Photos, and Videos</h6>
                                            <p>Share your stories, creativity, and ideas with the world, whether through words, imagery, or multimedia content.</p>
                                        </div>
                                    </div>
                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/users.png" alt="Platform" style={{ width: '5%', height: '10%', position: 'relative', top: '-1pc' }} />
                                        <div className="build-branch py-3">
                                            <h6>Bookmark Content & Follow Users</h6>
                                            <p>Stay connected with the content and people that matter most to you. Bookmark your favorite posts and follow friends, influencers, and businesses.</p>
                                        </div>
                                    </div>

                                    <div className="branch mt-5 mb-5">
                                        <img src="assets/images/img/engage.png" alt="High Growth Trajectory" style={{ width: '5%', height: '10%', position: 'relative' }} />
                                        <div className="build-branch py-3">
                                            <h6>Collaborate & Engage</h6>
                                            <p>Whether it's co-creating posts, sharing a project, or contributing to discussions, we make interaction simple and effective.</p>
                                        </div>
                                    </div>
                                    <h6>What makes Activatree unique is our commitment to sustainable, infinite growth — both for our platform and for our users. We don’t just provide tools for connection; we provide a place for rooting your ambitions and seeing them flourish. Our audience is composed of teenpreneurs, visionaries, professionals, and creators who seek a space to simplify the entrepreneur journey while building meaningful connections. We provide exclusive tools for entrepreneurs and teenpreneurs, including dedicated resources for starting businesses, building networks, and even launching personal brands.</h6>
                                    <p>Activatree gives users the chance to:</p>
                                    <div className="branch mt-5 mb-5">
                                        <div className="build-branch py-3">
                                            <h6>Find Your Inner ‘Preneur’ To Become A ‘Teenpreneur’</h6>
                                            <p>Start young, start strong, and build your future in entrepreneurship.</p>
                                        </div>
                                    </div>
                                    <div className="branch mt-5 mb-5">
                                        <div className="build-branch py-3">
                                            <h6>Growing Possibilities, Infinite Futures</h6>
                                            <p> Whether you're just starting or you’re a seasoned professional, Activatree is where your future takes root.</p>
                                        </div>
                                    </div>
                                    <div className="branch mt-5 mb-5">
                                        <div className="build-branch py-3">
                                            <h6>Where Innovation Takes Root</h6>
                                            <p>We're not just a social platform, we're a launchpad for ideas, businesses, and personal growth.</p>
                                        </div>
                                    </div>
                                    <div className="branch mt-5 mb-5">
                                        <div className="build-branch py-3">
                                            <h6>Teenpreneur Coaching, Co-ops, Communities, & Mastermind Groups</h6>
                                            <p>We help users thrive, learn and network together to become Teenpreneurs.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="future">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="futures mt-5">
                                    <img src="assets/images/img/future.png" alt="Future" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="futures mt-5">
                                    <h3>Looking Ahead & Our<span className="mt-5" style={{ fontWeight: '300', color: '#9F00AA' }}> Vision for the Future</span></h3>
                                    <h6 className="mt-5">Looking forward, our vision is to make Activatree the leading platform where innovation, creativity, and collaboration thrive. We are committed to expanding our features and services, creating more value for our users, and positioning Activatree as the go-to network for professionals, businesses, and aspiring entrepreneurs. We are constantly working to introduce new features and enhancements that put our users at the forefront of innovation. From enhanced communication tools to advanced analytics for businesses, and exciting upcoming features like live streaming, VR/AR content, and collaborative tools, Activatree is more than just a social media platform—it's a hub for digital growth and interaction, the Teenpreneur Hub.</h6>
                                    <p className="mt-5">We are excited to grow alongside our users, building a platform where creativity flourishes, connections are strengthened, and communities can achieve their fullest potential. We envision a future where Activatree becomes a catalyst for change—helping users from all walks of life turn their ideas into realities, grow their influence, and leave a lasting impact on their communities and beyond.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>
                        {`
                            .community {
                                text-align: center;
                                padding: 0 5%;
                                max-width: 1200px;
                                margin: 0 auto;
                                box-sizing: border-box;
                            }

                            .community h2,
                            .community p,
                            .community h4 {
                                margin-bottom: 20px;
                                word-wrap: break-word;
                            }
                            .community h2 {
                                font-size: 28px;
                            }

                            .community p {
                                font-size: 18px;
                                line-height: 1.6;
                            }

                            .community h4 {
                                font-size: 20px;
                            }

                            .flowers {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-top: 20px;
                                flex-wrap: wrap;
                            }

                            .flowers img {
                                width: 20%;
                                max-width: 100px;
                                height: auto;
                            }

                            @media (max-width: 768px) {
                                .community h2 {
                                    font-size: 24px;
                                }

                                .community p {
                                    font-size: 16px;
                                    line-height: 1.5;
                                }

                                .community h4 {
                                    font-size: 18px;
                                }

                                .flowers img {
                                    width: 30%;
                                }
                            }

                            @media (max-width: 480px) {
                                .community h2 {
                                    font-size: 20px;
                                }

                                .community p {
                                    font-size: 14px;
                                }

                                .community h4 {
                                    font-size: 16px;
                                }

                                .flowers img {
                                    width: 40%;
                                }
                            }
                        `}
                    </style>
                    {/* <div className="community mt-5 py-5 mb-5">
                        <h2 className='mt-5' style={{ fontSize: "28px" }}>Join the Activatree Community</h2>
                        <p className='mt-5' style={{ fontSize: "18px" }}>Join us today and be part of a new wave of social media that goes beyond the ordinary. Together, we’re growing, evolving, and creating a platform that’s not just about following trends — but about setting them.</p>
                        <h4 className='mt-5' style={{ fontSize: "20px" }}>Let’s grow together, so choose your branch and build your Activatree!</h4>
                        <div className="flowers">
                            <img src="assets/images/img/flowerleft.png" alt="Flower Left" className='flowerleft' />
                            <img src="assets/images/img/flowerright.png" alt="Flower Right" className='flowerright' />
                        </div>
                    </div> */}
                    <div className="community mt-5 py-5 mb-5"
                    // style={{
                    //     textAlign: "center",
                    //     padding: "0 5%", // Add horizontal padding for all screen sizes
                    //     boxSizing: "border-box", // Ensure padding is included in width
                    //     maxWidth: "1200px", // Limit the container's width
                    //     margin: "0 auto", // Center the container horizontally
                    // }}
                    >
                        <h2
                            className="mt-5"
                            style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                marginBottom: "20px",
                            }}
                        >
                            Join the Activatree Community
                        </h2>
                        <p
                            className="mt-5"
                            style={{
                                fontSize: "18px",
                                marginBottom: "20px",
                                lineHeight: "1.6",
                            }}
                        >
                            Join us today and be part of a new wave of social media that goes beyond the
                            ordinary. Together, we’re growing, evolving, and creating a platform that’s
                            not just about following trends — but about setting them.
                        </p>
                        <h4
                            className="mt-5"
                            style={{
                                fontSize: "20px",
                                marginBottom: "30px",
                            }}
                        >
                            Let’s grow together, so choose your branch and build your Activatree!
                        </h4>
                        <div
                            className="flowers"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "20px",
                                flexWrap: "wrap", // Allow images to stack if needed
                            }}
                        >
                            <img
                                src="assets/images/img/flowerleft.png"
                                alt="Flower Left"
                                className="flowerleft"
                                style={{
                                    maxWidth: "100px",
                                    width: "20%",
                                    height: "auto",
                                }}
                            />
                            <img
                                src="assets/images/img/flowerright.png"
                                alt="Flower Right"
                                className="flowerright"
                                style={{
                                    maxWidth: "100px",
                                    width: "20%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
export default AboutUs;