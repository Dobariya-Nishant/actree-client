import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import SocialSidebar from "./SocialSidebar";
import Profile from "./Profile";

const AccountProfile = () => {
    const token = localStorage.getItem("token");
    //const user = JSON.parse(localStorage.getItem("user")) || {};
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [followedUsers, setFollowedUsers] = useState([]);
    const defaultAvatar = "../assets/images/avatar-14.png";
    const defaultCover = "../assets/images/profile-edit-cover.png";
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [avatarPhoto, setAvatarPhoto] = useState(null);
    const [previewCover, setPreviewCover] = useState(defaultCover);
    const [previewAvatar, setPreviewAvatar] = useState(user.profilePicture || defaultAvatar);
    const [posts, setPosts] = useState([]);
    const [followedPosts, setFollowedPosts] = useState([]);
    const [suggestList, setSuggestList] = useState([]);
    //const [userName, setUserName] = useState("");
    const { userName } = useParams();
    const [profile, setProfile] = useState({});
    const isFirstRender = useRef(true);

    const getAccounProfiletPost = async () => {
        try {
            // if (!profile.isShowProfile) return
            const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {}, { userId: profile._id });
            if (response.statusCode === 200) {
                //setPosts(response.data.postList);
                console.log(response.data.postList);
                const postsData = response.data.postList;
                const updatedPosts = postsData.map((post) => ({
                    ...post,
                    user: {
                        ...post.user,
                        isFollowed: post.user.isFollowed || false,
                    },
                    likeCount: post.likeCount || 0,
                    isLiked: post.isLiked || false,
                }));
                setPosts(updatedPosts);
                const followedUserIds = updatedPosts
                    .filter(post => post.user.isFollowed)
                    .map(post => post.user._id);
                setFollowedPosts(followedUserIds);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

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

    const handlePostFollowToggle = async (postId) => {
        const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
                const isCurrentlyFollowed = post.user.isFollowed;
                if (isCurrentlyFollowed) {
                    unfollowUser(post.user._id);
                } else {
                    followUser(post.user._id);
                }
                return {
                    ...post,
                    user: {
                        ...post.user,
                        isFollowed: !isCurrentlyFollowed
                    }
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const followUser = async (userId) => {
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
            if (response.statusCode === 201) {
                console.log("Followed successfully!");
                setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, userId]);
            } else {
                console.error("Failed to follow");
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const unfollowUser = async (userId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
            if (response.statusCode === 201) {
                console.log("Unfollowed successfully!");
                setFollowedPosts((prevFollowedPosts) =>
                    prevFollowedPosts.filter((id) => id !== userId)
                );
            } else {
                console.error("Failed to unfollow");
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [showAll, setShowAll] = useState({});
    const [activePostId, setActivePostId] = useState(null);
    const handleReadMore = (postId) => {
        setShowAll((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };
    const getVisibleComments = (postId) => {
        const postComments = comments.filter(comment => comment.postId === postId);
        return showAll[postId] ? postComments : postComments.slice(0, 2);
    };

    const submitComment = (postId, content, media) => {
        handleComment(postId, content, media);
    };

    const handleComment = async (postId, content, media = null) => {
        try {
            const payload = {
                postId,
                content,
                media,
            };
            const response = await networkRequest("POST", API_ENDPOINTS.POST_COMMNET, payload);
            if (response.statusCode === 201) {
                console.log("Cooment successfully!");
                fetchComments(postId)
            } else {
                console.error("Failed to commnet");
            }
        } catch (error) {
            console.error("Error in Comment operation:", error);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_COMMENT, { postId });
            if (response.statusCode === 200) {
                setComments(response.data.commentList);
            } else {
                console.error("Failed to fetch comments:", response.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleOpenModal = (postId) => {
        setActivePostId(postId);
        fetchComments(postId);
    };

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likedBy, setLikedBy] = useState([]);

    const handleLikeToggle = async (postId, isLiked) => {
        try {
            if (isLiked) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_LIKE, { postId });
                if (response.statusCode === 200) {
                    console.log("Disliked successfully!");
                    setIsLiked(false);
                    setLikeCount((prevCount) => Math.max(prevCount - 1, 0));
                    setLikedBy((prevList) => prevList.slice(0, -1));
                } else {
                    console.error("Failed to dislike");
                }
            } else {
                const payload = { postId };
                const response = await networkRequest("POST", API_ENDPOINTS.POST_LIKE, payload);
                if (response.statusCode === 201) {
                    console.log("Liked successfully!");
                    setIsLiked(true);
                    setLikeCount((prevCount) => prevCount + 1);
                    setLikedBy((prevList) => [...prevList, response.data.user]);
                }
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const handleBookmark = async (postId) => {
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_BOOKMARK, { postId: postId });
            if (response.statusCode === 201) {
                console.log("bookmark successfully!", response);
                setBookmarkedPosts((prev) => [...prev, postId]);
                window.location.reload();
            } else {
                console.error("Failed to bookmark");
            }
        } catch (error) {
            console.error("Error in bookmark operation:", error);
        }
    };

    const handleBookmarkRemove = async (postId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_BOOKMARK, { postId });
            if (response.statusCode === 200) {
                console.log("bookmark remove successfully!", response);
                window.location.reload();
            } else {
                console.error("Failed to bookmark");
            }
        } catch (error) {
            console.error("Error in bookmark operation:", error);
        }
    };

    const handleFollowToggle = async (userId) => {
        try {
            if (followedUsers.includes(userId)) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    setFollowedUsers((prevFollowedUsers) =>
                        prevFollowedUsers.filter((id) => id !== userId)
                    );
                } else {
                    console.error("Failed to unfollow");
                }
            } else {
                const response = await networkRequest("POST", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
                } else {
                    console.error("Failed to follow");
                }
            }
        } catch (error) {
            console.error("Error in follow/unfollow operation:", error);
        }
    };

    const getProfileAccount = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_USER, {}, {}, { userName });
            if (response.statusCode === 200) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const [buttonText, setButtonText] = useState("Follow");
    const handleButtonClick = async (userId) => {
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
            if (response.statusCode === 200 || response.statusCode === 201) {
                const statusText = response.data.status || "Follow";
                setButtonText(statusText);
                localStorage.setItem(`followStatus_${userId}`, statusText);
                console.log("Response:", response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getAllSuggest();
        getProfileAccount();
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
        };
        const savedStatus = localStorage.getItem(`followStatus_${profile._id}`);
        if (savedStatus) {
            setButtonText(savedStatus);
        }
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [userName, profile._id]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        getAccounProfiletPost();
    }, [profile]);

    const isPrivate = profile.isPrivate;
    const isShowProfile = profile.isShowProfile;
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const handleDropdownToggle = (postId) => {
        setOpenDropdown((prev) => (prev === postId ? null : postId));
    };


    return (
        <>
            <main className="main-content">
                <style>
                    {`
                        .cmn-btn:hover {
                            background: #036dcf;
                            color: var(--bs-white);
                        }
                        .cmn-btn {
                            border-radius: 50px;
                            background-color: #F5E6F6;
                            color: #9A00A9;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 1rem;
                            transition: background-color 0.3s, color 0.3s;
                        }        
                        .preview-image {
                            width: 100%;
                            height: 300px;
                            object-fit: cover;
                            border-radius: 8px;
                            display: block;
                        }         
                        .avatar-item {
                            position: relative;
                        }
                        .avatar-img1 {
                            position: absolute;
                            margin-top: -70px;
                            margin-left: 70px;
                            transform: translate(-50px, -50px);
                            object-fit: cover;
                            border-radius: 50%;
                            height: 100px;
                            width: 100px;
                        }
                        .cemeraphoto {
                            position: absolute;
                            margin-top: -50px;
                            margin-left: 100px;
                            z-index: 5;
                            background: #dbd3d3;
                            border-radius: 50%;
                            padding: 5px;
                            cursor: pointer;
                        }
                        @media (max-width: 768px) {
                            .avatar-img1 {
                                height: 80px; 
                                width: 80px; 
                                margin-top: -50px;
                            }
                            .cemeraphoto {
                                top: 80%;
                                left: 80%;
                            }
                        }
                        @media (max-width: 480px) {
                            .avatar-img1 {
                                height: 60px;
                                width: 60px;
                                margin-top: -50px;
                                margin-left: 100px;
                            }
                            .cemeraphoto {
                                margin-top: -50px;
                                margin-left: 100px;
                            }
                        }
                    `}
                </style>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-box p-5">
                                <div className="col-md-12">
                                    <div className="upload-single cover-img">
                                        <div className="head-area mb-2 text-start">
                                            <h6>Profile</h6>
                                        </div>
                                        <div className="profile-picture position-relative text-start">
                                            <img className="preview-image w-100" src={previewCover} alt="Cover Preview" />
                                            <div className="file-upload position-absolute p-4 bottom-0 end-0"></div>
                                        </div>
                                        <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between align-items-start">
                                            <div className="d-flex gap-3 align-items-center">
                                                <div className="avatar-item">
                                                    <img className="avatar-img1 max-un" src={previewAvatar} alt="avatar" />
                                                </div>
                                                <div className="text-area text-start mt-5">
                                                    <h5 className="m-1 mb-1">{profile?.userName}</h5>
                                                    <div className="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
                                                        <span className="mdtxt d-center"></span>
                                                        <span className="mdtxt d-center">@{profile?.userName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn-item d-center gap-3">
                                                <button className="cmn d-center gap-1">
                                                    <img className="avatar-img max-un" src="../assets/images/navbar/doticon.png" alt="avatar" style={{ width: "20px" }} />
                                                </button>
                                                <button className="cmn d-center gap-1">
                                                    <img className="avatar-img max-un" src="../assets/images/navbar/message.png" alt="avatar" style={{ width: "40px" }} />
                                                </button>
                                                <button className="cmn-btn d-center gap-7" onClick={() => handleButtonClick(profile._id)}>{buttonText}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-12 col-xl-8 col-lg-7">
                            <div className="single-box p-3 p-sm-5">
                                <div className="head-area text-start d-flex" style={{ gap: '5%' }}>
                                    <span>{profile?.followingCount} Following</span>
                                    <span>{profile?.followersCount} Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <SocialSidebar />
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                {isPrivate && !isShowProfile ? (
                                    <div className="post-single-box p-3 p-sm-5">
                                        <div className="top-area pb-2">
                                            <div className="head-area text-center" style={{ gap: '5%' }}>
                                                <div className="btn-item d-center gap-3">
                                                    <img className="avatar-img max-un" src="../assets/images/navbar/lock.png" alt="avatar" style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                </div>
                                                <div className="btn-item d-center gap-3">
                                                    <h6 className="m-0"><Link href="#" className="mdtxt mt-3">This Account is Private</Link></h6>
                                                </div>
                                                <div className="btn-item d-center gap-3">
                                                    <span>Follow to see their photos and videos.</span>
                                                </div>
                                                <div className="btn-item d-center gap-3">
                                                    <button className="cmn-btn d-center gap-7" onClick={() => handleButtonClick(profile._id)}>{buttonText}</button>
                                                </div>
                                            </div>
                                            <div className="profile-area d-center justify-content-between"></div>
                                        </div>
                                    </div>
                                ) : (
                                    posts.map((post) => (
                                        <div key={post._id} className="post-single-box p-3 p-sm-5">
                                            <div className="top-area pb-2">
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="position-relative">
                                                            <Link
                                                                to={post.user._id === user._id ? "/profile" : `/accountProfile/${post.user.userName}`}
                                                            >
                                                                <img className="avatar-img max-un"
                                                                    src={post.user.profilePicture || "assets/images/navbar/picture.png"}
                                                                    alt="avatar"
                                                                    style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0">
                                                                <Link to={post.user._id === user._id ? "/profile" : `/accountProfile/${post.user.userName}`}>
                                                                    {post.user.userName}
                                                                </Link>
                                                            </h6>
                                                            <span className="mdtxt status">{post.createdAt &&
                                                                new Date(post.createdAt).toLocaleDateString("en-US", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                })}</span>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown">
                                                        {post.user._id !== user._id && (
                                                            <button
                                                                className="cmn-btn me-3"
                                                                style={{
                                                                    borderRadius: "50px",
                                                                    backgroundColor: post.user.isFollowed ? "#D0F0E8" : "#F5E6F6",
                                                                    color: post.user.isFollowed ? "#007B5F" : "#9A00A9",
                                                                }}
                                                                onClick={() => handlePostFollowToggle(post._id)}
                                                                onMouseEnter={(e) => {
                                                                    if (post.isFollowed) {
                                                                        e.target.textContent = "Unfollow";
                                                                    }
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    if (post.isFollowed) {
                                                                        e.target.textContent = "Following";
                                                                    }
                                                                }}
                                                            >
                                                                {post.user.isFollowed ? "Following" : "Follow"}
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="dropdown-btn"
                                                            onClick={() => handleDropdownToggle(post._id)}
                                                            aria-expanded={openDropdown === post._id}
                                                        >
                                                            <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                        </button>
                                                        <ul
                                                            className={`dropdown-menu p-4 mt-8 pt-2 ${openDropdown === post._id ? "show fade-in" : ""} `}
                                                            style={{
                                                                display: openDropdown === post._id ? "block" : "none",
                                                            }}
                                                        >
                                                            {post.isBookMarked ? (
                                                                <li>
                                                                    <Link className="droplist d-flex align-items-center gap-2"
                                                                        onClick={() => handleBookmarkRemove(post._id)}
                                                                    >
                                                                        <i className="material-symbols-outlined mat-icon">delete</i>
                                                                        <span>Remove Post</span>
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <li>
                                                                    <Link className="droplist d-flex align-items-center gap-2"
                                                                        onClick={() => handleBookmark(post._id)}
                                                                    >
                                                                        <i className="material-symbols-outlined mat-icon">bookmark_add</i>
                                                                        <span>Save Post</span>
                                                                    </Link>
                                                                </li>
                                                            )}
                                                            <li>
                                                                <Link className="droplist d-flex align-items-center gap-2" href="#">
                                                                    <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                    <span>Hide Post</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link className="droplist d-flex align-items-center gap-2" href="#">
                                                                    <i className="material-symbols-outlined mat-icon"> lock </i>
                                                                    <span>Block</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link className="droplist d-flex align-items-center gap-2" href="#">
                                                                    <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                    <span>Report Post</span>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <p className="description">{post.content}</p>
                                                </div>
                                                {post.media && post.media[0] && (
                                                    <div
                                                        className="post-media-container"
                                                        style={{
                                                            width: "100%",
                                                            height: "315px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {post.media[0].type === "photos" && (
                                                            <img
                                                                src={post.media[0].url}
                                                                alt=""
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    maxHeight: "100%",
                                                                    objectFit: "contain",
                                                                }}
                                                            />
                                                        )}
                                                        {post.media[0].type === "video" && (
                                                            <video
                                                                controls
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    maxHeight: "100%",
                                                                    objectFit: "contain",
                                                                }}
                                                            >
                                                                <source src={post.media[0].url} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="like-comment-share py-2 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                                    <button className="d-center gap-1 gap-sm-2 mdtxt"
                                                        onClick={() => handleLikeToggle(post._id, post.isLiked)}
                                                    >
                                                        <i className="material-symbols-outlined mat-icon">
                                                            {post.isLiked?.userId === user._id ? "favorite" : "favorite_border"}
                                                        </i>
                                                        {post.isLiked?.userId === user._id ? "Liked" : "Like"} {post.likeCount}
                                                        <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                            <ul className="d-flex align-items-center justify-content-center">
                                                                {post.isLiked && post.isLiked.userId && (
                                                                    <li key={post.isLiked.userId}>
                                                                        <img
                                                                            src={post.user.profilePicture || "assets/images/navbar/picture.png"}
                                                                            alt="User Avatar"
                                                                            style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                                                        />
                                                                    </li>
                                                                )}
                                                                {post.likeCount > 3 && <li><span className="mdtxt d-center">{post.likeCount - 3}+</span></li>}
                                                            </ul>
                                                        </div>
                                                    </button>
                                                    <button className="d-center gap-1 gap-sm-2 mdtxt" data-bs-toggle="modal" data-bs-target="#activityModComment"
                                                        onClick={() => handleOpenModal(post._id)}
                                                    >
                                                        <i className="material-symbols-outlined mat-icon"> chat </i>
                                                        Comment {post.commentCount}
                                                    </button>
                                                    <button className="d-center gap-1 gap-sm-2 mdtxt">
                                                        <i className="material-symbols-outlined mat-icon"> share </i>
                                                        Share {post.repostCount}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-4 col-lg-5">
                            <div className="sidebar-wrapper d-flex al-item justify-content-end justify-content-xl-center flex-column flex-md-row flex-xl-column flex gap-6">
                                <div className="sidebar-area p-5">
                                    <div className="mb-4">
                                        <h6 className="d-inline-flex">Suggested for you</h6>
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
            </main>
            <div className="go-live-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="activityModComment">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="top-content">
                                            <h6>Comment</h6>
                                            <hr />
                                            <div className="comments-list" style={{
                                                maxHeight: '600px',
                                                overflowY: 'auto',
                                                paddingRight: '10px'
                                            }}>
                                                {comments.filter(comment => comment.postId === activePostId).map((comment) => (
                                                    <div key={comment._id} className="comments-area">
                                                        <div className="single-comment-area ms-1">
                                                            <div className="parent-comment d-flex gap-2 gap-sm-4">
                                                                <div className="d-center align-items-baseline">
                                                                    <img
                                                                        className="avatar-img max-un"
                                                                        src={comment.user.profilePicture || "assets/images/navbar/picture.png"}
                                                                        alt="avatar"
                                                                        style={{ borderRadius: "50px", width: "40px" }}
                                                                    />
                                                                </div>
                                                                <div className="info-item active">
                                                                    <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                                        <div className="title-area">
                                                                            <h6 className="m-0 mb-3">
                                                                                <Link href="#">{comment.user.userName}</Link>
                                                                            </h6>
                                                                            <p className="mdtxt">{comment.content}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mid-area">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const content = e.target.elements.commentInput.value;
                                                const media = null;
                                                submitComment(activePostId, content, media);
                                                setCommentInput('');
                                            }} >
                                                <div className="d-flex mt-5 gap-3">
                                                    <div className="profile-box d-none d-xxl-block">
                                                        <Link href="#">
                                                            <img
                                                                src={user.profilePicture || "assets/images/navbar/picture.png"}
                                                                className="max-un"
                                                                alt="icon"
                                                                style={{ borderRadius: "50px", width: "40px" }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100">
                                                        <input
                                                            placeholder="Write a comment.."
                                                            name="commentInput"
                                                            value={commentInput}
                                                            onChange={(e) => setCommentInput(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="footer-area pt-5">
                                                    <div className="btn-area d-flex justify-content-end gap-2">
                                                        <button type="button" className="cmn-btn alt" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: "50px" }}>Cancel</button>
                                                        <button className="cmn-btn" style={{ borderRadius: "50px" }}>Comment</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AccountProfile;