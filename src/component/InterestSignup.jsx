import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignUpContext } from "../context/SignUpContext";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, CircularProgress, TextField, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
    {
        title: "Sports",
        subtitle: "Recommend relevant content of sports.",
        image: "assets/images/icon/Sports.png",
        tags: [
            "Cricket",
            "Archery",
            "Basketball",
            "Football",
            "Fencing",
            "Table Tennis",
            "Hockey",
        ],
    },
    {
        title: "Entertainment",
        subtitle: "Recommend relevant content of entertainment.",
        image: "assets/images/icon/Entertainment.png",
        tags: ["Movie", "TV Show", "Music", "Book",
            "Literature",
            "Podcasts",
            "Audiobooks",
            "Celebrity News",
            "Pop Culture"],
    },
    {
        title: "Technology & Innovation",
        subtitle: "Recommend relevant content of technology & innovation.",
        image: "assets/images/icon/Technology.png",
        tags: ["Gadgets",
            "Devices",
            "Programming & Software Development",
            "AI & Machine Learning",
            "Blockchain & Cryptocurrency",
            "Startups & Entrepreneurship"],
    },
    {
        title: "Health & Wellness",
        subtitle: "Recommend relevant content of health & wellness:",
        image: "assets/images/icon/Health.png",
        tags: ["Mental Health",
            "Nutrition & Dieting",
            "Exercise & Fitness",
            "Alternative Medicine",
            "Holistic Health"],
    },
    {
        title: "Business & Finance",
        subtitle: "Recommend relevant content of business & finance.",
        image: "assets/images/icon/Business.png",
        tags: ["Investing",
            "Entrepreneurship",
            "Personal Finance",
            "Marketing"],
    },
    {
        title: "Education & Career Development",
        subtitle: "Recommend relevant content of education & career development.",
        image: "assets/images/icon/Education.png",
        tags: ["Skill Development",
            "Professional Networking",
            "Career Guidance & Job Search",
            "Online Courses & Certifications"],
    },
    {
        title: "Lifestyle & Fashion",
        subtitle: "Recommend relevant content of lifestyle & fashion.",
        image: "assets/images/icon/Lifestyle.png",
        tags: ["Fashion & Style",
            "Beauty & Skincare",
            "Home & Interior Design",
            "Sustainable Living & Minimalism"],
    },
    {
        title: "Food & Drink",
        subtitle: "Recommend relevant content of food & drink.",
        image: "assets/images/icon/Food.png",
        tags: ["Cooking & Recipes",
            "Dining Out & Restaurant Reviews",
            "Wine & Craft Beer",
            "Health & Diet Foods"],
    },
    {
        title: "Causes & Social Impact",
        subtitle: "Recommend relevant content of causes & social impact.",
        image: "assets/images/icon/Causes.png",
        tags: ["Environmental Sustainability",
            "Social Justice & Activism",
            "Charities & Non - Profit Initiatives",
            "Volunteering Opportunities"],
    },
    {
        title: "Family & Relationships",
        subtitle: "Recommend relevant content of family & relationships",
        image: "assets/images/icon/Family.png",
        tags: ["Parenting & Family Life",
            "Relationships & Dating Advice",
            "Mental Wellness & Relationships"],
    },
    {
        title: "NFTs & Digital Art",
        subtitle: "Recommend relevant content of NFTs & digital art.",
        image: "assets/images/icon/NFTs.png",
        tags: ["Gaming NFTs",
            "Music NFTs",
            "Collectibles",
            "Pixel Arts",
            "Fractal Arts"],
    },
    {
        title: "Virtual Reality & Augmented Reality",
        subtitle: "Recommend relevant content of virtual reality & augmented reality.",
        image: "assets/images/icon/Virtual.png",
        tags: ["Fully immersive virtual reality",
            "AR gaming",
            "Biomedical VR - AR"],
    },
    {
        title: "Photography & Videography",
        subtitle: "Recommend relevant content of photography & videography.",
        image: "assets/images/icon/Photography.png",
        tags: ["Abstract photography",
            "Aerial photography",
            "Architectural photography",
            "Aviation photography",
            "Event videography",
            "Brand documentaries",
            "Product videos",
            "Documentary films"],
    },
];

