import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
const Termsofservice = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/termsofservice.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-terms">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt="Title Arrow" /><p>Terms Of Service Agreement</p>
                    </div>
                    <div className="terms-summury">
                        <h1>Terms of Service Agreement</h1>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                    </div>

                    <div className="activatree-details">
                        <p><span>Effective Date:</span> Monday, Oct 28, 2024</p>
                        <p><span>Last Updated:  </span>Saturday, Nov 16, 2024</p>
                        <p><span>Company: </span>Activatree, a Subsidiary of Infinatree, Inc.</p>
                        <p><span>Contact Email:</span> <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</a></p>
                    </div>

                    <div className="welcome-activatree mb-3">
                        <p>Welcome to Activatree <b>(“ we ”, “us”, “ our ”, or “ the Company ”).</b> These Terms of Service (“Terms”) govern your access to and use of our platform, websites, applications, and services (collectively, the “Service”). By accessing or using the Service, you agree to these Terms. If you do not agree, you may not use the Service. Please read them carefully.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By creating an account, accessing, or using the Service, you agree to be legally bound by these Terms. If you disagree with any part of these Terms, please refrain from using the Service. You acknowledge that these Terms are a legally binding contract between you and Activatree.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>2. Description of the Service</h2>
                        <p>Activatree is a multi-functional social media and professional networking platform that incorporates features akin to LinkedIn, Upwork, Facebook, Instagram, Threads, TikTok, YouTube, Rumble, Gettr, X (formerly Twitter), SnapChat, Pinterest, Reddit, Discord, BeReal, TruthSocial, HootSuite, Buffer, Sprout Social, Loomly, SocialBee, Crowdfire, SocialPilot, Allin-One Social, and Spotify among others. Our platform allows users to:</p>
                        <ul>
                            <li><img src="assets/images/img/point.png" alt="Point" />Create personal and professional profiles.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Share multimedia content such as photos, videos, music, and blog posts.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Collaborate with other users on creative projects.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Discover job opportunities and freelance work. I'm sorry, but it seems that there is no text provided for me to edit. Please provide the text you would like me to work on.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Engage with various communities, live-stream events, and more.</li>
                        </ul>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>3. Eligibility to Use the Service</h2>
                        <p>To use the Service, you must:</p>
                        <ul>
                            <li><img src="assets/images/img/point.png" alt="Point" />Be at least 12 years of age or the age required by local law to form a binding contract.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Have the power to enter into a legally binding agreement with us and are not barred from using the Service under applicable laws.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Provide accurate, current, and complete information during the registration process and update such information to keep it accurate and complete.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Discover job opportunities and freelance work.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Comply with all applicable laws, including those related to data privacy, intellectual property, and export control.</li>
                        </ul>
                        <p>If you are using the Service on behalf of a company, organization, or another legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>4. User Accounts and Responsibilities</h2>
                        <ul>
                            <li style={{ fontWeight: '600' }}>4.1 Account Suspension and Termination</li>
                            <ul>
                                <p>We reserve the right to suspend or terminate your account at any time, for any reason, including if you violate these Terms of Service or our Privacy Policy. You may also terminate your account by contacting us or through the Service. Upon termination, you will no longer have access to the Service or your account, and any content you have stored on the Service may be deleted.</p>
                            </ul>
                        </ul>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>5. User Conduct</h2>

                        <ul>

                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Abuse:</span> You may not harass, abuse, threaten, or otherwise violate the legal rights of others.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Infringement:</span> You may not post or share content that infringes on the intellectual property or privacy rights of others.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Misrepresentation:</span> You may not impersonate another person, misrepresent your identity, or falsely associate with any entity.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Malicious Activity:</span> You may not upload viruses, malware, or engage in activities that compromise the security or functionality of the Service.</li>
                        </ul>
                        <p>Activatree reserves the right to take appropriate legal action against users who violate these Terms, including terminating their accounts.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>6. Content on the Service</h2>
                        <ul>
                            <li style={{ fontWeight: '600' }}>6.1 User-Generated Content</li>
                            <ul>
                                <p>You retain ownership of any content you create and post on the Service, including but not limited to text, images, audio, video, and other materials (“User Content”). By submitting, posting, or displaying User Content on or through the Service, you grant Activatree a worldwide, non-exclusive, royaltyfree, transferable license to use, reproduce, distribute, and display such content in connection with operating and providing the Service.</p>
                                <p>You represent and warrant that:</p>
                                <ul>
                                    <li><img src="assets/images/img/point.png" alt="Ponit" />You own or have the necessary rights to use and grant the license for the User Content.</li>
                                    <li><img src="assets/images/img/point.png" alt="Ponit" />Your User Content and your use of the Service do not violate any applicable laws, regulations, or third-party rights.</li>
                                </ul>
                                <p>If you believe your account has been compromised, you must notify us immediately at <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</a>.</p>
                            </ul>
                            <li style={{ fontWeight: '600' }}>6.2 Activatree Intellectual Property</li>
                            <ul>
                                <p>All materials and content provided by Activatree, including text, software, scripts, graphics, photos, sounds, music, videos, interactive features, trademarks, service marks, and logos are owned by or licensed to Activatree and are protected by copyright, trademark, and other intellectual property laws. You may not use or reproduce any part of the Service or its contents without express written consent from Activatree.</p>
                            </ul>
                        </ul>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>7. Privacy and Data Collection</h2>
                        <p>Your privacy is important to us. We collect, use, and disclose your personal information in accordance with our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our collection, use, and sharing of your data as outlined in the Privacy Policy.</p>
                        <p>At Activatree, we take the privacy and protection of user data very seriously, especially when it comes to the personal information of minors. We want to make it clear that our platform is not designed to collect, sell, or misuse user data in any way that violates legal or ethical standards. Our commitment to user privacy is paramount, and while we acknowledge that certain data collection is essential for the proper functioning of the platform, we strive to limit the amount of data collected to the minimum necessary to provide our services.</p>
                        <p>For users who are minors, we implement strict protocols in compliance with data protection regulations, such as the <b>Children's Online Privacy Protection Act (COPPA)</b> in the United States and <b>General Data Protection Regulation (GDPR)</b> in Europe, ensuring that personal data is handled with the highest degree of care and security. We do not sell or share the personal information of minors to third parties for marketing or any illegal purposes.</p>
                        <p>Although we operate in an industry where some level of data collection is unavoidable, we emphasize that our primary goal is to create a safe, productive, and positive environment for all users, especially younger audiences. We believe in safeguarding user privacy, and in any situation where more restrictive data collection could be beneficial for our users' protection, we are committed to implementing such practices to the best of our ability within the confines of legal and technical limitations.</p>
                        <p>In summary, we are committed to protecting your data and using it responsibly. We will never misuse your personal information, and data collected from minors is subject to the strictest standards of security and privacy.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>8. Payment and Subscription Services</h2>
                        <p>Certain features of the Service may require a paid subscription or one-time payment. By choosing to access such features, you agree to pay all applicable fees and charges. We reserve the right to modify pricing at any time. Subscription fees will be charged based on the billing cycle you choose (monthly, yearly, etc.)</p>
                        <ul>
                            <li><b>8.1 Refund Policy</b></li>
                            <ul>
                                <p>Refunds for subscription fees or payments may be issued at our discretion, and only under specific circumstances such as technical issues preventing access to premium features.</p>
                            </ul>
                        </ul>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>9. Third-Party Services and Links</h2>
                        <p>The Service may include links to third-party websites, applications, or services (“Third-Party Services”). Activatree does not endorse, control, or assume any responsibility for the content, functionality, or practices of these Third-Party Services. You acknowledge and agree that your use of Third-Party Services is subject to their own terms and conditions.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>10. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, Activatree and its affiliates, directors, employees, agents, subsidiaries, hierarchies, and partners shall not be liable for:</p>
                        <ul>
                            <li><img src="assets/images/img/point.png" alt="Point" />Any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Any interruption or cessation of transmission to or from the Service.</li>
                        </ul>
                        <p>In no event shall Activatree total liability exceed the amount you have paid to Activatree in the past 12 months, if any.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>11. Indemnification</h2>
                        <p>You agree to indemnify, defend, and hold harmless Activatree and its affiliates from and against any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way connected with:</p>

                        <li><img src="assets/images/img/point.png" alt="Point" />Your use of the Service.</li>
                        <li><img src="assets/images/img/point.png" alt="Point" />Your violation of these Terms or applicable law.</li>
                        <li><img src="assets/images/img/point.png" alt="Point" />Your User Content.</li>

                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>12. Termination</h2>
                        <p>We may terminate or suspend your account and access to the Service at any time, with or without notice, if you breach these Terms or for any other reason. Upon termination, you will cease all use of the Service and may lose access to your account, including any User Content or data stored on the platform.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>13. Modifications to the Terms</h2>
                        <p>We reserve the right to modify these Terms at any time. Any changes will be posted on our website or communicated via email. Continued use of the Service after any such changes constitutes acceptance of the new Terms.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>14. Governing Law and Jurisdiction</h2>
                        <p>These Terms are governed by and construed in accordance with the laws of the State of Wyoming, United States. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts located in the State of Wyoming, United States.</p>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>15. Miscellaneous</h2>
                        <ul>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Entire Agreement:</span> These Terms, along with the Privacy Policy and any other legal notices or agreements published by Activatree, constitute the entire agreement between you and Activatree.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Severability:</span>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span>Waiver:</span>No waiver of any term or condition shall be deemed a further or continuing waiver of such term or any other term.</li>
                        </ul>
                    </div>

                    <div className="acceptance-terms mb-3">
                        <h2>16. Contact Us</h2>
                        <p>For any questions or concerns regarding these Terms, please contact us at:  <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</a>.</p>
                    </div>

                    <div><p>==== END  ====</p></div>
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
    );
}

export default Termsofservice;