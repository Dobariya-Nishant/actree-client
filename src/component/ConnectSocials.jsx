import React, { useState, useEffect } from 'react';
import { useSignUpContext } from "../context/SignUpContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Box, Typography, List, ListItem, TextField, IconButton, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//import API_ENDPOINTS from "../api/apiConfig";
//import { networkRequest } from "../utils/networkRequest";

const ConnectSocials = () => {
    const navigate = useNavigate();
    const { signUpData, updateSignUpData } = useSignUpContext();
    //const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(true);
    const [socialLinks, setSocialLinks] = useState([]);
    //const { updateSignUpData } = useSignUpContext();

    const socials = [
        { name: "Website Link", icon: "assets/images/sociallink/website.png" },
        { name: "WhatsApp API", icon: "assets/images/sociallink/whatsapp.png" },
        { name: "Facebook", icon: "assets/images/sociallink/facebook.png" },
        { name: "Google", icon: "assets/images/sociallink/google.png" },
        { name: "Instagram", icon: "assets/images/sociallink/instagram.png" },
        { name: "X", icon: "assets/images/sociallink/x.png" },
        { name: "LinkedIn", icon: "assets/images/sociallink/linkedin.png" },
        { name: "TikTok", icon: "assets/images/sociallink/tiktok.png" },
        { name: "Snapchat", icon: "assets/images/sociallink/snapchat.png" },
        { name: "YouTube", icon: "assets/images/sociallink/youtube.png" },
        { name: "Threads", icon: "assets/images/sociallink/threads.png" },
        { name: "Rumble", icon: "assets/images/sociallink/rumble.png" },
        { name: "Parler", icon: "assets/images/sociallink/parler.png" },
        { name: "Reddit", icon: "assets/images/sociallink/reddit.png" },
        { name: "Discord", icon: "assets/images/sociallink/discord.png" },
        { name: "Truth Social", icon: "assets/images/sociallink/truthsocial.png" },
        { name: "Gettr", icon: "assets/images/sociallink/Gettr.png" },
        { name: "Mastodon", icon: "assets/images/sociallink/Mastodon.png" },
        { name: "BeReal", icon: "assets/images/sociallink/BeReal.png" },
        { name: "Telegram", icon: "assets/images/sociallink/telegram.png" },
        { name: "Pinterest", icon: "assets/images/sociallink/pinterest.png" },
    ];

    useEffect(() => {
        //console.log("SignUp Data:", signUpData);
        //const user = JSON.parse(localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user")) || {};
        if (user.socialLinks) {
            setSocialLinks(user.socialLinks);
        } else {
            setSocialLinks([]);
        }
    }, [signUpData]);

    const handleLinkChange = (socialName, value) => {
        const updatedLink = socials.find(social => social.name === socialName);
        const newLink = {
            logoName: updatedLink?.name || "",
            url: value,
        };
        setSocialLinks((prev) => {
            const existingLinkIndex = prev.findIndex(link => link.logoName === newLink.logoName);
            if (existingLinkIndex >= 0) {
                const updatedLinks = [...prev];
                updatedLinks[existingLinkIndex] = newLink;
                return updatedLinks;
            } else {
                return [...prev, newLink];
            }
        });
        setFormData((prevData) => ({
            ...prevData,
            socialLinks: [...socialLinks, newLink],
        }));
    };

    const handleDeleteLink = (socialName) => {
        setSocialLinks((prev) => prev.filter(link => link.logoName !== socialName));
    };



    const handleContinue = () => {
        const filteredSocialLinks = socialLinks.map(({ logoName, url }) => ({
            logoName,
            url,
        }));

        Object.keys(formData).forEach((key) => {
            updateSignUpData(key, formData[key]);
        });
        //updateSignUpData('socialLinks', JSON.stringify(socialLinks));
        updateSignUpData('socialLinks', JSON.stringify(filteredSocialLinks));
        setShowForm(false);
        navigate("/interestSignup");
    };

    return (
        <>
            <Box sx={{ py: 1, px: 10, }}>
                <img
                    src="assets/images/navbar/activatreelogo.png"
                    alt="Tree Design"
                    style={{ height: "50px", width: "auto", marginLeft: "12%" }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
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
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Connect your Socials
                    </Typography>
                    <Typography sx={{ mb: 4, color: "gray" }}>
                        Before you get Started, Connect your Socials accounts.
                    </Typography>
                    <List sx={{
                        width: "100%",
                        maxWidth: "600px",
                        mb: 1,
                        maxHeight: "600px",
                        overflowY: "auto",
                    }}>
                        {socials.map((social) => (
                            <ListItem
                                key={social.name}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: 1,
                                    padding: "5px",
                                    border: "1px solid #ddd",
                                    borderRadius: "25px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.name}
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <TextField
                                        label={`${social.name}`}
                                        //value={socialLinks[social.name]?.url || ''}
                                        //onChange={(e) => handleLinkChange(social.name, e.target.value)}
                                        value={socialLinks.find(link => link.logoName === social.name)?.url || ''}
                                        onChange={(e) => handleLinkChange(social.name, e.target.value)}
                                        fullWidth
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        sx={{
                                            fontSize: "1rem",
                                            input: { color: "#333" },
                                        }}
                                    />
                                </Box>
                                {/* {socialLinks[social.name]?.url && ( */}
                                {socialLinks.find(link => link.logoName === social.name)?.url && (
                                    <IconButton color="error" onClick={() => handleDeleteLink(social.name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Typography sx={{ mb: 2, color: "#9A00A9", marginLeft: "30%" }}
                        onClick={handleContinue}
                    >
                        Skip for Now
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleContinue}
                        sx={{
                            background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                            borderRadius: 10,
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
                    </Button>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account?
                        <Link to="/login" underline="none" sx={{ color: "purple" }}>
                            Login
                        </Link>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <img
                        src="assets/images/navbar/loginimg.png"
                        alt="Tree Design"
                        style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ConnectSocials;
