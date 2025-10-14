import React from "react";
import { Link } from 'react-router-dom';
//import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
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
                    <div className="title-terms mt-5">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt="Title Arrow" /><p>Terms Of Service Agreement</p>
                    </div>
                    <div className="terms-summury mt-5">
                        <h3>Terms of Service Agreement</h3>
                        <img src="assets/images/img/aboutline.png" alt="About Line" />
                    </div>
                    <div className="activatree-details mb-5">
                        <p className="mt-2"><span>Effective Date:</span> Monday, Oct 28, 2024</p>
                        <p className="mt-2"><span>Last Updated:  </span>Saturday, Nov 16, 2024</p>
                        <p className="mt-2"><span>Company: </span>Activatree, a Subsidiary of Infinatree, Inc.</p>
                        <p className="mt-2"><span>Contact Email:</span> <Link href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</Link></p>
                    </div>
                    <div className="welcome-activatree mb-5 mt-5">
                        <p>Welcome to Activatree <b>(“ we ”, “us”, “ our ”, or “ the Company ”).</b> These Terms of Service (“Terms”) govern your access to and use of our platform, websites, applications, and services (collectively, the “Service”). By accessing or using the Service, you agree to these Terms. If you do not agree, you may not use the Service. Please read them carefully.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>1. Acceptance of Terms</h5>
                        <p className="mt-5 m-5">By creating an account, accessing, or using the Service, you agree to be legally bound by these Terms. If you disagree with any part of these Terms, please refrain from using the Service. You acknowledge that these Terms are a legally binding contract between you and Activatree.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>2. Description of the Service</h5>
                        <p className="mt-5 m-5">Activatree is a multi-functional social media and professional networking platform that incorporates features akin to LinkedIn, Upwork, Facebook, Instagram, Threads, TikTok, YouTube, Rumble, Gettr, X (formerly Twitter), SnapChat, Pinterest, Reddit, Discord, BeReal, TruthSocial, HootSuite, Buffer, Sprout Social, Loomly, SocialBee, Crowdfire, SocialPilot, Allin-One Social, and Spotify among others. Our platform allows users to:</p>
                        <ul className="m-5">
                            <li><img src="assets/images/img/point.png" alt="Point" />Create personal and professional profiles.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Share multimedia content such as photos, videos, music, and blog posts.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Collaborate with other users on creative projects.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Discover job opportunities and freelance work. I'm sorry, but it seems that there is no text provided for me to edit. Please provide the text you would like me to work on.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Engage with various communities, live-stream events, and more.</li>
                        </ul>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>3. Eligibility to Use the Service</h5>
                        <p className="mt-5 m-5">To use the Service, you must:</p>
                        <ul className="m-5">
                            <li><img src="assets/images/img/point.png" alt="Point" />Be at least 12 years of age or the age required by local law to form a binding contract.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Have the power to enter into a legally binding agreement with us and are not barred from using the Service under applicable laws.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Provide accurate, current, and complete information during the registration process and update such information to keep it accurate and complete.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Discover job opportunities and freelance work.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Comply with all applicable laws, including those related to data privacy, intellectual property, and export control.</li>
                        </ul>
                        <p className="mt-5">If you are using the Service on behalf of a company, organization, or another legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>4. User Accounts and Responsibilities</h5>
                        <ul className="m-5">
                            <li style={{ fontWeight: '600' }}>4.1 Account Suspension and Termination</li>
                            <ul className="m-5">
                                <p className="mt-5">We reserve the right to suspend or terminate your account at any time, for any reason, including if you violate these Terms of Service or our Privacy Policy. You may also terminate your account by contacting us or through the Service. Upon termination, you will no longer have access to the Service or your account, and any content you have stored on the Service may be deleted.</p>
                            </ul>
                        </ul>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>5. User Conduct</h5>
                        <ul className="m-6">
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-2">Abuse:</span> You may not harass, abuse, threaten, or otherwise violate the legal rights of others.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-2">Infringement:</span> You may not post or share content that infringes on the intellectual property or privacy rights of others.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-2">Misrepresentation:</span> You may not impersonate another person, misrepresent your identity, or falsely associate with any entity.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-2">Malicious Activity:</span> You may not upload viruses, malware, or engage in activities that compromise the security or functionality of the Service.</li>
                        </ul>
                        <p>Activatree reserves the right to take appropriate legal action against users who violate these Terms, including terminating their accounts.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>6. Content on the Service</h5>
                        <ul className="m-6">
                            <li style={{ fontWeight: '600' }}>6.1 User-Generated Content</li>
                            <ul className="m-5">
                                <p className="mt-5">You retain ownership of any content you create and post on the Service, including but not limited to text, images, audio, video, and other materials (“User Content”). By submitting, posting, or displaying User Content on or through the Service, you grant Activatree a worldwide, non-exclusive, royaltyfree, transferable license to use, reproduce, distribute, and display such content in connection with operating and providing the Service.</p>
                                <p className="mt-5">You represent and warrant that:</p>
                                <ul>
                                    <li><img src="assets/images/img/point.png" alt="Ponit" />You own or have the necessary rights to use and grant the license for the User Content.</li>
                                    <li><img src="assets/images/img/point.png" alt="Ponit" />Your User Content and your use of the Service do not violate any applicable laws, regulations, or third-party rights.</li>
                                </ul>
                                <p>If you believe your account has been compromised, you must notify us immediately at <Link href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</Link>.</p>
                            </ul>
                            <li style={{ fontWeight: '600' }}>6.2 Activatree Intellectual Property</li>
                            <ul className="m-5">
                                <p>All materials and content provided by Activatree, including text, software, scripts, graphics, photos, sounds, music, videos, interactive features, trademarks, service marks, and logos are owned by or licensed to Activatree and are protected by copyright, trademark, and other intellectual property laws. You may not use or reproduce any part of the Service or its contents without express written consent from Activatree.</p>
                            </ul>
                        </ul>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>7. Privacy and Data Collection</h5>
                        <p className="mt-5">Your privacy is important to us. We collect, use, and disclose your personal information in accordance with our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our collection, use, and sharing of your data as outlined in the Privacy Policy.</p>
                        <p className="mt-5">At Activatree, we take the privacy and protection of user data very seriously, especially when it comes to the personal information of minors. We want to make it clear that our platform is not designed to collect, sell, or misuse user data in any way that violates legal or ethical standards. Our commitment to user privacy is paramount, and while we acknowledge that certain data collection is essential for the proper functioning of the platform, we strive to limit the amount of data collected to the minimum necessary to provide our services.</p>
                        <p className="mt-5">For users who are minors, we implement strict protocols in compliance with data protection regulations, such as the <b>Children's Online Privacy Protection Act (COPPA)</b> in the United States and <b>General Data Protection Regulation (GDPR)</b> in Europe, ensuring that personal data is handled with the highest degree of care and security. We do not sell or share the personal information of minors to third parties for marketing or any illegal purposes.</p>
                        <p className="mt-5">Although we operate in an industry where some level of data collection is unavoidable, we emphasize that our primary goal is to create a safe, productive, and positive environment for all users, especially younger audiences. We believe in safeguarding user privacy, and in any situation where more restrictive data collection could be beneficial for our users' protection, we are committed to implementing such practices to the best of our ability within the confines of legal and technical limitations.</p>
                        <p className="mt-5">In summary, we are committed to protecting your data and using it responsibly. We will never misuse your personal information, and data collected from minors is subject to the strictest standards of security and privacy.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>8. Payment and Subscription Services</h5>
                        <p className="mt-5">Certain features of the Service may require a paid subscription or one-time payment. By choosing to access such features, you agree to pay all applicable fees and charges. We reserve the right to modify pricing at any time. Subscription fees will be charged based on the billing cycle you choose (monthly, yearly, etc.)</p>
                        <ul className="m-5">
                            <li><b>8.1 Refund Policy</b></li>
                            <ul>
                                <p className="mt-5">Refunds for subscription fees or payments may be issued at our discretion, and only under specific circumstances such as technical issues preventing access to premium features.</p>
                            </ul>
                        </ul>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>9. Third-Party Services and Links</h5>
                        <p className="mt-5">The Service may include links to third-party websites, applications, or services (“Third-Party Services”). Activatree does not endorse, control, or assume any responsibility for the content, functionality, or practices of these Third-Party Services. You acknowledge and agree that your use of Third-Party Services is subject to their own terms and conditions.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h2>10. Limitation of Liability</h2>
                        <p className="mt-5">To the fullest extent permitted by law, Activatree and its affiliates, directors, employees, agents, subsidiaries, hierarchies, and partners shall not be liable for:</p>
                        <ul className="m-6">
                            <li ><img src="assets/images/img/point.png" alt="Point" />Any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" />Any interruption or cessation of transmission to or from the Service.</li>
                        </ul>
                        <p className="mt-5">In no event shall Activatree total liability exceed the amount you have paid to Activatree in the past 12 months, if any.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>11. Indemnification</h5>
                        <p className="mt-5">You agree to indemnify, defend, and hold harmless Activatree and its affiliates from and against any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way connected with:</p>
                        <li className="m-6"><img src="assets/images/img/point.png" alt="Point" />Your use of the Service.</li>
                        <li className="m-6"><img src="assets/images/img/point.png" alt="Point" />Your violation of these Terms or applicable law.</li>
                        <li className="m-6"><img src="assets/images/img/point.png" alt="Point" />Your User Content.</li>
                    </div>
                    <div className="acceptance-terms mb-3 mt-5">
                        <h5>12. Termination</h5>
                        <p className="mt-5">We may terminate or suspend your account and access to the Service at any time, with or without notice, if you breach these Terms or for any other reason. Upon termination, you will cease all use of the Service and may lose access to your account, including any User Content or data stored on the platform.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>13. Modifications to the Terms</h5>
                        <p className="mt-5">We reserve the right to modify these Terms at any time. Any changes will be posted on our website or communicated via email. Continued use of the Service after any such changes constitutes acceptance of the new Terms.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>14. Governing Law and Jurisdiction</h5>
                        <p className="mt-5">These Terms are governed by and construed in accordance with the laws of the State of Wyoming, United States. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts located in the State of Wyoming, United States.</p>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>15. Miscellaneous</h5>
                        <ul className="m-6">
                            <li ><img src="assets/images/img/point.png" alt="Point" /><span className="mt-5">Entire Agreement:</span> These Terms, along with the Privacy Policy and any other legal notices or agreements published by Activatree, constitute the entire agreement between you and Activatree.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-5">Severability:</span>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</li>
                            <li><img src="assets/images/img/point.png" alt="Point" /><span className="mt-5">Waiver:</span>No waiver of any term or condition shall be deemed a further or continuing waiver of such term or any other term.</li>
                        </ul>
                    </div>
                    <div className="acceptance-terms mb-5 mt-5">
                        <h5>16. Contact Us</h5>
                        <p className="mt-5">For any questions or concerns regarding these Terms, please contact us at:  <Link href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</Link>.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Termsofservice;