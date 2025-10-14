import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";
//import { Box, Typography, Link } from "@mui/material";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import Footer from "./Footer";

function Groups() {
    const navigate = useNavigate();
    const location = useLocation();
    //const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    //const [activeItem, setActiveItem] = useState("");
    const [suggestList, setSuggestList] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

    const getAllSuggest = useCallback(async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_SUGGEST, {}, {});
            if (response.statusCode === 200) {
                const filteredSuggestions = (response.data || []).filter(
                    (suggestedUser) => suggestedUser._id !== user._id
                );
                //setSuggestList(response.data || []);
                setSuggestList(filteredSuggestions);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }, [user._id])

    const handleFollowToggle = async (userId) => {
        try {
            if (followedUsers.includes(userId)) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    console.log("Unfollowed successfully!");
                    setFollowedUsers((prevFollowedUsers) =>
                        prevFollowedUsers.filter((id) => id !== userId)
                    );
                } else {
                    console.error("Failed to unfollow");
                }
            } else {
                const response = await networkRequest("POST", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    console.log("Followed successfully!");
                    setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
                } else {
                    console.error("Failed to follow");
                }
            }
        } catch (error) {
            console.error("Error in follow/unfollow operation:", error);
        }
    };

    useEffect(() => {
        getAllSuggest();
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }
    }, [navigate, location.pathname, getAllSuggest]);

    // const handleItemClick = (item) => {
    //     setActiveItem(item);
    // };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <main className="main-content">
                <div className="container sidebar-toggler">
                    <div className="row">
                        <SocialSidebar />
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
                            <div className="filter-head d-center justify-content-between">
                                <div className="d-center">
                                    <button onClick={goBack} className="cmn-btn third gap-1 me-3" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>
                                        <img className="avatar-img max-un me-3" src="../assets/images/socialsidebar/arrow.png" alt="icon" style={{ marginLeft: "-5px" }} />
                                    </button>
                                    <h6>Groups</h6>
                                </div>
                            </div>
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                <div className="row cus-mar friend-request">
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <a href="group-details.html"><h6 className="">Science & Facts</h6></a>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <a href="group-details.html"><h6 className="">Science & Facts</h6></a>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <a href="group-details.html"><h6 className="">Science & Facts</h6></a>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-8">
                                        <div className="single-box p-1">
                                            <div className="avatar-box position-relative">
                                                <img className="avatar-img w-100" src="../assets/images/socialsidebar/groups.png" alt="avatar" />
                                            </div>
                                            <Link href="#"><h6 className="">Science & Facts</h6></Link>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/member.png" alt="avatar" />100 members</p>
                                            <p className=""><img className="avatar-img" src="../assets/images/socialsidebar/picture.png" alt="avatar" />10 posts</p>
                                            <div className="d-center btn-border pt-1">
                                                <button className="cmn-btn" style={{ borderRadius: "40px" }}>Join Group</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
                            <div className="cus-overflow cus-scrollbar sidebar-head">
                                <div className="d-flex justify-content-end">
                                    <div className="d-block d-xl-none me-4">
                                        <button className="button toggler-btn mb-4 mb-lg-0 d-flex align-items-center gap-2">
                                            <span>My List</span>
                                            <i className="material-symbols-outlined mat-icon"> tune </i>
                                        </button>
                                    </div>
                                </div>
                                <div className="cus-scrollbar side-wrapper">
                                    <div className="sidebar-wrapper d-flex flex-column gap-6">
                                        <div className="sidebar-area p-5">
                                            <div className=" mb-4">
                                                <h6 className="d-inline-flex position-relative">
                                                    Search
                                                </h6>
                                            </div>
                                            <div className="d-grid gap-6">
                                                <div className="single-single">
                                                    <div className="profile-pic d-flex gap-3">
                                                        <div className="avatar">
                                                            <img className="avatar-img max-un" src="assets/images/navbar/event-img-5.png" style={{ width: "250px", height: "200px" }} alt="avatar" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar-area p-5">
                                            <div className="mb-4">
                                                <h6 className="d-inline-flex">
                                                    Suggested for you
                                                </h6>
                                            </div>
                                            <div className="d-flex flex-column gap-6">
                                                {Array.isArray(suggestList) && suggestList.length > 0 ? (
                                                    suggestList.map((suggestedUser) => (
                                                        <div key={suggestedUser._id} className="profile-area d-center position-relative align-items-center justify-content-between">
                                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                                <div className="avatar-item">
                                                                    <img
                                                                        className="avatar-img max-un"
                                                                        src={suggestedUser.profilePicture || "../assets/images/avatar-14.png"}
                                                                        alt="avatar"
                                                                        style={{ borderRadius: "50px", width: "40px" }}
                                                                    />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h6 className="m-0">
                                                                        <Link to={suggestedUser?._id === user?._id ? "/profile" : `/accountProfile/${suggestedUser?.userName}`}>
                                                                            {suggestedUser?.userName}
                                                                        </Link>
                                                                    </h6>
                                                                    <p className="mdtxt">@{suggestedUser.userName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group cus-dropdown dropend">
                                                                <button
                                                                    className="cmn-btn"
                                                                    style={{
                                                                        borderRadius: "50px",
                                                                        backgroundColor: followedUsers.includes(suggestedUser._id) ? "#D0F0E8" : "#F5E6F6",
                                                                        color: followedUsers.includes(suggestedUser._id) ? "#007B5F" : "#9A00A9",
                                                                    }}
                                                                    onClick={() => handleFollowToggle(suggestedUser._id)}
                                                                    onMouseEnter={(e) => {
                                                                        if (followedUsers.includes(suggestedUser._id)) {
                                                                            e.target.textContent = "Unfollow";
                                                                        }
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        if (followedUsers.includes(suggestedUser._id)) {
                                                                            e.target.textContent = "Following";
                                                                        }
                                                                    }}
                                                                >
                                                                    {followedUsers.includes(suggestedUser._id) ? "Following" : "Follow"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No suggestions available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Box
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
                                        Groups is on its way.
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        We’re working hard to bring you something amazing. This page is currently under development, but it won’t be long before it’s ready!
                                    </Typography>
                                    <Typography sx={{ mb: 4, color: "#131010" }}>
                                        Stay tuned for upcoming updates and exciting features!
                                    </Typography>
                                    <Typography sx={{ color: "#9A00A9" }}>Thank you for your patience and support!</Typography>
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
                            </Box>

                        </div>
                    </div>
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
            </footer> */}

        </>

    );
}

export default Groups;