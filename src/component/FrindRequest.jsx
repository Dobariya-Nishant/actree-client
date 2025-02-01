import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

function FrindRequest() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");
    const [suggestList, setSuggestList] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [followRequests, setFollowRequests] = useState([]);

    useEffect(() => {
        getAllFollowRequest();
        getAllSuggest();
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }
    }, []);

    const getAllSuggest = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_SUGGEST, {}, {});
            if (response.statusCode === 200) {
                const filteredSuggestions = (response.data || []).filter(
                    (suggestedUser) => suggestedUser._id !== user._id
                );
                setSuggestList(filteredSuggestions);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

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

    const getAllFollowRequest = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_FOLLOWING, {}, {}, { type: "requested" });
            if (response.statusCode === 200) {
                console.log(response.data);
                setFollowRequests(response.data.requested || []);
            } else {
                console.error("Error: Response status is not 200", response);
            }
        } catch (error) {
            console.error("Error fetching Request:", error);
        }
    };

    const handleConfirm = async (id) => {
        try {
            const response = await networkRequest("PATCH", API_ENDPOINTS.ACCEPT_FOLLOW_REQUEST, { followId: id });
            if (response.statusCode === 201) {
                console.log("accept request successfully!", response.data);
            } else {
                console.error("Error: Response status is not 201", response);
            }
        } catch (error) {
            console.log("Confirmed request for ID:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: id });
            if (response.statusCode === 201) {
                console.log("delete request successfully!", response.data);
            } else {
                console.error("Error: Response status is not 201", response);
            }
        } catch (error) {
            console.log("Deleted request for ID:", error);
        }
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

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
                                        <img className="avatar-img max-un me-3" src="assets/images/socialsidebar/arrow.png" alt="icon" style={{ marginLeft: "-5px" }} />
                                    </button>
                                    <h6>{user.userName}</h6>
                                </div>
                            </div>
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                <div className="post-single-box p-3 p-sm-5">
                                    <h6>Friend Request</h6>
                                    <div className="top-area pb-5">
                                        <hr></hr>
                                        {followRequests.length > 0 ? (
                                            followRequests.map((request) => (
                                                <div key={request._id} className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="position-relative">
                                                            <img
                                                                className="avatar-img max-un"
                                                                src={request.followerId.profilePicture || "../assets/images/default-avatar.png"}
                                                                alt="icon"
                                                                style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                            />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="#">{request.followerId.userName}</a></h6>
                                                            <span className="mdtxt status">@{request.followerId.userName}</span>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown">
                                                        <button
                                                            className="cmn-btn me-3"
                                                            style={{ backgroundColor: "#D0F0E8", color: "#007B5F", borderRadius: "30px", }}
                                                            onClick={() => handleConfirm(request._id)}
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            className="cmn-btn"
                                                            style={{ backgroundColor: "#FFD3C6", color: "#FF4747", borderRadius: "30px" }}
                                                            onClick={() => handleDelete(request._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No friend requests found.</p>
                                        )}
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
                                                                        src={suggestedUser.profilePicture || "assets/images/avatar-14.png"}
                                                                        alt="avatar"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                                    />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">{suggestedUser.userName}</a></h6>
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
        </>
    );
}

export default FrindRequest;