const InterestSignup = () => {
    const navigate = useNavigate();
    const { signUpData } = useSignUpContext();
    const [isLoading, setIsLoading] = useState(false);
    const [expanded, setExpanded] = useState("panel0");
    const [activeButtons, setActiveButtons] = useState({});
    const [showInput, setShowInput] = useState({});
    const [customTag, setCustomTag] = useState({});

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.interests) {
            const initialActiveButtons = {};
            user.interests.forEach((interestCategory, categoryIndex) => {
                const categoryTags = categories[categoryIndex]?.tags || [];

                const allTags = [...categoryTags];
                interestCategory.interests.forEach((interest) => {
                    if (!allTags.includes(interest)) {
                        allTags.push(interest);
                    }
                });

                const activeTags = interestCategory.interests
                    .map((interest) => allTags.indexOf(interest))
                    //.map((interest) => categoryTags.indexOf(interest))
                    .filter((index) => index !== -1);

                if (activeTags.length > 0) {
                    initialActiveButtons[categoryIndex] = activeTags;
                }
            });
            setActiveButtons(initialActiveButtons);
        }
    }, [categories]);

    const updatedCategories = categories.map((category, index) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userInterest = user?.interests?.[index];
        const dynamicTags = userInterest?.interests.filter(
            (interest) => !category.tags.includes(interest)
        ) || [];
        return {
            ...category,
            tags: [...category.tags, ...dynamicTags],
        };
    });

    const handleButtonClick = (categoryIndex, tagIndex) => {
        setActiveButtons((prevState) => {
            const newState = { ...prevState };
            if (newState[categoryIndex]?.includes(tagIndex)) {
                newState[categoryIndex] = newState[categoryIndex].filter((index) => index !== tagIndex);
            } else {
                if (!newState[categoryIndex]) {
                    newState[categoryIndex] = [];
                }
                newState[categoryIndex].push(tagIndex);
            }
            return newState;
        });
    };

    const handleCustomTagChange = (e, categoryIndex) => {
        setCustomTag((prevState) => ({
            ...prevState,
            [categoryIndex]: e.target.value,
        }));
    };

    const handleCustomTagKeyPress = (e, categoryIndex) => {
        if (e.key === "Enter" && customTag[categoryIndex]?.trim()) {
            const newTag = customTag[categoryIndex].trim();
            categories[categoryIndex].tags.push(newTag);
            setCustomTag((prevState) => ({ ...prevState, [categoryIndex]: "" }));
            setShowInput((prevState) => ({ ...prevState, [categoryIndex]: false }));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const selectedInterests = categories.map((category, categoryIndex) => {
                const categoryTags = category.tags;
                const selectedTags = activeButtons[categoryIndex]?.map((tagIndex) => categoryTags[tagIndex]) || [];
                if (customTag[categoryIndex]) {
                    selectedTags.push(customTag[categoryIndex]);
                }
                const filteredTags = selectedTags.filter((tag) => tag && tag.trim());
                return {
                    category: category.title,
                    //interests: selectedTags,
                    interests: filteredTags,
                };
            }).filter((item) => item.interests.length > 0);

            const payload = {
                ...signUpData,
                interests: JSON.stringify(selectedInterests),
            };

            // if (signUpData.type === 'individual') {
            //     payload.gender = signUpData.gender;
            // }

            const user = JSON.parse(localStorage.getItem("user"));
            const finalData = {};
            if (user && user._id) {
                payload["userId"] = user._id;
                console.log("payload", payload);
                Object.keys(payload).forEach((key) => {
                    if (!payload[key]) return
                    finalData[`${key}`] = payload[key];
                });
                const response = await networkRequest("PATCH", API_ENDPOINTS.UPDATE_USER, finalData);
                if (response.statusCode === 201) {
                    const updatedUser = response.data;
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    toast.success("Profile Updated Successfully!")
                    navigate("/profile");
                } else {
                    console.error("Signup failed:", response);
                    alert(response.message || "Signup failed. Please try again.");
                }
            } else {
                Object.keys(payload).forEach((key) => {
                    if (!payload[key]) return
                    finalData[`${key}`] = payload[key];
                });
                console.log("payload", finalData);
                const response = await networkRequest("post", API_ENDPOINTS.SIGNUP, finalData);
                if (response.statusCode === 201) {
                    const newUser = response.data;
                    localStorage.setItem("user", JSON.stringify(newUser));
                    toast.success("Signup Successfully!")
                    navigate("/login");
                } else {
                    console.error("Signup failed:", response);
                    alert(response.message || "Signup failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
            alert("An error occurred during signup. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // const commonStyles = {
    //     '& .MuiChip-label': {
    //         fontSize: '12px !important',
    //     },
    // };

    return (
        <Box
            sx={{
                px: 4,
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box sx={{ py: 2, px: 10, }} >
                <img

                    src="assets/images/navbar/activatreelogo.png"
                    alt="Activatree Logo"
                    style={{ height: "50%", width: "40%", marginLeft: "30%" }}
                />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                Tell us What you’re interested in
            </Typography>
            <Typography sx={{ mb: 4, color: "gray" }}>
                This platform helps to recommend relevant content based on your interests.
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1460px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    //overflow: "hidden",
                    overflowY: "auto",
                    maxHeight: "600px",
                }}
            >
                {updatedCategories.map((category, categoryIndex) => ( //categories
                    <Accordion key={categoryIndex}
                        expanded={expanded === `panel${categoryIndex}`}
                        onChange={handleAccordionChange(`panel${categoryIndex}`)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <img
                                    src={category.image}
                                    alt={`${category.title} Icon`}
                                    style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                                />
                                <Box>
                                    <Typography sx={{ fontWeight: "bold" }}>{category.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {category.subtitle}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    padding: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    marginTop: "10px",
                                }}
                            >
                                {category.tags.map((tag, tagIndex) => (
                                    <Button
                                        key={tagIndex}
                                        variant="outlined"
                                        onClick={() => handleButtonClick(categoryIndex, tagIndex)}
                                        sx={{
                                            fontSize: "0.875rem",
                                            padding: "6px 12px",
                                            textTransform: "capitalize",
                                            borderRadius: "20px",
                                            color: activeButtons[categoryIndex]?.includes(tagIndex) ? "white" : "black",
                                            borderColor: activeButtons[categoryIndex]?.includes(tagIndex) ? "#ae40b9" : "black",
                                            //backgroundColor: activeButtons[categoryIndex]?.includes(tagIndex) ? "#ae40b9" : "transparent",
                                            background: activeButtons[categoryIndex]?.includes(tagIndex) ? "linear-gradient(to right, #9A00A9, #580097, #29008B)" : "transparent",
                                            "&:hover": {
                                                backgroundColor: activeButtons[categoryIndex]?.includes(tagIndex) ? "#ae40b9" : "gray",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        {tag}
                                    </Button>
                                ))}
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowInput((prevState) => ({ ...prevState, [categoryIndex]: !prevState[categoryIndex] }))}
                                    sx={{
                                        fontSize: "0.875rem",
                                        padding: "6px 12px",
                                        textTransform: "capitalize",
                                        borderRadius: "20px",
                                        color: "black",
                                        borderColor: "black",
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                            backgroundColor: "gray",
                                            color: "white",
                                        },
                                    }}
                                >
                                    Other
                                </Button>
                                {showInput[categoryIndex] && (
                                    <TextField
                                        variant="outlined"
                                        placeholder="Type your intrest"
                                        value={customTag[categoryIndex] || ""}
                                        onChange={(e) => handleCustomTagChange(e, categoryIndex)}
                                        onKeyPress={(e) => handleCustomTagKeyPress(e, categoryIndex)}
                                        sx={{
                                            borderRadius: "30px",
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "30px",
                                            },
                                            "& .MuiInputBase-input": {
                                                padding: "10px 20px",
                                                textAlign: "left",
                                                marginTop: "5px",
                                            },
                                        }}
                                    />
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                    borderRadius: "30px",
                    mt: 4,
                    width: "200px",
                }}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Done"}
            </Button>
        </Box>
    );
};

export default InterestSignup;
