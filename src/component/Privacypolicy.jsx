import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Privacypolicy = () => {
    React.useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/privacypolicy.css";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);
    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="title-privacy-policy">
                        <p>Home</p><img src="assets/images/img/titlearrow.png" alt="Title Arrow" /><p>Privacy Pollicy</p>
                    </div>
                    <div className="privacy-summury">
                        <h1>Privacy Policy</h1>
                        <img src="assets/images/img/aboutline.png" alt=" About Line" />
                    </div>
                    <div className="activatree-details mb-5">
                        <p><span>Effective Date:</span> Monday, Oct 28, 2024</p>
                        <p><span>Last Updated:  </span>Saturday, Nov 16, 2024</p>
                        <p><span>Company: </span>Activatree, a Subsidiary of Infinatree, Inc.</p>
                        <p><span>Contact Email:</span> <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</a></p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Introduction</h2>
                        <p>This Privacy Policy outlines Activatree <b>(“ we ”, “us”, “ our ”, or “ the Company ”)</b> practices with respect to information collected from users who access our website at <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>www.activatree.com</a> <b>(“ Site ”)</b>, or otherwise share personal information with us (collectively: <b> " Users "</b>).</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Grounds for data collection </h2>
                        <p>Processing of your personal information (meaning, any information which may potentially allow your identification with reasonable means; hereinafter <b>“ Personal Information ”</b>) is necessary for the performance of our contractual obligations towards you and providing you with our services, to protect our legitimate interests and for compliance with legal and financial regulatory obligations to which we are subject.</p>
                        <ul className='mt-3'>
                            <li><p>When you use the Site, you consent to the collection, storage, use, disclosure and other uses of your Personal Information as described in this Privacy Policy.</p></li>
                            <li><p>We encourage our Users to carefully read the Privacy Policy and use it to make informed decisions.</p></li>
                        </ul>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>What information we collect?</h2>
                        <p>We collect two types of data and information from Users.</p>
                        <p>The first type of information is un-identified and non-identifiable information pertaining to a User(s), which may be made available or gathered via your use of the Site <b>(“ Nonpersonal Information ”).</b> We are not aware of the identity of a User from which the Non-personal Information was collected. Non-personal Information which is being collected may include your aggregated usage information and technical information transmitted by your device, including certain software and hardware information (e.g. the type of browser and operating system your device uses, language preference, access time, etc.) in order to enhance the functionality of our Site. We may also collect information on your activity on the Site (e.g. pages viewed, online browsing, clicks, actions, etc.).</p>
                        <ul className='mt-3'>
                            <p>The second type of information <b>Personal Information</b> which is individually identifiable information, namely information that identifies an individual or may with reasonable effort identify an individual. Such information includes:</p>
                            <ul className='mt-3'>
                                <li><img src="assets/images/img/point.png" alt=" Ponit" />Device Information: We collect Personal Information from your device. Such information includes geolocation data, IP address, unique identifiers (e.g. MAC address and UUID) and other information which relates to your activity through the Site.</li>
                                <li><img src="assets/images/img/point.png" alt=" Ponit" />This includes information such as your name, address, phone number, personal email address, location and personal social media address.</li>
                                <li><img src="assets/images/img/point.png" alt=" Ponit" />Registration information: When you register to our Site you will be asked to provide us certain details such as: full name; e-mail or physical address, and other information.</li>
                            </ul>
                        </ul>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>How We Receive Information About You</h2>
                        <p>We receive your Personal Information from various sources:</p>
                        <ul className='mt-3'>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />When you voluntarily provide us your personal details in order to register on our Site</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />When you use or access our Site in connection with your use of our services</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />From third party providers, services and public registers (for example, traffic analytics vendors).</li>
                        </ul>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>How We Use User Data</h2>
                        <p>We do not rent, sell, or share Users’ information with third parties except as described in this Privacy Policy.</p>
                        <p>We may use the information for the following:</p>
                        <ul className='mt-3'>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Communicating with you – sending you notices regarding our services, providing you with technical information and responding to any customer service issue you may have</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />To communicate with you and to keep you informed of our latest updates and services</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />To serve you advertisements when you use our Site (see more under "Advertisements")</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />To market our websites and products (see more under "Marketing")</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Conducting statistical and analytical purposes, intended to improve the Site.</li>
                        </ul>
                        <p>In addition to the different uses listed above, we may transfer or disclose Personal Information to our parent company, subsidiaries, affiliated companies, and subcontractors.</p>
                        <p>In addition to the purposes listed in this Privacy Policy, we may share Personal Information with our trusted third-party providers, who may be located in different jurisdictions across the world, for any of the following purposes:</p>
                        <ul className='mt-3'>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Hosting and operating our Site</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Providing you with our services, including providing a personalized display of our Site</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Storing and processing such information on our behalf</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Serving you with advertisements and assist us in evaluating the success of our advertising campaigns and help us retarget any of our users</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Providing you with marketing offers and promotional materials related to our Site and services;</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Performing research, technical diagnostics or analytics</li>
                        </ul>
                        <p>We may also disclose information if we have good faith to believe that disclosure of such information is helpful or reasonably necessary to:
                            <ul>
                                <li>(i) comply with any applicable law, regulation, legal process or governmental request; </li>
                                <li>(ii) enforce our policies (including our Agreement), including investigations of potential violations thereof; </li>
                                <li>(iii) investigate, detect, prevent, or take action regarding illegal activities or other wrongdoing, suspected fraud or security issues; </li>
                                <li>(iv) to establish or exercise our rights to defend against legal claims; </li>
                                <li>(v) prevent harm to the rights, property or safety of us, our users, yourself or any third party; or </li>
                                <li>(vi) for the purpose of collaborating with law enforcement agencies and/or in case we find it necessary in order to enforce intellectual property or other legal rights.</li>
                            </ul>
                        </p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>User Rights</h2>
                        <p>You may request to: </p>
                        <ul className='mt-3'>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Receive confirmation as to whether or not personal information concerning you is being processed, and access your stored personal information, together with supplementary information.</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Receive a copy of personal information you directly volunteer to us in a structured, commonly used and machine-readable format.</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Request rectification of your personal information that is in our control.</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Request erasure of your personal information.</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Object to the processing of personal information by us.</li>
                            <li><img src="assets/images/img/point.png" alt=" Ponit" />Request to restrict processing of your personal information by us.</li>
                            <li><img src="assets/images/img/point.png" alt="Ponit" />Lodge a complaint with a supervisory authority.</li>
                        </ul>
                        <p>However, please note that these rights are not absolute, and may be subject to our own legitimate interests and regulatory requirements. If you wish to exercise any of the aforementioned rights, or receive more information, please contact our Data Protection Officer (“DPO”) using the details provided below: <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>info@activatree.com</a>.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Retention</h2>
                        <p>We will retain your personal information for as long as necessary to provide our services, and as necessary to comply with our legal obligations, resolve disputes, and enforce our policies. Retention periods will be determined taking into account the type of information that is collected and the purpose for which it is collected, bearing in mind the requirements applicable to the situation and the need to destroy outdated, unused information at the earliest reasonable time. Under applicable regulations, we will keep records containing client personal data, account opening documents, communications and anything else as required by applicable laws and regulations.</p>
                        <p>We may rectify, replenish or remove incomplete or inaccurate information, at any time and at our own discretion.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Cookies</h2>
                        <p>We and our trusted partners use cookies and other technologies in our related services, including when you visit our Site or access our services.</p>
                        <p>A “cookie” is a small piece of information that a website assign to your device while you are viewing a website. Cookies are very helpful and can be used for various different purposes. These purposes include allowing you to navigate between pages efficiently, enable automatic activation of certain features, remembering your preferences and making the interaction between you and our Services quicker and easier. Cookies are also used to help ensure that the advertisements you see are relevant to you and your interests and to compile statistical data on your use of our Services.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>The Site Uses the Following Types of Cookies</h2>
                        <ul className='mt-3'>
                            <li><img src="assets/images/img/point.png" alt="Ponit" /><span style={{ fontWeight: 'bold' }}>'session cookies'</span>which are stored only temporarily during a browsing session in order to allow normal use of the system and are deleted from your device when the browser is closed;</li>
                            <li><img src="assets/images/img/point.png" alt="Ponit" /><span style={{ fontWeight: 'bold' }}>'persistent cookies'</span> which are read only by the Site, saved on your computer for a fixed period and are not deleted when the browser is closed. Such cookies are used where we need to know who you are for repeat visits, for example to allow us to store your preferences for the next sign-in;</li>
                            <li><img src="assets/images/img/point.png" alt="Ponit" /><span style={{ fontWeight: 'bold' }}>'third party cookies'</span> which are set by other online services who run content on the page you are viewing, for example by third party analytics companies who monitor and analyze our web access.</li>
                        </ul>
                        <p>Cookies do not contain any information that personally identifies you, but Personal Information that we store about you may be linked, by us, to the information stored in and obtained from cookies. You may remove the cookies by following the instructions of your device preferences; however, if you choose to disable cookies, some features of our Site may not operate properly and your online experience may be limited.</p>
                        <p>We also use a tool called “Google Analytics” to collect information about your use of the Site. Google Analytics collects information such as how often users access the Site, what pages they visit when they do so, etc. We use the information we get from Google Analytics only to improve our Site and services. Google Analytics collects the IP address assigned to you on the date you visit sites, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Google’s ability to use and share information collected by Google Analytics about your visits to this Site is restricted by the Google Analytics <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>Terms of Use</a> and the <a href="" style={{ color: "#9A00A9", textDecoration: "none" }}>Google Privacy Policy</a>.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Third party collection of information</h2>
                        <p>Our policy only addresses the use and disclosure of information we collect from you. To the extent you disclose your information to other parties or sites throughout the internet, different rules may apply to their use or disclosure of the information you disclose to them. Accordingly, we encourage you to read the terms and conditions and privacy policy of each third party that you choose to disclose information to.</p>
                        <p>This Privacy Policy does not apply to the practices of companies that we do not own or control, or to individuals whom we do not employ or manage, including any of the third parties which we may disclose information as set forth in this Privacy Policy.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>How We Safeguard Your Information</h2>
                        <p>We take great care in implementing and maintaining the security of the Site and your information. We employ industry standard procedures and policies to ensure the safety of the information we collect and retain, prevent unauthorized use of any such information, and we require any third party to comply with similar security requirements in accordance with this Privacy Policy. Although we take reasonable steps to safeguard information, we cannot be responsible for the acts of those who gain unauthorized access or abuse our Site, and we make no warranty, express, implied or otherwise, that we will prevent such access.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Transfer of data outside the EEA</h2>
                        <p>Please note that some data recipients may be located outside the EEA. In such cases we will transfer your data only to such countries as approved by the European Commission as providing adequate level of data protection, or enter into legal agreements ensuring an adequate level of data protection.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Advertisements</h2>
                        <p>Activatree prioritizes the safety, privacy, and positive experience of all our users, especially minors. Our platform is designed to foster meaningful connections while maintaining a secure environment. The following policy outlines our approach to minor accounts:</p>
                        <ul>
                            <h2 className='mt-2'>1. Minimum Age Requirement</h2>
                            <ul>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Users must be <span style={{ fontWeight: 'bold' }}>at least 13 years old</span> to create an account on Activatree.</li>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Activatree reserves the right to disable accounts or take necessary actions if users are found to be under the minimum age requirement.</li>
                            </ul>
                            <h2 className='mt-2'>2. Content Restrictions for Minors</h2>
                            <ul>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Accounts of users under 18 are <span style={{ fontWeight: 'bold' }}>defualted to privacy-first settings</span>to restrict potentially inappropriate interactions.</li>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Certain types of content, including but not limited to explicit, violent, or sensitive material, are automatically restricted from being shown to users under 18.</li>
                            </ul>
                            <h2 className='mt-2'>3. Privacy Protection for Minors</h2>
                            <ul>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Activatree adheres to the highest standards of privacy for minors, in accordance with COPPA, GDPR, and other relevant privacy regulations.</li>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Personal information of users under 18 will not be displayed publicly, and all accounts for users under 16 are <span style={{ fontWeight: 'bold' }}>private by default.</span></li>
                                <li><img src="assets/images/img/point.png" alt="Ponit" />Activatree does not knowingly collect, use, or disclose personal data of minors without obtaining proper consent where required by law.</li>
                            </ul>
                            <h2 className='mt-2'>4. Reporting and Support</h2>
                            <ul>
                                <li><img src="assets/images/img/point.png" alt="Ponit" /><span style={{ fontWeight: 'bold' }}>Content Reporting:</span> Users can easily report inappropriate content or interactions. Our moderation team is available to investigate and address any concerns.</li>
                                <li><img src="assets/images/img/point.png" alt="Ponit" /><span style={{ fontWeight: 'bold' }}>Support for Minors:</span> A dedicated support team is available to minors to address any security or privacy concerns regarding account usage, features, or interactions.</li>
                            </ul>
                        </ul>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Marketing</h2>
                        <p>We may use your Personal Information, such as your name, email address, telephone number, etc. ourselves or by using our third party subcontractors for the purpose of providing you with promotional materials, concerning our services, which we believe may interest you.</p>
                        <p>Out of respect to your right to privacy we provide you within such marketing materials with means to decline receiving further marketing offers from us. If you unsubscribe we will remove your email address or telephone number from our marketing distribution lists.</p>
                        <p>Please note that even if you have unsubscribed from receiving marketing emails from us, we may send you other types of important e-mail communications without offering you the opportunity to opt out of receiving them. These may include customer service announcements or administrative notices.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Corporate transaction</h2>
                        <p>We may share information in the event of a corporate transaction (e.g. sale of a substantial part of our business, merger, consolidation or asset sale). In the event of the above, the transferee or acquiring company will assume the rights and obligations as described in this Privacy Policy.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Minors</h2>
                        <p>We understand the importance of protecting children’s privacy, especially in an online environment. The Site is not designed for or directed at children. Under no circumstances shall we allow use of our services by minors without prior consent or authorization by a parent or legal guardian. We do not knowingly collect Personal Information from minors. If a parent or guardian becomes aware that his or her child has provided us with Personal Information without their consent, he or she should contact us at <a href="">info@activatree.com</a>.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>Updates or Amendments to This Privacy Policy</h2>
                        <p>We reserve the right to periodically amend or revise the Privacy Policy; material changes will be effective immediately upon the display of the revised Privacy policy. The last revision will be reflected in the "Last modified" section. Your continued use of the Platform, following the notification of such amendments on our website, constitutes your acknowledgment and consent of such amendments to the Privacy Policy and your agreement to be bound by the terms of such amendments.</p>
                    </div>
                    <div className="welcome-activatree mb-3">
                        <h2>How to contact us</h2>
                        <p>If you have any general questions about the Site or the information we collect about you and how we use it, you can contact us at <a href="">info@activatree.com</a>.</p>
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
export default Privacypolicy;