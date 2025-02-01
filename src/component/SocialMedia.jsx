import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";
import Plyr from "plyr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EmojiPicker from "emoji-picker-react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { Close, ArrowBack, ArrowForward } from "@mui/icons-material";

function SocialMedia(post) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postContentNew, setPostContentNew] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [lastCreatedAt, setLastCreatedAt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [suggestList, setSuggestList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followedPosts, setFollowedPosts] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.classList.remove('show');
            backdrop.remove();
        }
        document.body.style.overflow = '';
        const modalBackdropElements = document.querySelectorAll('.modal-backdrop');
        modalBackdropElements.forEach((el) => {
            el.style.backgroundColor = ''
        });
        document.body.style.overflow = '';
    };

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    // const handleDropdownToggle = (postId) => {
    //     setOpenDropdown((prev) => (prev === postId ? null : postId));
    // };

    const handleDropdownToggle = (postId, event) => {
        event.stopPropagation();
        setOpenDropdown(openDropdown === postId ? null : postId);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(null);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getAllPost();
        getAllSuggest();
        fetchComments(post._id);
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }

        const players = Array.from(document.querySelectorAll('.player')).map(
            (player) => new Plyr(player, { fullscreen: { enabled: false } })
        );

        return () => {
            players.forEach((player) => player.destroy());
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [post._id, isModalOpen]);



    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const handleTextChange = (e) => { };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(files);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", postContent);
        uploadedFiles.forEach((file) => {
            formData.append("media", file);
        });
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_CREATE, formData);
            if (response.statusCode === 201) {
                toast.success("Post created successfully!");
                setPostContent("");
                setUploadedFiles([]);
                getAllPost();
                closeModal();
                window.location.reload();
            } else {
                console.error(response.message || "Failed to create post.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const getAllPost = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {});
            if (response.statusCode === 200) {
                console.log("response", response)
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

    // const getAllPost = async (createdAt = null) => {
    //     if (loading) return;
    //     setLoading(true);
    //     try {
    //         const queryParams = createdAt ? `?createdAt=${createdAt}` : "";
    //         const response = await networkRequest("GET", `${API_ENDPOINTS.GET_POSTLIST}${queryParams}`);
    //         if (response.statusCode === 200) {
    //             const postsData = response.data.postList;

    //             // const updatedPosts = postsData.map((post) => ({
    //             //     ...post,
    //             //     user: {
    //             //         ...post.user,
    //             //         isFollowed: post.user.isFollowed || false,
    //             //     },
    //             //     likeCount: post.likeCount || 0,
    //             //     isLiked: post.isLiked || false,
    //             // }));
    //             // setPosts(updatedPosts);
    //             // const followedUserIds = updatedPosts
    //             //     .filter(post => post.user.isFollowed)
    //             //     .map(post => post.user._id);
    //             // setFollowedPosts(followedUserIds);

    //             // setPosts(prevPosts => {
    //             //     const uniquePosts = [...prevPosts, ...postsData].filter(
    //             //         (post, index, self) => index === self.findIndex((p) => p._id === post._id)
    //             //     );
    //             //     return uniquePosts;
    //             // });
    //             if (postsData.length === 0) {
    //                 setHasMore(false);
    //                 return;
    //             }
    //             setPosts(prevPosts => [...prevPosts, ...postsData]);
    //             setLastCreatedAt(postsData[postsData.length - 1].createdAt);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching posts:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (
    //             window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
    //             hasMore &&
    //             !loading
    //         ) {
    //             getAllPost(lastCreatedAt);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [lastCreatedAt, hasMore, loading]);

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

    const handlePostFollowToggle = async (postId) => {
        const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
                const isCurrentlyFollowed = post.user.isFollowed;
                if (isCurrentlyFollowed) {
                    unfollowUser(post.user._id);
                } else {
                    followUser(post.user._id);
                }
                //return { ...post, isFollowed: !isCurrentlyFollowed };
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

    const sliderSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [showAll, setShowAll] = useState({});
    const [activePostId, setActivePostId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
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
    const getVisibleComments = (postId) => {
        const postComments = comments.filter(comment => comment.postId === postId);
        return showAll[postId] ? postComments : postComments.slice(0, 2);
    };

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
                console.log("Comment successfully!");
                fetchComments(postId)
                getAllPost();
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

    const updateComment = async (commentId, content, media = null) => {
        try {
            // const payload = {
            //     commentId,
            //     content,
            //     media,
            // };
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
                getAllPost();
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
                    getAllPost();
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
                    getAllPost();
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

    const handleDeletePost = async (postId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_POST, { postId });
            if (response.statusCode === 200) {
                console.log("delete post successfully!", response);
                window.location.reload();
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error in delete post operation:", error);
        }
    };
    const [repost, setRepost] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showEmojiPickerAdd, setShowEmojiPickerAdd] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleEmojiClick = (emojiObject) => {
        setPostContent((prevContent) => prevContent + emojiObject.emoji);
        setPostContentNew((prevContent) => prevContent + emojiObject.emoji);
        setShowEmojiPicker(false);
        setShowEmojiPickerAdd(false);
    };

    const handleRepost = async (postId, postData) => {
        setSelectedPost(postData);
        setRepost(postData.user);
        setPostContent(postData.content || "");
        setUploadedFiles(postData.media || []);
    };

    const handleRepostSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("orignalPostId", selectedPost._id);

        if (postContentNew) {
            formData.append("content", postContentNew || "");
        }

        // if (uploadedFiles.length) {
        // uploadedFiles.forEach((file) => {
        //     formData.append("media", file);
        // });
        // }

        try {
            const response = await networkRequest("POST", `${API_ENDPOINTS.RE_POST}`, formData);
            if (response.statusCode === 201) {
                setPostContent("");
                setUploadedFiles([]);
                getAllPost();
                closeModal();
                window.location.reload();
            } else {
                toast.error(response.message || "Failed to update repost?.");
            }
        } catch (error) {
            console.error("Error repost:", error);
        }
    };

    const [activeDropdown, setActiveDropdown] = useState(null);
    const toggleDropdown = (commentId) => {
        setActiveDropdown((prev) => (prev === commentId ? null : commentId));
    };

    const [editedMedia, setEditedMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaPreviewAdd, setMediaPreviewAdd] = useState(null);

    const isValidImageUrl = (url) => {
        return (url && url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };


    return (
        <>
            <main className="main-content">
                <style>
                    {`
                        @media (max-width: 768px) {
                            .textremove span {
                                display: none;
                            }
                        }
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
                    `}
                </style>
                <div className="container sidebar-toggler">
                    <div className="row">
                        <SocialSidebar />
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
                            <Slider {...sliderSettings} className="story-carousel">
                                <div className="single-item">
                                    <div className="single-slide">
                                        <Link to="/socialMedia" className="position-relative d-center">
                                            <img className="bg-img" src="assets/images/story-slider-owner.png" alt="icon" />
                                            <div className="abs-area d-grid p-3 position-absolute bottom-0">
                                                <div className="icon-box m-auto d-center mb-3">
                                                    <i className="material-symbols-outlined text-center mat-icon"> add </i>
                                                </div>
                                                <span className="mdtxt">Create A Story</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-1.png" alt="image" />
                                            <Link to="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Billy_Williams.png" alt="image" />
                                                <span className="mdtxt">Alen Lio</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-2.png" alt="image" />
                                            <Link to="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Justus_Everett.png" alt="image" />
                                                <span className="mdtxt">Josep</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-3.png" alt="image" />
                                            <Link to="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Julie Bates.png" alt="image" />
                                                <span className="mdtxt">Jessica</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-4.png" alt="image" />
                                            <Link to="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/avatar-4.png" alt="image" />
                                                <span className="mdtxt">Alen</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-4.png" alt="image" />
                                            <Link to="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/avatar-5.png" alt="image" />
                                                <span className="mdtxt">Jacob Jones</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                            <div className="share-post d-flex gap-3 gap-sm-5 p-3 p-sm-5">
                                <div className="profile-box">
                                    <Link to="/profile"><img className="avatar-img max-un" src={user.profilePicture || "../assets/images/navbar/picture.png"} alt="icon"
                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                    </Link>
                                </div>
                                <form action="#" className="w-100 position-relative">
                                    <input
                                        className="mb-2"
                                        name="content"
                                        cols="10"
                                        rows="1"
                                        placeholder={`Write something to ${user.userName || "user"}...`}
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                        style={{
                                            borderRadius: "50px",
                                            height: "40px",
                                        }}
                                    ></input>
                                    <ul className="d-flex justify-content-between flex-wrap textremove">
                                        <li className="d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#photoVideoMod">
                                            <img src="../assets/images/socialsidebar/galleryicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span style={{ color: "#1565c0" }}>Photo/Video</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#activityModEmoji">
                                            <img src="../assets/images/socialsidebar/emojiicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span style={{ color: "#1565c0" }}>GIF/Emoji</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#activityMod">
                                            <img src="../assets/images/socialsidebar/pollicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span style={{ color: "#1565c0" }}>Poll</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-1 me-3">
                                            <button onClick={handlePostSubmit} className="cmn-btn px-2 px-sm-5 px-lg-6" style={{ borderRadius: "50px", height: "35px" }}>POST</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                {posts.map((post) => (
                                    <div key={post._id} className="post-single-box p-3 p-sm-5">
                                        <div className="top-area pb-2">
                                            <div className="profile-area d-center justify-content-between">
                                                <div className="avatar-item d-flex gap-3 align-items-center">
                                                    <div className="position-relative">
                                                        <Link
                                                            to={post.user._id === user._id ? "/profile" : `/accountProfile/${post.user.userName}`}
                                                        >
                                                            <img className="avatar-img max-un"
                                                                src={post.user.profilePicture || "../assets/images/navbar/picture.png"}
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
                                                <div className="btn-group cus-dropdown" ref={dropdownRef}>
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
                                                        //onClick={() => handleDropdownToggle(post._id)}
                                                        //aria-expanded={openDropdown === post._id}
                                                        onClick={(e) => handleDropdownToggle(post._id, e)}
                                                        aria-expanded={openDropdown === post._id}
                                                    >
                                                        <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                    </button>
                                                    <ul
                                                        className={`dropdown-menu p-4 mt-8 pt-2 ${openDropdown === post._id ? "show fade-in" : ""} `}
                                                    >
                                                        {post.isBookMarked ? (
                                                            <li>
                                                                <a className="droplist d-flex align-items-center gap-2" onClick={() => handleBookmarkRemove(post._id)}>
                                                                    <i className="material-symbols-outlined mat-icon">delete</i>
                                                                    <span>Unsave Post</span>
                                                                </a>
                                                            </li>
                                                        ) : (
                                                            <li>
                                                                <a className="droplist d-flex align-items-center gap-2" onClick={() => handleBookmark(post._id)}>
                                                                    <i className="material-symbols-outlined mat-icon">bookmark_add</i>
                                                                    <span>Save Post</span>
                                                                </a>
                                                            </li>
                                                        )}
                                                        {post.user._id === user._id && (
                                                            <li>
                                                                <a className="droplist d-flex align-items-center gap-2" onClick={() => handleDeletePost(post._id)}>
                                                                    <i className="material-symbols-outlined mat-icon">delete</i>
                                                                    <span>Delete Post</span>
                                                                </a>
                                                            </li>
                                                        )}
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
                                            <div className="py-2">
                                                <p className="description">{post.content}</p>
                                            </div>
                                            <style>
                                                {`
                                                    .post-img {
                                                        display: grid;
                                                        gap: 10px;
                                                    }
                                                    .single img,
                                                    .single video {
                                                        width: 100%;
                                                        height: 100%;
                                                        object-fit: cover;
                                                        border-radius: 5px;
                                                    }
                                                `}
                                            </style>
                                            {post?.media && post?.media.length > 0 && (
                                                <div className="post-media-container" style={{ width: "100%", height: "auto", overflow: "hidden" }}>
                                                    {post.media.length === 1 && (
                                                        <div className="post-img">
                                                            {post.media[0].type === "photos" ? (
                                                                <img src={post.media[0].url} className="w-100" alt="image" />
                                                            ) : (
                                                                <video controls className="w-100">
                                                                    <source src={post.media[0].url} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    )}
                                                    {post.media.length === 2 && (
                                                        <div className="post-img d-flex justify-content-between">
                                                            {post.media.map((media, index) => (
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
                                                    {post.media.length === 3 && (
                                                        <div className="post-img d-flex justify-content-between flex-wrap gap-2 gap-lg-3">
                                                            <div className="single" style={{ width: "50%" }}>
                                                                {post.media[0].type === "photos" ? (
                                                                    <img src={post.media[0].url} className="w-100" alt="image" />
                                                                ) : (
                                                                    <video controls className="w-100">
                                                                        <source src={post.media[0].url} type="video/mp4" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                )}
                                                            </div>
                                                            <div className="single d-grid gap-2" style={{ width: "50%" }}>
                                                                {post.media.slice(1).map((media, index) => (
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
                                                    {post.media.length === 4 && (
                                                        <div className="post-img d-grid gap-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "10px" }}>
                                                            {post.media.map((media, index) => (
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

                                            {/* {post.media && post.media[0] && (
                                                <div
                                                    className="post-media-container"
                                                    style={{
                                                        width: "100%",
                                                        height: "315px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        //background: "#f0f0f0",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {post.media[0].type === "photos" && (
                                                        <img
                                                            src={post.media[0].url}
                                                            alt="image"
                                                            style={{
                                                                maxWidth: "100%",
                                                                maxHeight: "100%",
                                                                objectFit: "contain",
                                                                //objectFit: "cover",
                                                                //borderRadius: "20px",
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
                                            )} */}
                                            {/* {post.orignalPostId && (
                                                <div className="orignal-post-container p-3" style={{ border: "1px solid #ddd", borderRadius: "8px", marginTop: "15px" }}>
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="position-relative">
                                                            <Link
                                                                to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                                                            >
                                                                <img
                                                                    className="avatar-img max-un"
                                                                    src={post.orignalPostId.user?.profilePicture || "assets/images/navbar/picture.png"}
                                                                    alt="avatar"
                                                                    style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0">
                                                                <Link
                                                                    to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                                                                >
                                                                    {post.orignalPostId.user?.userName || "Unknown"}
                                                                </Link>
                                                            </h6>
                                                            <span className="mdtxt status">
                                                                {post.orignalPostId.createdAt &&
                                                                    new Date(post.orignalPostId.createdAt).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="py-2">
                                                        <p className="description">{post.orignalPostId.content}</p>
                                                    </div>
                                                    {post.orignalPostId.media && post.orignalPostId.media[0] && (
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
                                                            {post.orignalPostId.media[0].type === "photos" && (
                                                                <img
                                                                    src={post.orignalPostId.media[0].url}
                                                                    alt="image"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        maxHeight: "100%",
                                                                        objectFit: "contain",
                                                                    }}
                                                                />
                                                            )}
                                                            {post.orignalPostId.media[0].type === "video" && (
                                                                <video
                                                                    controls
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        maxHeight: "100%",
                                                                        objectFit: "contain",
                                                                    }}
                                                                >
                                                                    <source src={post.orignalPostId.media[0].url} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )} */}
                                            {post?.orignalPostId?.media && post?.orignalPostId?.media.length > 0 && (
                                                <div className="orignal-media-container  p-3" style={{ width: "100%", height: "auto", overflow: "hidden", border: "1px solid #ddd", borderRadius: "8px", marginTop: "15px" }}>
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="position-relative">
                                                            <Link
                                                                to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                                                            >
                                                                <img
                                                                    className="avatar-img max-un"
                                                                    src={post.orignalPostId.user?.profilePicture || "assets/images/navbar/picture.png"}
                                                                    alt="avatar"
                                                                    style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0">
                                                                <Link
                                                                    to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                                                                >
                                                                    {post.orignalPostId.user?.userName || "Unknown"}
                                                                </Link>
                                                            </h6>
                                                            <span className="mdtxt status">
                                                                {post.orignalPostId.createdAt &&
                                                                    new Date(post.orignalPostId.createdAt).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="py-2">
                                                        <p className="description">{post.orignalPostId.content}</p>
                                                    </div>
                                                    {post.orignalPostId.media.length === 1 && (
                                                        <div className="post-img">
                                                            {post.orignalPostId.media[0].type === "photos" ? (
                                                                <img src={post.orignalPostId.media[0].url} className="w-100" alt="image" />
                                                            ) : (
                                                                <video controls className="w-100">
                                                                    <source src={post.orignalPostId.media[0].url} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    )}
                                                    {post.orignalPostId.media.length === 2 && (
                                                        <div className="post-img d-flex justify-content-between">
                                                            {post.orignalPostId.media.map((media, index) => (
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
                                                    {post.orignalPostId.media.length === 3 && (
                                                        <div className="post-img d-flex justify-content-between flex-wrap gap-2 gap-lg-3">
                                                            <div className="single" style={{ width: "50%" }}>
                                                                {post.orignalPostId.media[0].type === "photos" ? (
                                                                    <img src={post.orignalPostId.media[0].url} className="w-100" alt="image" />
                                                                ) : (
                                                                    <video controls className="w-100">
                                                                        <source src={post.orignalPostId.media[0].url} type="video/mp4" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                )}
                                                            </div>
                                                            <div className="single d-grid gap-2" style={{ width: "50%" }}>
                                                                {post.orignalPostId.media.slice(1).map((media, index) => (
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
                                                    {post.orignalPostId.media.length === 4 && (
                                                        <div className="post-img d-grid gap-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "10px" }}>
                                                            {post.orignalPostId.media.map((media, index) => (
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

                                        <div className="like-comment-share py-2 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
                                            <button className="d-center gap-1 gap-sm-2 mdtxt" onClick={() => handleLikeToggle(post._id, post.isLiked)}>
                                                <i className="material-symbols-outlined mat-icon">
                                                    {post.likes?.some((like) => like.userId === user._id) ? "favorite" : "favorite_border"}
                                                </i>
                                                {post.likes?.some((like) => like.userId === user._id) ? "Liked" : "Like"} {post.likeCount}
                                                <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        {post.likes?.slice(0, 3).map((like) => (
                                                            <li key={like.userId}>
                                                                <img
                                                                    src={like.user?.profilePicture || "../assets/images/navbar/picture.png"}
                                                                    alt="User Avatar"
                                                                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                                                />
                                                            </li>
                                                        ))}
                                                        {post.likes?.length > 3 && (
                                                            <li>
                                                                <span className="mdtxt d-center">+{post.likes.length - 3}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </button>
                                            {/* <button className="d-center gap-1 gap-sm-2 mdtxt" onClick={() => handleLikeToggle(post._id, post.isLiked)}>
                                                <i className="material-symbols-outlined mat-icon">
                                                    {post.likes?.some((like) => like.userId === user._id) ? "favorite" : "favorite_border"}
                                                </i>
                                                {post.likes?.some((like) => like.userId === user._id) ? "Liked" : "Like"} {post.likeCount}
                                                <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                    <ul className="d-flex align-items-center justify-content-center">
                                                        {post.likes?.slice(0, 3).map((like) => (
                                                            <li key={like.userId}>
                                                                <img
                                                                    src={like.user?.profilePicture || "../assets/images/navbar/picture.png"}
                                                                    alt="User Avatar"
                                                                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                                                />
                                                            </li>
                                                        ))}
                                                        {post.likes?.length > 3 && (
                                                            <li>
                                                                <span className="mdtxt d-center">+{post.likes.length - 3}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </button> */}
                                            <button className="d-center gap-1 gap-sm-2 mdtxt" data-bs-toggle="modal" data-bs-target="#activityModComment"
                                                onClick={() => handleOpenModal(post._id)}>
                                                <i className="material-symbols-outlined mat-icon"> chat </i>
                                                Comment {post.commentCount}
                                            </button>
                                            {/* {!post.isRePost && ( */}
                                            {!post.isRePost && post.user._id !== user._id && (
                                                <button className="d-center gap-1 gap-sm-2 mdtxt" data-bs-toggle="modal" data-bs-target="#activityModRepost"
                                                    onClick={() => handleRepost(post?._id, post)}
                                                >
                                                    <i className="material-symbols-outlined mat-icon"> repeat </i>
                                                    Repost {post.repostCount}
                                                </button>
                                            )}
                                            <button className="d-center gap-1 gap-sm-2 mdtxt">
                                                <i className="material-symbols-outlined mat-icon"> share </i>
                                                Share 0
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {loading && <p>Loading more posts...</p>}
                                {!hasMore && <p>No more posts available</p>}
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
                                            {/* <div className=" mb-4">
                                                <h6 className="d-inline-flex position-relative"></h6>
                                            </div> */}
                                            <div className="d-grid gap-6">
                                                <div className="single-single">
                                                    <div className="profile-pic d-flex gap-3">
                                                        <div className="avatar">
                                                            <img
                                                                className="avatar-img max-un"
                                                                src="../assets/images/navbar/event-img-5.png"
                                                                style={{ width: "250px", height: "200px" }} alt="avatar" />
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
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }}
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
                </div >
            </main >
            {/* <ToastContainer /> */}
            <div className="go-live-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="goLiveMod">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="top-content pb-5">
                                            <h5>Add Post Photo</h5>
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#"><img src="../assets/images/add-post-avatar.png" className="max-un" alt="icon" /></a>
                                                </div>
                                                <textarea cols="10" rows="1" placeholder="Write something to Lerio.."></textarea>
                                            </div>
                                            <div className="file-upload">
                                                <label>Upload attachment</label>
                                                <label className="file mt-1">
                                                    <input type="file" />
                                                    <span className="file-custom pt-8 pb-8 d-grid text-center">
                                                        <i className="material-symbols-outlined mat-icon"> perm_media </i>
                                                        <span>Drag here or click to upload photo.</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="footer-area pt-5">
                                            <div className="btn-area d-flex justify-content-end gap-2">
                                                <button type="button" className="cmn-btn alt" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                <button className="cmn-btn">Post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="go-live-popup video-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="photoVideoMod">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="top-content pb-5">
                                            <h5>Add Post Photo/Video</h5><hr />
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#">
                                                        <img src={user.profilePicture || "../assets/images/add-post-avatar.png"}
                                                            className="max-un" alt="icon"
                                                            style={{ width: "40px", height: "40px", borderRadius: "30px" }} />
                                                    </a>
                                                </div>
                                                <input
                                                    className="mb-2"
                                                    name="content"
                                                    cols="10"
                                                    rows="1"
                                                    placeholder={`Write something to ${user.userName || "user"}...`}
                                                    value={postContent}
                                                    onChange={(e) => setPostContent(e.target.value)}
                                                    style={{
                                                        borderRadius: "50px",
                                                        height: "40px",
                                                    }}
                                                >
                                                </input>
                                            </div>
                                            <div className="file-upload mb-2">
                                                <label>Upload attachment</label>
                                                <label className="file mt-1">
                                                    <input type="file" accept="image/*,video/*" name="media" multiple onChange={handleFileChange} />
                                                    <span className="file-custom pt-8 pb-8 d-grid text-center">
                                                        <i className="material-symbols-outlined mat-icon"> perm_media </i>
                                                        <span>Drag here or click to upload files.</span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="emoji-pickeradd mb-4" style={{ marginTop: "10px", }}>
                                                <EmojiPicker
                                                    onEmojiClick={handleEmojiClick}
                                                    style={{
                                                        height: "450px",
                                                        width: "100%",
                                                        marginTop: "10px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="footer-area pt-5">
                                            <div className="btn-area d-flex justify-content-end gap-2">
                                                <button type="button"
                                                    className="cmn-btn alt"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    style={{ borderRadius: "50px", }}
                                                >
                                                    Cancel
                                                </button>
                                                <button className="cmn-btn" onClick={handlePostSubmit} style={{ borderRadius: "50px", }}>Post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="go-live-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="activityModEmoji">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={closeModal}
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <i className="material-symbols-outlined mat-icon xxltxt">close</i>
                                            </button>
                                        </div>
                                        <div className="top-content pb-5">
                                            <h5>Add Post Filling/Emoji</h5><hr />
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#">
                                                        <img
                                                            src={user.profilePicture || "assets/images/add-post-avatar.png"}
                                                            className="max-un"
                                                            alt="icon"
                                                            style={{ width: "40px", height: "40px", borderRadius: "30px" }}
                                                        />
                                                    </a>
                                                </div>
                                                <input
                                                    className="mb-2"
                                                    name="content"
                                                    cols="10"
                                                    rows="1"
                                                    placeholder={`Whats your mood ${user.userName || "user"}...`}
                                                    value={postContent}
                                                    onChange={(e) => setPostContent(e.target.value)}
                                                    style={{
                                                        borderRadius: "50px",
                                                        height: "40px",
                                                    }}
                                                ></input>
                                            </div>
                                            <div className="emoji-pickeradd mb-4" style={{ marginTop: "10px", }}>
                                                <EmojiPicker
                                                    onEmojiClick={handleEmojiClick}
                                                    style={{
                                                        height: "450px",
                                                        width: "100%",
                                                        marginTop: "10px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="footer-area pt-5">
                                            <div className="btn-area d-flex justify-content-end gap-2">
                                                <button
                                                    type="button"
                                                    className="cmn-btn alt"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    style={{ borderRadius: "50px" }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="cmn-btn"
                                                    onClick={handlePostSubmit}
                                                    style={{ borderRadius: "50px" }}
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .comment-user-name {
                        font-family: 'Poppins', sans-serif;
                        font-weight: 500;
                        font-size: 12px;
                        line-height: 18px;
                        margin: 0;
                        margin-bottom: 0.5rem;
                    }
                    .comment-user-name a {
                        text-decoration: none;
                        color: inherit;
                    }                   
                    @media (max-width: 425px) {
                        .dropdown-menu {
                            position: absolute !important;
                            right: 10px !important;
                            left: auto !important;
                            min-width: 100px !important;
                            max-width: 85vw !important;
                            white-space: nowrap;
                            z-index: 9999;
                        }
                        .dropdown-btn {
                            margin-left: 0 !important;
                        }
                    }
                    @media (max-width: 425px) {
                        .modal-content {
                            width: 95vw !important;
                            max-width: 95vw !important;
                            padding: 10px !important;
                        }
                        .comments-list {
                            max-width: 95vw !important;
                            padding-right: 0 !important;
                        }
                        .info-item {
                            max-width: 100% !important;
                            overflow-wrap: break-word;
                            word-wrap: break-word;
                            white-space: normal;
                        }
                        textarea {
                            width: 100% !important;
                            max-width: 95vw !important;
                        }
                    }
                    @media (max-width: 768px) {
                        img, video {
                            max-width: 90% !important;
                            height: auto !important;
                            display: block;
                            margin: auto;
                            border-radius: 5px;
                        }
                        textarea {
                            width: 100% !important;
                            max-width: 95vw !important;
                        }
                    }  
                    @media (max-width: 425px) {
                        img, video {
                            max-width: 100% !important;
                            height: auto !important;
                            display: block;
                            margin: auto;
                            border-radius: 5px;
                        }
                    }                                    
                    // @media (max-width: 768px) {
                    //     .emoji-pickeredit {
                    //         width: 100% !important;
                    //         max-width: 500px !important;
                    //     }
                    // }
                    // @media (max-width: 425px) {
                    //     .emoji-pickeredit {
                    //         width: 100% !important;
                    //         max-width: 300px !important;
                    //     }
                    // }
                    // @media (max-width: 375px) {
                    //     .emoji-pickeredit {
                    //         width: 100% !important;
                    //         max-width: 200px !important;
                    //     }
                    // }
                    // @media (max-width: 320px) {
                    //     .emoji-pickeredit {
                    //         width: 100% !important;
                    //         max-width: 200px !important;
                    //     }
                    // }


                    @media (max-width: 768px) {
                        .emoji-pickeredit {
                            width: 100% !important;
                            max-width: 500px !important;
                        }
                    }

                    @media (max-width: 425px) {
                        .emoji-pickeredit {
                            width: 100% !important;
                            max-width: 300px !important;
                        }
                    }

                    @media (max-width: 375px) {
                        .emoji-pickeredit {
                            width: 100% !important;
                            max-width: 200px !important;
                        }
                    }

                    @media (max-width: 320px) {
                        .emoji-pickeredit {
                            width: 100% !important;
                            max-width: 200px !important;
                        }
                    }
                    // @media (max-width: 320px) {
                    //     .emoji-pickeredit {
                    //         width:100px !important;
                    //     }
                    // }
                   
                    // @media (max-width: 320px) {
                    //     .emoji-pickeradd {
                    //         max-width:90vw;
                    //     }
                    // }
                    // @media (max-width: 425px) {
                    //     .mdtxt {
                    //         font-size: 14px;
                    //         line-height: 1.4;
                    //     }
                    //     .py-2 {
                    //         display: flex;
                    //         flex-direction: column;
                    //     }
                    //     .py-2 p {
                    //         margin-bottom: 0;
                    //     }
                    //     .py-2 span {
                    //         font-size: 14px;
                    //     }
                    // }                
                `}
            </style>
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
                                            <div className="comments-list"
                                                style={{
                                                    // overflowY: "auto",
                                                    // maxHeight: "750px",
                                                    // paddingRight: "10px",
                                                }}>
                                                {comments.filter((comment) => comment.postId === activePostId).map((comment) => (
                                                    <div key={comment._id} className="comments-area">
                                                        <div className="single-comment-area ms-1">
                                                            <div className="parent-comment d-flex gap-3">
                                                                <img
                                                                    className="avatar-img"
                                                                    src={comment.user.profilePicture || "../assets/images/navbar/picture.png"}
                                                                    alt="avatar"
                                                                    style={{ borderRadius: "50%", width: "40px", marginTop: "10px", height: "40px", }}
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
                                                                                ? comment.content
                                                                                : comment.content.split(" ").slice(0, 50).join(" ")}

                                                                        </p>
                                                                        {comment.content.split(" ").length > 50 && (
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
            <div className="go-live-popup video-popup">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="modal cmn-modal fade" id="activityModRepost">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="d-flex top-content pb-5 gap-3">
                                            <div className="profile-box">
                                                <a href="#"><img src={user.profilePicture || "../assets/images/add-post-avatar.png"} className="max-un" alt="icon" style={{ width: "40px", borderRadius: "30px" }} /></a>
                                            </div>
                                            <div className="profile-box">
                                                <h6 className="m-0">{user.userName}</h6>
                                                <span className="mdtxt status">@{user.userName}</span>
                                            </div>
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <input
                                                    placeholder="Add your thoughts optional"
                                                    value={postContentNew}
                                                    onChange={(e) => setPostContentNew(e.target.value)}
                                                    style={{
                                                        borderRadius: "50px",
                                                        height: "50%",
                                                    }}
                                                >
                                                </input>
                                            </div>
                                            <div className="d-flex top-content pb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#"><img src={repost.profilePicture || "../assets/images/add-post-avatar.png"} className="max-un" alt="icon" style={{ width: "40px", borderRadius: "30px" }} /></a>
                                                </div>
                                                <div className="profile-box">
                                                    <h6 className="m-0">{repost.userName}</h6>
                                                    <span className="mdtxt status">@{repost.userName}</span>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <p className="description">{postContent}</p>
                                            </div>
                                            <div className="file-upload">
                                                {uploadedFiles.length > 0 && (
                                                    <div className="media-preview mt-3">
                                                        <div className="media-container d-flex flex-wrap">
                                                            {uploadedFiles.map((file, index) => (
                                                                <div key={index} className="media-item me-2 mb-2">
                                                                    {file.type === "photos" && (
                                                                        <img
                                                                            src={file.url}
                                                                            alt="existing-media"
                                                                            className="img-thumbnail"
                                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                        />
                                                                    )}

                                                                    {file.type === "video" && (
                                                                        <video
                                                                            controls
                                                                            width="100%"
                                                                            height="100%"
                                                                            style={{ objectFit: "cover" }}
                                                                        >
                                                                            <source src={file.url} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="emoji-picker-container">
                                                <div className="emoji-picker-modal">
                                                    < EmojiPicker onEmojiClick={handleEmojiClick} style={{
                                                        height: "450px",
                                                        width: window.innerWidth > 768 ? "510px" : "100%",
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer-area pt-5">
                                            <div className="btn-area d-flex justify-content-end gap-2">
                                                <button type="button" className="cmn-btn alt" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: "50px", }}>Cancel</button>
                                                <button className="cmn-btn" onClick={handleRepostSubmit} style={{ borderRadius: "50px", }}>Post</button>
                                            </div>
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
export default SocialMedia;