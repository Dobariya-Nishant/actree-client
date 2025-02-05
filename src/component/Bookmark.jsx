import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EmojiPicker from "emoji-picker-react";

function Bookmark(post) {
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
        fetchComments(post._id);
    }, [post._id]);

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
    const [activePostId, setActivePostId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editedMedia, setEditedMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaPreviewAdd, setMediaPreviewAdd] = useState(null);
    const [showEmojiPickerAdd, setShowEmojiPickerAdd] = useState(false);
    const handleEditComment = (commentId, currentContent) => {
        setEditingCommentId(commentId);
        setEditedContent(currentContent);
    };

    const handleReadMore = (postId) => {
        setShowAll((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };
    // const getVisibleComments = (postId) => {
    //     const postComments = comments.filter(comment => comment.postId === postId);
    //     return showAll[postId] ? postComments : postComments.slice(0, 2);
    // };

    const submitComment = (postId, content, media) => {
        handleComment(postId, content, media);
    };

    const handleComment = async (postId, content, media) => {
        try {
            const payload = {
                postId,
                content,
                media,
            };
            const response = await networkRequest("POST", API_ENDPOINTS.POST_COMMNET, payload);
            if (response.statusCode === 201) {
                console.log("Commment successfully!");
                fetchComments(postId);
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
                console.log("comment", response);
            } else {
                console.error("Failed to fetch comments:", response.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const updateComment = async (commentId, content, media = null) => {
        try {
            let payload;
            if (media instanceof File) {
                payload = new FormData();
                payload.append("commentId", commentId);
                payload.append("content", content);
                payload.append("media", media);
            } else {
                payload = {
                    commentId,
                    content,
                    media,
                };
            }
            const response = await networkRequest("PATCH", API_ENDPOINTS.UPDATE_COMMENT, payload);
            if (response.statusCode === 201) {
                console.log("Comment updated successfully!");
                fetchComments(activePostId);
                setEditingCommentId(null);
            } else {
                console.error("Failed to update commnet");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_COMMENT, { commentId });
            if (response.statusCode === 201) {
                console.log("Comment deleted successfully!");
                fetchComments(activePostId);
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleOpenModal = (postId) => {
        setActivePostId(postId);
        fetchComments(postId);
    };

    const [expandedComments, setExpandedComments] = useState({});
    const handleToggleExpand = (commentId) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likedBy, setLikedBy] = useState([]);

    const handleLikeToggle = async (postId, isLiked) => {
        try {
            if (isLiked) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_LIKE, { postId });
                if (response.statusCode === 201) {
                    console.log("Disliked successfully!");
                    setIsLiked(false);
                    setLikeCount((prevCount) => Math.max(prevCount - 1, 0));
                    setLikedBy((prevList) => prevList.slice(0, -1));
                    getAllBookmark();
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
                    getAllBookmark();
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

    const [activeDropdown, setActiveDropdown] = useState(null);
    const toggleDropdown = (commentId) => {
        setActiveDropdown((prev) => (prev === commentId ? null : commentId));
    };

    const getAllPost = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {}, { userId: user._id });
            if (response.statusCode === 200) {
                console.log("response", response);
                const postsData = response.data.postList;
                const updatedPosts = postsData.map((post) => ({
                    ...post,
                    user: {
                        ...post?.user,
                        isFollowed: post?.user.isFollowed || false,
                    },
                    likeCount: post?.likeCount || 0,
                    isLiked: post?.isLiked || false,
                }));
                const uniquePosts = Array.from(
                    new Set(updatedPosts.map((post) => post._id))
                ).map((id) => updatedPosts.find((post) => post._id === id));
                setPosts(uniquePosts);
                const followedUserIds = uniquePosts
                    .filter(post => post?.user.isFollowed)
                    .map(post => post?.user._id);
                setFollowedPosts(followedUserIds);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <>
            <main className="main-content">
                <style>
                    {`
                        .dropdown-menu {
                            position: absolute;
                            right: 10px;
                            transform: translateY(0);
                            z-index: 1000;
                        }
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
                        }
                        @media (max-width: 768px) {
                            .textremove span {
                                display: none;
                            }
                        }
                    `}
                </style>
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
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                {bookmarks.map((bookmark) => (
                                    <div div key={bookmark._id} className="post-single-box p-3 p-sm-5" >
                                        <div className="top-area pb-5">
                                            <div className="profile-area d-center justify-content-between">
                                                <div className="avatar-item d-flex gap-3 align-items-center">
                                                    <div className="position-relative">
                                                        <img
                                                            className="avatar-img max-un"
                                                            src={bookmark.user?.profilePicture || "../assets/images/navbar/picture.png"}
                                                            alt="avatar"
                                                            style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
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
                                                <div className="btn-group cus-dropdown" ref={dropdownRef}>
                                                    <button
                                                        type="button"
                                                        className="dropdown-btn"
                                                        onClick={(e) => handleDropdownToggle(bookmark._id, e)}
                                                        aria-expanded={openDropdown === bookmark._id}
                                                    >
                                                        <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                    </button>
                                                    <ul
                                                        className={`dropdown-menu p-4 mt-8 pt-2 ${openDropdown === bookmark._id ? "show fade-in" : ""} `}
                                                    >
                                                        <li>
                                                            <a className="droplist d-flex align-items-center gap-2" onClick={() => handleBookmarkRemove(bookmark.postId._id)}>
                                                                <i className="material-symbols-outlined mat-icon">delete</i>
                                                                <span>Unsave Post</span>
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
                                            {/* {bookmark.postId.media && bookmark.postId.media[0] && (
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
                                            )} */}
                                            {bookmark.postId.media && bookmark.postId.media.length > 0 && (
                                                <div className="post-media-container" style={{ width: "100%", height: "auto", overflow: "hidden" }}>
                                                    {bookmark.postId.media.length === 1 && (
                                                        <div className="post-img">
                                                            {bookmark.postId.media[0].type === "photos" ? (
                                                                <img src={bookmark.postId.media[0].url} className="w-100" alt="image" />
                                                            ) : (
                                                                <video controls className="w-100">
                                                                    <source src={bookmark.postId.media[0].url} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    )}
                                                    {bookmark.postId.media.length === 2 && (
                                                        <div className="post-img d-flex justify-content-between">
                                                            {bookmark.postId.media.map((media, index) => (
                                                                <div key={index} className="single" style={{ width: "49%" }}>
                                                                    {media.type === "photos" ? (
                                                                        <img src={media.url} className="w-100" alt="image" />
                                                                    ) : (
                                                                        <video controls className="w-100">
                                                                            <source src={media.url} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {bookmark.postId.media.length === 3 && (
                                                        <div className="post-img d-flex justify-content-between flex-wrap gap-2 gap-lg-3">
                                                            <div className="single" style={{ width: "50%" }}>
                                                                {bookmark.postId.media[0].type === "photos" ? (
                                                                    <img src={bookmark.postId.media[0].url} className="w-100" alt="image" />
                                                                ) : (
                                                                    <video controls className="w-100">
                                                                        <source src={bookmark.postId.media[0].url} type="video/mp4" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                )}
                                                            </div>
                                                            <div className="single d-grid gap-2" style={{ width: "50%" }}>
                                                                {bookmark.postId.media.slice(1).map((media, index) => (
                                                                    <div key={index}>
                                                                        {media.type === "photos" ? (
                                                                            <img src={media.url} className="w-100" alt="image" />
                                                                        ) : (
                                                                            <video controls className="w-100">
                                                                                <source src={media.url} type="video/mp4" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {bookmark.postId.media.length === 4 && (
                                                        <div className="post-img d-grid gap-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "10px" }}>
                                                            {bookmark.postId.media.map((media, index) => (
                                                                <div key={index} className="single" style={{ width: "100%", height: "100%" }}>
                                                                    {media.type === "photos" ? (
                                                                        <img src={media.url} className="w-100 h-100" style={{ objectFit: "cover" }} alt="image" />
                                                                    ) : (
                                                                        <video controls className="w-100 h-100" style={{ objectFit: "cover" }}>
                                                                            <source src={media.url} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                            {/* <button className="d-center gap-1 gap-sm-2 mdtxt" onClick={() => handleLikeToggle(bookmark?.postId._id, bookmark?.postId.isLiked)}>
                                                <i className="material-symbols-outlined mat-icon">
                                                    {bookmark?.postId?.likes?.some((like) => like.userId === user._id) ? "favorite" : "favorite_border"}
                                                </i>
                                                {bookmark?.postId?.likes?.some((like) => like.userId === user._id) ? "Liked" : "Like"} {bookmark?.postId?.likeCount}

                                                <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        {bookmark?.postId?.likes?.slice(0, 3).map((like) => (
                                                            <li key={like.userId}>
                                                                <img
                                                                    src={like.user?.profilePicture || "../assets/images/navbar/picture.png"}
                                                                    alt="User Avatar"
                                                                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                                                />
                                                            </li>
                                                        ))}
                                                        {bookmark?.postId?.likes?.length > 3 && (
                                                            <li>
                                                                <span className="mdtxt d-center">+{bookmark?.postId?.likes?.length - 3}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </button> */}
                                            <button className="d-center gap-1 gap-sm-2 mdtxt textremove" onClick={() => handleLikeToggle(bookmark.postId._id, bookmark.postId.isLiked)}>
                                                <i className="material-symbols-outlined mat-icon">favorite</i>
                                                <span>{bookmark.isLiked?.userId === user._id ? "Liked" : "Like"}</span> {bookmark.postId.likeCount}
                                                <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        {bookmark.postId.likeCount > 3 && <li><span className="mdtxt d-center">{bookmark.postId.likeCount - 3}+</span></li>}
                                                    </ul>
                                                </div>
                                            </button>
                                            <button className="d-center gap-1 gap-sm-2 mdtxt textremove" data-bs-toggle="modal" data-bs-target="#activityModComment"
                                                onClick={() => handleOpenModal(bookmark.postId._id)}>
                                                <i className="material-symbols-outlined mat-icon"> chat </i>
                                                <span>Comment</span> {bookmark.postId.commentCount}
                                            </button>
                                            <button className="d-center gap-1 gap-sm-2 mdtxt textremove">
                                                <i className="material-symbols-outlined mat-icon"> share </i>
                                                <span>Share</span> {bookmark.postId.repostCount}
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px", }}
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
            </main>
            <div className="go-live-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="activityModComment">
                                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "800px" }}>
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt">close</i>
                                            </button>
                                        </div>
                                        <div className="top-content">
                                            <h6>Comments</h6><hr />
                                            <div className="comments-list">
                                                {comments.map((comment) => (
                                                    <div key={comment._id} className="comments-area">
                                                        <div className="single-comment-area ms-1">
                                                            <div className="parent-comment d-flex gap-3">
                                                                <img
                                                                    className="avatar-img"
                                                                    src={comment.user.profilePicture || "../assets/images/navbar/picture.png"}
                                                                    alt="avatar"
                                                                    style={{ borderRadius: "50%", width: "40px", height: "40px", marginTop: "10px" }}
                                                                />
                                                                <div className="info-item">
                                                                    <div className="top-area px-4 py-3 d-flex justify-content-between">
                                                                        <div className="title-area">
                                                                            <h6 className="m-0 mb-2 comment-user-name">
                                                                                <a href="#">{comment.user.userName}</a>
                                                                            </h6>
                                                                        </div>
                                                                        <div className="info-area" style={{ marginTop: "-10px", marginLeft: "10px" }}>
                                                                            <span className="m-0">{comment.updatedAt &&
                                                                                new Date(comment.updatedAt).toLocaleDateString("en-US", {
                                                                                    month: "short",
                                                                                    day: "numeric",
                                                                                })}</span>
                                                                        </div>
                                                                        <div className="btn-group cus-dropdown">
                                                                            <button
                                                                                onClick={() => toggleDropdown(comment._id)}
                                                                                type="button"
                                                                                className="dropdown-btn"
                                                                                style={{ marginLeft: "450px", marginTop: "-20px" }}
                                                                            >
                                                                                <i className="material-symbols-outlined fs-xxl m-0">more_horiz</i>
                                                                            </button>
                                                                            <ul
                                                                                className={`dropdown-menu ${activeDropdown === comment._id ? "show" : ""}`}
                                                                                style={{ marginLeft: "350px", marginTop: "10px" }}
                                                                            >
                                                                                <li>
                                                                                    <a
                                                                                        className="droplist d-flex align-items-center gap-2"
                                                                                        onClick={() => {
                                                                                            handleEditComment(comment._id, comment.content, comment.media);
                                                                                            setActiveDropdown(null);
                                                                                        }}
                                                                                    >
                                                                                        <i className="material-symbols-outlined mat-icon">edit</i>
                                                                                        <span>Edit</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a
                                                                                        className="droplist d-flex align-items-center gap-2"
                                                                                        onClick={() => handleDeleteComment(comment._id)}
                                                                                    >
                                                                                        <i className="material-symbols-outlined mat-icon">delete</i>
                                                                                        <span>Delete</span>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-2">
                                                                        <p
                                                                            className="mdtxt"
                                                                            style={{
                                                                                display: "block",
                                                                                marginBottom: 0,
                                                                            }}
                                                                        >
                                                                            {expandedComments[comment._id]
                                                                                ? comment?.content
                                                                                //: comment?.content.split(" ").slice(0, 50).join(" ")}
                                                                                : (comment?.content || "").split(" ").slice(0, 50).join(" ")}
                                                                        </p>
                                                                        {comment?.content?.split(" ").length > 50 && (
                                                                            <span
                                                                                onClick={() => handleToggleExpand(comment._id)}
                                                                                style={{
                                                                                    color: "#131010",
                                                                                    cursor: "pointer",
                                                                                    fontWeight: "bold",
                                                                                    marginTop: "-5px",
                                                                                    fontSize: "14px",
                                                                                }}
                                                                            >
                                                                                {expandedComments[comment._id] ? "Less" : "... More"}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {comment.media[0]?.type === "photos" && (
                                                                        <img
                                                                            src={comment.media[0]?.url}
                                                                            alt="media"
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                maxHeight: "400px",
                                                                                objectFit: "contain",
                                                                                borderRadius: "8px",
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {comment.media[0]?.type === "video" && (
                                                                        <video
                                                                            controls
                                                                            style={{
                                                                                maxWidth: "100%",
                                                                                maxHeight: "100%",
                                                                                objectFit: "contain",
                                                                            }}
                                                                        >
                                                                            <source src={comment.media[0]?.url} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    )}
                                                                    {editingCommentId === comment._id && (
                                                                        <form
                                                                            onSubmit={(e) => {
                                                                                e.preventDefault();
                                                                                updateComment(comment._id, editedContent, editedMedia);
                                                                                setCommentInput("");
                                                                                setEditedMedia(null);
                                                                                setMediaPreview(null);
                                                                            }}
                                                                        >
                                                                            <textarea
                                                                                value={editedContent}
                                                                                onChange={(e) => setEditedContent(e.target.value)}
                                                                                placeholder="Edit your comment"
                                                                                className="form-control mb-2 mt-4"
                                                                                rows="2"
                                                                                style={{ width: "700px" }}
                                                                            ></textarea>
                                                                            {mediaPreview && (
                                                                                <div className="media-preview mb-2">
                                                                                    {mediaPreview.type === "image" ? (
                                                                                        <img
                                                                                            src={mediaPreview.preview}
                                                                                            alt="Uploaded preview"
                                                                                            style={{
                                                                                                maxWidth: "100%",
                                                                                                height: "auto",
                                                                                                borderRadius: "8px",
                                                                                            }}
                                                                                        />
                                                                                    ) : (
                                                                                        <video
                                                                                            controls
                                                                                            style={{
                                                                                                maxWidth: "100%",
                                                                                                height: "auto",
                                                                                                borderRadius: "8px",
                                                                                                marginTop: "10px",
                                                                                            }}
                                                                                        >
                                                                                            <source src={mediaPreview.preview} />
                                                                                            Your browser does not support the video tag.
                                                                                        </video>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-light mb-2 me-2"
                                                                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                                            >
                                                                                😊
                                                                            </button>
                                                                            <label className="btn btn-light m-0 me-2">
                                                                                <i className="material-symbols-outlined mat-icon"> perm_media </i>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*,video/*"
                                                                                    style={{ display: "none" }}
                                                                                    onChange={(e) => {
                                                                                        const file = e.target.files[0];
                                                                                        if (file) {
                                                                                            setEditedMedia(file);
                                                                                            const fileType = file.type.split('/')[0];
                                                                                            const reader = new FileReader();
                                                                                            reader.onload = (event) => {
                                                                                                setMediaPreview({
                                                                                                    type: fileType,
                                                                                                    preview: event.target.result,
                                                                                                });
                                                                                            };
                                                                                            reader.readAsDataURL(file);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </label>
                                                                            <button
                                                                                type="submit"
                                                                                className="cmn-btn success"
                                                                                style={{ borderRadius: "50px" }}
                                                                            >
                                                                                Update
                                                                            </button>
                                                                            {showEmojiPicker && (
                                                                                <div className={`emoji-pickeredit ${window.innerWidth <= 320 ? "mobile-emoji" : ""}`}>
                                                                                    <EmojiPicker
                                                                                        onEmojiClick={(emoji) =>
                                                                                            setEditedContent((prev) => prev + emoji.emoji)
                                                                                        }
                                                                                        style={{
                                                                                            height: "450px",
                                                                                            //width: window.innerWidth > 320 ? "300px" : "100%",
                                                                                            width: "100%",
                                                                                            marginTop: "10px",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </form>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mid-area">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const media = editedMedia;
                                                    submitComment(activePostId, commentInput, media);
                                                    setCommentInput("");
                                                    setEditedMedia(null);
                                                    setMediaPreviewAdd(null);
                                                }}
                                            >
                                                <div className="d-flex mt-5 gap-3">
                                                    <img
                                                        src={user.profilePicture || "../assets/images/navbar/picture.png"}
                                                        alt="icon"
                                                        style={{
                                                            borderRadius: "50%",
                                                            width: "40px",
                                                        }}
                                                    />
                                                    <input
                                                        placeholder="Write a comment..."
                                                        name="commentInput"
                                                        value={commentInput}
                                                        onChange={(e) => setCommentInput(e.target.value)}
                                                        className="form-control"
                                                        style={{
                                                            borderRadius: "50px",
                                                            padding: "8px 16px",
                                                        }}
                                                    />
                                                </div>
                                                {mediaPreviewAdd && (
                                                    <div className="media-preview mb-4" style={{ marginLeft: "8%" }}>
                                                        {mediaPreviewAdd.type === "image" ? (
                                                            <img
                                                                src={mediaPreviewAdd.preview}
                                                                alt="Uploaded preview"
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    height: "auto",
                                                                    borderRadius: "8px",
                                                                    marginTop: "5px",
                                                                }}
                                                            />
                                                        ) : (
                                                            <video
                                                                controls
                                                                style={{
                                                                    maxWidth: "100%",
                                                                    height: "auto",
                                                                    borderRadius: "8px",
                                                                    marginTop: "10px",
                                                                }}
                                                            >
                                                                <source src={mediaPreviewAdd.preview} />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}
                                                    </div>
                                                )}
                                                {showEmojiPickerAdd && (
                                                    <div className="emoji-pickeradd mb-4" style={{ marginLeft: "8%", marginTop: "10px", }}>
                                                        <EmojiPicker
                                                            onEmojiClick={(emoji) =>
                                                                setCommentInput((prev) => prev + emoji.emoji)
                                                            }
                                                            style={{
                                                                height: "450px",
                                                                width: window.innerWidth > 768 ? "700px" : "100%",
                                                                marginTop: "10px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="d-flex gap-5 mt-3 ml-5" style={{ marginLeft: "8%" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-light"
                                                        onClick={() => setShowEmojiPickerAdd(!showEmojiPickerAdd)}
                                                    >
                                                        😊
                                                    </button>
                                                    <label className="btn btn-light">
                                                        <i className="material-symbols-outlined mat-icon"> perm_media </i>
                                                        <input
                                                            type="file"
                                                            accept="image/*,video/*"
                                                            style={{ display: "none" }}
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    setEditedMedia(file);
                                                                    const fileType = file.type.split('/')[0];
                                                                    const reader = new FileReader();
                                                                    reader.onload = (event) => {
                                                                        setMediaPreviewAdd({
                                                                            type: fileType,
                                                                            preview: event.target.result,
                                                                        });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="footer-area pt-3 text-end">
                                                    <button
                                                        type="button"
                                                        className="cmn-btn alt"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        style={{ borderRadius: "50px" }}
                                                        onClick={() => {
                                                            setMediaPreviewAdd(null);
                                                            setMediaPreview(null);
                                                            setShowEmojiPickerAdd(false);
                                                            setShowEmojiPicker(false);
                                                            setCommentInput("");
                                                            setEditedMedia(null);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="cmn-btn"
                                                        style={{ borderRadius: "50px" }}
                                                    >
                                                        Comment
                                                    </button>
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
export default Bookmark;