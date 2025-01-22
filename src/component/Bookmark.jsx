import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

function Bookmark() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");
    const [posts, setPosts] = useState([]);
    const [followedPosts, setFollowedPosts] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [suggestList, setSuggestList] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }
        getAllBookmark();
        getAllSuggest();
    }, []);

    const handleBookmark = async (postId) => {
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_BOOKMARK, { postId: postId });
            if (response.statusCode === 201) {
                console.log("bookmark successfully!", response);
                setBookmarkedPosts((prev) => [...prev, postId]);
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


    const [bookmarks, setBookmarks] = useState([]);
    const getAllBookmark = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_BOOKMARK, {}, {});
            if (response.statusCode === 200) {
                console.log("Bookmark saved successfully!", response);
                setBookmarks(response.data.commentList || []);
                console.log("commentList", response.data.commentList);

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

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const handleDropdownToggle = (postId) => {
        setOpenDropdown((prev) => (prev === postId ? null : postId));
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".cus-dropdown")) {
            setOpenDropdown(null);
        }
    };

    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [showAll, setShowAll] = useState({});
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
                console.log("comm", response);

            } else {
                console.error("Failed to fetch comments:", response.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
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

    const getAllSuggest = async () => {
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
                                    <h6>Bookmarks</h6>
                                </div>
                            </div>
                            <style>
                                {`
                                    .post-media-container {
                                        width: 100%;
                                        height: 315px;
                                        overflow: hidden;
                                        position: relative;
                                    }
                                    .post-media-container img,
                                    .post-media-container video {
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                    }`
                                }
                            </style>
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                {bookmarks.map((bookmark) => (
                                    <div div key={bookmark._id} className="post-single-box p-3 p-sm-5" >
                                        <div className="top-area pb-5">
                                            <div className="profile-area d-center justify-content-between">
                                                <div className="avatar-item d-flex gap-3 align-items-center">
                                                    <div className="position-relative">
                                                        <img className="avatar-img max-un" src={bookmark.user?.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                    </div>
                                                    <div className="info-area">
                                                        <h6 className="m-0"><a href="public-profile-post.html">{bookmark.user?.userName}</a></h6>
                                                        <span className="mdtxt status">{bookmark.createdAt &&
                                                            new Date(bookmark.createdAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}</span>
                                                    </div>
                                                </div>
                                                <div className="btn-group cus-dropdown">
                                                    {/* {bookmark.user?._id !== user._id && (
                                                        <button
                                                            className="cmn-btn me-3"
                                                            style={{
                                                                borderRadius: "50px",
                                                                backgroundColor: bookmark.user?.isFollowed ? "#D0F0E8" : "#F5E6F6",
                                                                color: bookmark.user?.isFollowed ? "#007B5F" : "#9A00A9",
                                                            }}
                                                            onClick={() => handlePostFollowToggle(bookmark._id)}
                                                            onMouseEnter={(e) => {
                                                                if (bookmark.isFollowed) {
                                                                    e.target.textContent = "Unfollow";
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (bookmark.isFollowed) {
                                                                    e.target.textContent = "Following";
                                                                }
                                                            }}
                                                        >
                                                            {bookmark.user?.isFollowed ? "Following" : "Follow"}
                                                        </button>
                                                    )} */}
                                                    <button
                                                        type="button"
                                                        className="dropdown-btn"
                                                        onClick={() => handleDropdownToggle(bookmark._id)}
                                                        aria-expanded={openDropdown === bookmark._id}
                                                    >
                                                        <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                    </button>
                                                    <ul
                                                        className={`dropdown-menu p-4 mt-8 pt-2 ${openDropdown === bookmark._id ? "show fade-in" : ""} `}
                                                        style={{
                                                            display: openDropdown === bookmark._id ? "block" : "none",
                                                        }}
                                                    >
                                                        <li>
                                                            <a className="droplist d-flex align-items-center gap-2" onClick={() => handleBookmarkRemove(bookmark.postId._id)}>
                                                                <i className="material-symbols-outlined mat-icon">delete</i>
                                                                <span>Remove Post</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                <span>Hide Post</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                <i className="material-symbols-outlined mat-icon"> lock </i>
                                                                <span>Block</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                <span>Report Post</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="py-4">
                                                <p className="description">{bookmark.postId.content}</p>
                                            </div>
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
                                                {bookmark.postId.media && bookmark.postId.media[0]?.type === "photos" && (
                                                    <img
                                                        src={bookmark.postId.media[0].url}
                                                        alt="image"
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                )}
                                                {bookmark.postId.media && bookmark.postId.media[0]?.type === "video" && (
                                                    <video
                                                        controls
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    >
                                                        <source src={bookmark.postId.media[0].url} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        </div>
                                        <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                            <button className="d-center gap-1 gap-sm-2 mdtxt" onClick={() => handleLikeToggle(bookmark._id, bookmark.postId.isLiked)}>
                                                <i className="material-symbols-outlined mat-icon">favorite</i>
                                                {bookmark.isLiked?.userId === user._id ? "Liked" : "Like"} {bookmark.postId.likeCount}
                                                <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        {bookmark.postId.likeCount > 3 && <li><span className="mdtxt d-center">{bookmark.postId.likeCount - 3}+</span></li>}
                                                    </ul>
                                                </div>
                                            </button>
                                            <button className="d-center gap-1 gap-sm-2 mdtxt">
                                                <i className="material-symbols-outlined mat-icon"> chat </i>
                                                Comment {bookmark.postId.commentCount}
                                            </button>
                                            <button className="d-center gap-1 gap-sm-2 mdtxt">
                                                <i className="material-symbols-outlined mat-icon"> share </i>
                                                Share {bookmark.postId.repostCount}
                                            </button>
                                        </div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const content = e.target.elements.commentInput.value;
                                            const media = null;
                                            submitComment(bookmark._id, content, media);
                                            setCommentInput('')
                                        }} >
                                            <div className="d-flex mt-5 gap-3">
                                                <div className="profile-box d-none d-xxl-block">
                                                    <a href="#"><img src={user.profilePicture || "assets/images/navbar/picture.png"} className="max-un" alt="icon" style={{ borderRadius: "50px", width: "40px" }} /></a>
                                                </div>
                                                <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100" style={{
                                                    borderRadius: "50px",
                                                    height: "40px",
                                                    width: "100%",
                                                    padding: "10px",
                                                    resize: "none",
                                                    border: "1px solid #ccc",
                                                    textAlign: "left",
                                                }}>
                                                    <input placeholder="Write a comment.."
                                                        name="commentInput"
                                                        value={commentInput}
                                                        onChange={(e) => setCommentInput(e.target.value)}
                                                    />
                                                    <div className="file-input d-flex gap-1 gap-md-2">
                                                        <div className="file-upload">
                                                            <label className="file">
                                                                <input type="file" />
                                                                <span className="file-custom border-0 d-grid text-center">
                                                                    <span className="material-symbols-outlined mat-icon m-0 xxltxt"> gif_box </span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className="file-upload">
                                                            <label className="file">
                                                                <input type="file" />
                                                                <span className="file-custom border-0 d-grid text-center">
                                                                    <span className="material-symbols-outlined mat-icon m-0 xxltxt"> perm_media </span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <span className="mood-area">
                                                            <span className="material-symbols-outlined mat-icon m-0 xxltxt"> mood </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="btn-area d-flex">
                                                    <button type="submit" className="cmn-btn px-2 px-sm-5 px-lg-6" style={{ borderRadius: "50px", height: "38px" }}>
                                                        <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        {getVisibleComments(bookmark._id).map((comment) => (
                                            <div div key={comment._id} className="comments-area mt-5" >
                                                <div className="single-comment-area ms-1 ms-xxl-15">
                                                    <div className="parent-comment d-flex gap-2 gap-sm-4">
                                                        <div className=" d-center align-items-baseline">
                                                            <img className="avatar-img max-un" src={comment.user.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                        </div>
                                                        <div className="info-item active">
                                                            <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                                <div className="title-area">
                                                                    <h6 className="m-0 mb-3"><a href="public-profile-post.html">{comment.user.userName}</a></h6>
                                                                    <p className="mdtxt">{comment.content}</p>
                                                                </div>
                                                            </div>
                                                            <form action="#" className="comment-form">
                                                                <div className="d-flex gap-3">
                                                                    <input placeholder="Write a comment.." className="py-3" />
                                                                    <button className="cmn-btn px-2 px-sm-5 px-lg-6" >
                                                                        <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {bookmark.commentCount > 2 && (
                                            <div className="read-more-area mt-3 text-center">
                                                <button className="cmn-btn" onClick={() => handleReadMore(bookmark._id)} style={{ borderRadius: "50px" }}>
                                                    {showAll[bookmark._id] ? "Show Less" : "Show More"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* <div className="post-single-box p-3 p-sm-5">
                                    <div className="top-area pb-5">
                                        <div className="profile-area d-center justify-content-between">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="avatar position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-1.png" alt="avatar" />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                    <span className="mdtxt status">Now 19, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                </button>
                                                <ul className="dropdown-menu p-4 pt-2">
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> bookmark_add </i>
                                                            <span>Saved Post</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> person_remove </i>
                                                            <span>Unfollow</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                            <span>Hide Post</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> lock </i>
                                                            <span>Block</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> flag </i>
                                                            <span>Report Post</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="py-4">
                                            <p className="description">I created Roughly plugin to sketch crafted hand-drawn elements.</p>
                                        </div>
                                        <div className="post-img">
                                            <img src="assets/images/post-img-1.png" className="w-100" alt="image" />
                                        </div>
                                    </div>
                                    <div className="total-react-share pb-4 d-center gap-2 flex-wrap justify-content-between">
                                        <div className="friends-list d-flex gap-3 align-items-center text-center">
                                            <ul className="d-flex align-items-center justify-content-center">
                                                <li><img src="assets/images/avatar-2.png" alt="image" /></li>
                                                <li><img src="assets/images/avatar-3.png" alt="image" /></li>
                                                <li><img src="assets/images/avatar-4.png" alt="image" /></li>
                                                <li><span className="mdtxt d-center">8+</span></li>
                                            </ul>
                                        </div>
                                        <button className="mdtxt"> Comments</button>
                                        <button className="mdtxt"> Shares</button>
                                    </div>
                                    <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> favorite </i>
                                            Like
                                        </button>
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> chat </i>
                                            Comment
                                        </button>
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> share </i>
                                            Share
                                        </button>
                                    </div>
                                    <form action="#">
                                        <div className="d-flex mt-5 gap-3">
                                            <div className="profile-box d-none d-xxl-block">
                                                <a href="#"><img src="assets/images/add-post-avatar.png" className="max-un" alt="icon" /></a>
                                            </div>
                                            <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100">
                                                <input placeholder="Write a comment.." />
                                                <div className="file-input d-flex gap-1 gap-md-2">
                                                    <div className="file-upload">
                                                        <label className="file">
                                                            <input type="file" />
                                                            <span className="file-custom border-0 d-grid text-center">
                                                                <span className="material-symbols-outlined mat-icon m-0 xxltxt"> gif_box </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="file-upload">
                                                        <label className="file">
                                                            <input type="file" />
                                                            <span className="file-custom border-0 d-grid text-center">
                                                                <span className="material-symbols-outlined mat-icon m-0 xxltxt"> perm_media </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <span className="mood-area">
                                                        <span className="material-symbols-outlined mat-icon m-0 xxltxt"> mood </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="btn-area d-flex">
                                                <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                    <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="post-single-box p-3 p-sm-5">
                                    <div className="top-area pb-5">
                                        <div className="profile-area d-center justify-content-between">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className=" position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-1.png" alt="avatar" />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                    <span className="mdtxt status">Now 22, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                </button>
                                                <ul className="dropdown-menu p-4 pt-2">
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> bookmark_add </i>
                                                            <span>Saved Post</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> person_remove </i>
                                                            <span>Unfollow</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                            <span>Hide Post</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> lock </i>
                                                            <span>Block</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                            <i className="material-symbols-outlined mat-icon"> flag </i>
                                                            <span>Report Post</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="py-4">
                                            <p className="description">I created Roughly plugin to sketch crafted hand-drawn elements which can be used to any usage (diagrams/flows/decoration/etc)</p>
                                        </div>
                                        <div className="post-img  d-flex justify-content-between flex-wrap gap-2 gap-lg-3">
                                            <div className="single">
                                                <img src="assets/images/post-img-2.png" alt="image" />
                                            </div>
                                            <div className="single d-grid gap-3">
                                                <img src="assets/images/post-img-3.png" alt="image" />
                                                <img src="assets/images/post-img-4.png" alt="image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="total-react-share pb-4 d-center gap-2 flex-wrap justify-content-between">
                                        <div className="friends-list d-flex gap-3 align-items-center text-center">
                                            <ul className="d-flex align-items-center justify-content-center">
                                                <li><img src="assets/images/avatar-2.png" alt="image" /></li>
                                                <li><img src="assets/images/avatar-3.png" alt="image" /></li>
                                                <li><img src="assets/images/avatar-4.png" alt="image" /></li>
                                                <li><span className="mdtxt d-center">8+</span></li>
                                            </ul>
                                        </div>
                                        <button className="mdtxt"> Comments</button>
                                        <button className="mdtxt"> Shares</button>
                                    </div>
                                    <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> favorite </i>
                                            Like
                                        </button>
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> chat </i>
                                            Comment
                                        </button>
                                        <button className="d-center gap-1 gap-sm-2 mdtxt">
                                            <i className="material-symbols-outlined mat-icon"> share </i>
                                            Share
                                        </button>
                                    </div>
                                    <form action="#">
                                        <div className="d-flex mt-5 gap-3">
                                            <div className="profile-box d-none d-xxl-block">
                                                <a href="#"><img src="assets/images/add-post-avatar.png" className="max-un" alt="icon" /></a>
                                            </div>
                                            <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100">
                                                <input placeholder="Write a comment.." />
                                                <div className="file-input d-flex gap-1 gap-md-2">
                                                    <div className="file-upload">
                                                        <label className="file">
                                                            <input type="file" />
                                                            <span className="file-custom border-0 d-grid text-center">
                                                                <span className="material-symbols-outlined mat-icon m-0 xxltxt"> gif_box </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="file-upload">
                                                        <label className="file">
                                                            <input type="file" />
                                                            <span className="file-custom border-0 d-grid text-center">
                                                                <span className="material-symbols-outlined mat-icon m-0 xxltxt"> perm_media </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <span className="mood-area">
                                                        <span className="material-symbols-outlined mat-icon m-0 xxltxt"> mood </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="btn-area d-flex">
                                                <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                    <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div> */}
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
                                                                        src={suggestedUser.profilePicture || "assets/images/avatar-14.png"}
                                                                        alt="avatar"
                                                                        style={{ borderRadius: "50px", width: "40px" }}
                                                                    />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">{suggestedUser.userName}</a></h6>
                                                                    <p className="mdtxt">@{suggestedUser.userName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group cus-dropdown dropend">
                                                                {/* <button
                                                                    className="cmn-btn"
                                                                    style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}
                                                                    onClick={() => handleFollow(suggestedUser._id)}
                                                                >
                                                                    {followedUsers.includes(suggestedUser._id) ? "Following" : "Follow"}
                                                                </button> */}

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
            </main >
        </>

    );
}

export default Bookmark;