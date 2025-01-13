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

function SocialMedia() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");
    const [postContent, setPostContent] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [posts, setPosts] = useState([]);
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

    useEffect(() => {
        getAllPost();
        getAllSuggest();
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
    }, [isModalOpen]);


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
        // if (!postContent && uploadedFiles.length === 0) {
        //     toast.error("Please add some content or upload a file.");
        //     return;
        // }

        const formData = new FormData();
        formData.append("content", postContent);
        uploadedFiles.forEach((file) => {
            formData.append("media", file);
        });
        //setIsModalOpen(true);
        try {
            const response = await networkRequest("post", API_ENDPOINTS.POST_CREATE, formData);
            if (response.statusCode === 201) {
                toast.success("Post created successfully!");
                setPostContent("");
                setUploadedFiles([]);
                getAllPost();
                closeModal();
                window.location.reload();
            } else {
                toast.error(response.message || "Failed to create post.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            //toast.error("An error occurred. Please try again.");
        }
    };

    const getAllPost = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {});
            if (response.statusCode === 200) {
                const postsData = response.data.postList;
                const updatedPosts = postsData.map((post) => ({
                    ...post,
                    user: {
                        ...post.user,
                        isFollowed: post.user.isFollowed || false,
                    },
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


    // async function getAllPost() {
    //     const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {});
    //     if (response.statusCode === 200) {
    //         setPosts(response.data.postList);

    //         const followedUserIds = response.data.postList
    //             .filter(post => post.user.isFollowed)
    //             .map(post => post.user._id);
    //         setFollowedPosts(followedUserIds);
    //     }
    // }

    const isValidImageUrl = (url) => {
        return (url && url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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

    // const handlePostFollowToggle = async (userId) => {
    //     try {
    //         if (followedPosts.includes(userId)) {
    //             const response = await networkRequest("delete", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
    //             if (response.statusCode === 201) {
    //                 console.log("Unfollowed successfully!");
    //                 setFollowedPosts((prevFollowedPosts) =>
    //                     prevFollowedPosts.filter((id) => id !== userId)
    //                 );
    //             } else {
    //                 console.error("Failed to unfollow");
    //             }
    //         } else {
    //             const response = await networkRequest("post", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
    //             if (response.statusCode === 201) {
    //                 console.log("Followed successfully!");
    //                 setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, userId]);
    //             } else {
    //                 console.error("Failed to follow");
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error in follow/unfollow operation:", error);
    //     }
    // };

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
                        isFollowed: !isCurrentlyFollowed  // Toggle the follow status locally
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

    // const handleFollow = async (userId) => {
    //     try {
    //         const response = await networkRequest("post", API_ENDPOINTS.POST_FOLLOW, { followedId: userId },);
    //         if (response.statusCode === 201) {
    //             console.log("Followed post successfully!");
    //             //setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, userId]);
    //             setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    //             if (!followedPosts.includes(userId)) {
    //                 setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, userId]);
    //             } else {
    //                 setFollowedPosts((prevFollowedPosts) => prevFollowedPosts.filter((id) => id !== userId));
    //             }
    //             //setIsFollowing(response.data.postList.isFollowed);
    //         } else {
    //             console.error("Failed to follow");
    //         }
    //     } catch (error) {
    //         console.error("Error following post:", error);
    //     }
    // };

    // const handleFollow = async (userId) => {
    //     try {
    //         if (followedUsers.includes(userId)) {
    //             const response = await networkRequest("delete", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
    //             if (response.statusCode === 200) {
    //                 console.log("Unfollowed successfully!");
    //                 setFollowedUsers((prevFollowedUsers) =>
    //                     prevFollowedUsers.filter((id) => id !== userId)
    //                 );
    //                 setFollowedPosts((prevFollowedPosts) =>
    //                     prevFollowedPosts.filter((id) => id !== userId)
    //                 );
    //             } else {
    //                 console.error("Failed to unfollow");
    //             }
    //         } else {
    //             const response = await networkRequest("post", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
    //             if (response.statusCode === 201) {
    //                 console.log("Followed successfully!");
    //                 setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    //                 setFollowedPosts((prevFollowedPosts) => [...prevFollowedPosts, userId]);
    //             } else {
    //                 console.error("Failed to follow");
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error in follow/unfollow operation:", error);
    //     }
    // };

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

    return (
        <>
            <main className="main-content">
                <div className="container sidebar-toggler">
                    <div className="row">
                        <SocialSidebar />
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
                            <Slider {...sliderSettings} className="story-carousel">
                                <div className="single-item">
                                    <div className="single-slide">
                                        <a href="/socialMedia" className="position-relative d-center">
                                            <img className="bg-img" src="assets/images/story-slider-owner.png" alt="icon" />
                                            <div className="abs-area d-grid p-3 position-absolute bottom-0">
                                                <div className="icon-box m-auto d-center mb-3">
                                                    <i className="material-symbols-outlined text-center mat-icon"> add </i>
                                                </div>
                                                <span className="mdtxt">Create A Story</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-1.png" alt="image" />
                                            <a href="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Billy_Williams.png" alt="image" />
                                                <span className="mdtxt">Alen Lio</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-2.png" alt="image" />
                                            <a href="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Justus_Everett.png" alt="image" />
                                                <span className="mdtxt">Josep</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-3.png" alt="image" />
                                            <a href="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/Julie Bates.png" alt="image" />
                                                <span className="mdtxt">Jessica</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-4.png" alt="image" />
                                            <a href="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/avatar-4.png" alt="image" />
                                                <span className="mdtxt">Alen</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div className="single-slide">
                                        <div className="position-relative d-flex">
                                            <img className="bg-img" src="assets/images/story-slider-4.png" alt="image" />
                                            <a href="/socialMedia" className="abs-area p-3 position-absolute bottom-0">
                                                <img src="assets/images/avatar-5.png" alt="image" />
                                                <span className="mdtxt">Jacob Jones</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                            <div className="share-post d-flex gap-3 gap-sm-5 p-3 p-sm-5">
                                <div className="profile-box">
                                    <a href="#"><img className="avatar-img max-un" src={user.profilePicture || "assets/images/navbar/picture.png"} alt="icon"
                                        style={{ borderRadius: "50px", width: "40px" }} />
                                    </a>
                                </div>
                                <form action="#" className="w-100 position-relative">
                                    <textarea
                                        name="content"
                                        cols="10"
                                        rows="1"
                                        placeholder="Write something to Lerio.."
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                        style={{
                                            borderRadius: "50px",
                                            height: "50%",
                                            //width: "100%",
                                            //padding: "10px",
                                            //resize: "none",
                                            //border: "1px solid #ccc",
                                        }}
                                    ></textarea>
                                    {/* <div className="abs-area position-absolute d-none d-sm-block">
                                        <i className="material-symbols-outlined mat-icon xxltxt"> sentiment_satisfied </i>
                                    </div> */}
                                    <ul className="d-flex justify-content-between flex-wrap mt-3 gap-3">
                                        <li className="d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#photoVideoMod">
                                            <img src="assets/images/socialsidebar/galleryicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span>Photo/Video</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#activityMod">
                                            <img src="assets/images/socialsidebar/emojiicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span>GIF/Emoji</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#activityMod">
                                            <img src="assets/images/socialsidebar/pollicon.png" className="max-un" alt="icon" style={{ width: "25px" }} />
                                            <span>Poll</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-2">
                                            <button onClick={handlePostSubmit} className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#9A00A9" }}>Post</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                {posts.map((post) => (
                                    <div key={post._id} className="post-single-box p-3 p-sm-5">
                                        <div className="top-area pb-5">
                                            <div className="profile-area d-center justify-content-between">
                                                <div className="avatar-item d-flex gap-3 align-items-center">
                                                    <div className="position-relative">
                                                        <img className="avatar-img max-un" src={post.user.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                                                    </div>
                                                    <div className="info-area">
                                                        <h6 className="m-0"><a href="public-profile-post.html">{post.user.userName}</a></h6>
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
                                                        // <button
                                                        //     className="cmn-btn me-3"
                                                        //     style={{
                                                        //         borderRadius: "50px",
                                                        //         backgroundColor: followedPosts.includes(post.user._id) ? "#D0F0E8" : "#F5E6F6",
                                                        //         color: followedPosts.includes(post.user._id) ? "#007B5F" : "#9A00A9",
                                                        //     }}
                                                        //     onClick={() => handlePostFollowToggle(post.user._id)}
                                                        //     onMouseEnter={(e) => {
                                                        //         if (followedPosts.includes(post.user._id)) {
                                                        //             e.target.textContent = "Unfollow";
                                                        //         }
                                                        //     }}
                                                        //     onMouseLeave={(e) => {
                                                        //         if (followedPosts.includes(post.user._id)) {
                                                        //             e.target.textContent = "Following";
                                                        //         }
                                                        //     }}
                                                        // >
                                                        //     {followedPosts.includes(post.user._id) ? "Following" : "Follow"}
                                                        // </button>
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
                                                        className={`dropdown-menu p-4 pt-2 ${openDropdown === post._id ? "show fade-in" : ""}`}
                                                        style={{
                                                            display: openDropdown === post._id ? "block" : "none",
                                                        }}
                                                    >
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
                                                <p className="description">{post.content}</p>
                                            </div>
                                            <div className="post-img">
                                                {post.media && post.media[0] && post.media[0].type === "photos" && (
                                                    <img src={post.media[0].url} className="w-100" alt="image" style={{ width: "100%", height: "315px" }} />
                                                )}
                                                {post.media && post.media[0] && post.media[0].type === "video" && (
                                                    <div className="post-img video-item">
                                                        <video
                                                            controls
                                                            width="100%"
                                                            height="315"
                                                        >
                                                            <source src={post.media[0].url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="total-react-share pb-0 d-center gap-2 flex-wrap justify-content-between">
                                            <div className="friends-list d-flex gap-3 align-items-center text-center">
                                                <ul className="d-flex align-items-center justify-content-center">
                                                    <li><img src="assets/images/avatar-2.png" alt="image" /></li>
                                                    <li><img src="assets/images/avatar-3.png" alt="image" /></li>
                                                    <li><img src="assets/images/avatar-4.png" alt="image" /></li>
                                                    <li><span className="mdtxt d-center">8+</span></li>
                                                </ul>
                                            </div>
                                            <button className="mdtxt">{post.commentCount} Comments</button>
                                            <button className="mdtxt">{post.repostCount} Shares</button>
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
                                                    <a href="#"><img src={user.profilePicture || "assets/images/navbar/picture.png"} className="max-un" alt="icon" style={{ borderRadius: "50px", width: "40px" }} /></a>
                                                </div>
                                                <div className="form-content input-area py-1 d-flex gap-2 align-items-center w-100" style={{ borderRadius: "50px", }}>
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
                                                    <button className="cmn-btn px-2 px-sm-5 px-lg-6" style={{ borderRadius: "50px", }}>
                                                        <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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
                                                    <span className="mdtxt status">Now 22, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn me-3" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
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

                                        <button className="mdtxt">4 Comments</button>
                                        <button className="mdtxt">1 Shares</button>
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
                                    <div className="comments-area mt-5">
                                        <div className="single-comment-area ms-1 ms-xxl-15">
                                            <div className="parent-comment d-flex gap-2 gap-sm-4">
                                                <div className="avatar-item d-center align-items-baseline">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-3.png" alt="avatar" />
                                                </div>
                                                <div className="info-item">
                                                    <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                        <div className="title-area">
                                                            <h6 className="m-0 mb-3"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                            <p className="mdtxt">The only way to solve the problem is to code for the hardware directly</p>
                                                        </div>
                                                        <div className="btn-group dropend cus-dropdown">
                                                            <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                            </button>
                                                            <ul className="dropdown-menu p-4 pt-2">
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                        <span>Hide Comments</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                        <span>Report Comments</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <ul className="like-share d-flex gap-6 mt-2">
                                                        <li className="d-center">
                                                            <button className="mdtxt">Like</button>
                                                        </li>
                                                        <li className="d-center flex-column">
                                                            <button className="mdtxt reply-btn">Reply</button>
                                                        </li>
                                                        <li className="d-center">
                                                            <button className="mdtxt">Share</button>
                                                        </li>
                                                    </ul>
                                                    <form action="#" className="comment-form">
                                                        <div className="d-flex gap-3">
                                                            <input placeholder="Write a comment.." className="py-3" />
                                                            <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                                <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="single-comment-area comment-item-nested mt-4 mt-sm-7 ms-13 ms-sm-15">
                                                <div className="d-flex gap-2 gap-sm-4 align-items-baseline">
                                                    <div className="avatar-item">
                                                        <img className="avatar-img max-un" src="assets/images/avatar-4.png" alt="avatar" />
                                                    </div>
                                                    <div className="info-item">
                                                        <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                            <div className="title-area">
                                                                <h6 className="m-0 mb-3"><a href="public-profile-post.html">Alex</a></h6>
                                                                <p className="mdtxt">The only way to solve the</p>
                                                            </div>
                                                            <div className="btn-group dropend cus-dropdown">
                                                                <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                                </button>
                                                                <ul className="dropdown-menu p-4 pt-2">
                                                                    <li>
                                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                            <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                            <span>Hide Comments</span>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                            <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                            <span>Report Comments</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <ul className="like-share d-flex gap-6 mt-2">
                                                            <li className="d-center">
                                                                <button className="mdtxt">Like</button>
                                                            </li>
                                                            <li className="d-center flex-column">
                                                                <button className="mdtxt reply-btn">Reply</button>
                                                            </li>
                                                            <li className="d-center">
                                                                <button className="mdtxt">Share</button>
                                                            </li>
                                                        </ul>
                                                        <form action="#" className="comment-form">
                                                            <div className="d-flex gap-3">
                                                                <input placeholder="Write a comment.." className="py-3" />
                                                                <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                                    <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-single-box p-3 p-sm-5">
                                    <div className="top-area pb-5">
                                        <div className="profile-area d-center justify-content-between">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="avatar-item">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-5.png" alt="avatar" />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="public-profile-post.html">Loprayos</a></h6>
                                                    <span className="mdtxt status">Now 27, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn me-3" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Following</button>
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
                                            <p className="description">Nam ornare a nibh id sagittis. Vestibulum nec molestie urna, eget convallis mi. Vestibulum rhoncus ligula eget sem sollicitudin interdum. Aliquam massa lectus, fringilla non diam ut, laoreet convallis risus. Curabitur at metus imperdiet, pellentesque ligula vel,</p>
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
                                        <button className="mdtxt">4 Comments</button>
                                        <button className="mdtxt">1 Shares</button>
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
                                    <div className="comments-area mt-5">
                                        <div className="single-comment-area ms-1 ms-xxl-15">
                                            <div className="parent-comment d-flex gap-2 gap-sm-4">
                                                <div className="avatar-item d-center align-items-baseline">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-3.png" alt="avatar" />
                                                </div>
                                                <div className="info-item active">
                                                    <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                        <div className="title-area">
                                                            <h6 className="m-0 mb-3"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                            <p className="mdtxt">The only way to solve the problem is to code for the hardware directly</p>
                                                        </div>
                                                        <div className="btn-group dropend cus-dropdown">
                                                            <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                            </button>
                                                            <ul className="dropdown-menu p-4 pt-2">
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                        <span>Hide Comments</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                        <span>Report Comments</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <ul className="like-share d-flex gap-6 mt-2">
                                                        <li className="d-center">
                                                            <button className="mdtxt">Like</button>
                                                        </li>
                                                        <li className="d-center flex-column">
                                                            <button className="mdtxt reply-btn">Reply</button>
                                                        </li>
                                                        <li className="d-center">
                                                            <button className="mdtxt">Share</button>
                                                        </li>
                                                    </ul>
                                                    <form action="#" className="comment-form">
                                                        <div className="d-flex gap-3">
                                                            <input placeholder="Write a comment.." className="py-3" />
                                                            <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                                <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comments-area mt-5">
                                        <div className="single-comment-area ms-1 ms-xxl-15">
                                            <div className="d-flex gap-4">
                                                <div className="avatar-item d-center align-items-baseline">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-3.png" alt="avatar" />
                                                </div>
                                                <div className="info-item w-100">
                                                    <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
                                                        <div className="title-area">
                                                            <h6 className="m-0 mb-3"><a href="public-profile-post.html">Marlio</a></h6>
                                                            <div className="post-img">
                                                                <img src="assets/images/icon/emoji-love-2.png" alt="icon" style={{ width: "50px" }} />
                                                            </div>
                                                        </div>
                                                        <div className="btn-group dropend cus-dropdown">
                                                            <button type="button" className="dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                            </button>
                                                            <ul className="dropdown-menu p-4 pt-2">
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> hide_source </i>
                                                                        <span>Hide Comments</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="droplist d-flex align-items-center gap-2" href="#">
                                                                        <i className="material-symbols-outlined mat-icon"> flag </i>
                                                                        <span>Report Comments</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <ul className="like-share d-flex gap-6 mt-2">
                                                        <li className="d-center">
                                                            <button className="mdtxt">Like</button>
                                                        </li>
                                                        <li className="d-center flex-column">
                                                            <button className="mdtxt reply-btn">Reply</button>
                                                        </li>
                                                        <li className="d-center">
                                                            <button className="mdtxt">Share</button>
                                                        </li>
                                                    </ul>
                                                    <form action="#" className="comment-form">
                                                        <div className="d-flex gap-3">
                                                            <input placeholder="Write a comment.." className="py-3" />
                                                            <button className="cmn-btn px-2 px-sm-5 px-lg-6">
                                                                <i className="material-symbols-outlined mat-icon m-0 fs-xxl"> near_me </i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-single-box p-3 p-sm-5">
                                    <div className="top-area pb-5">
                                        <div className="profile-area d-center justify-content-between">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="avatar position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-1.png" alt="avatar" />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                    <span className="mdtxt status">Now 29, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn me-3" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Following</button>
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
                                            <p className="description">My Travel Video</p>
                                            <p className="hastag d-flex gap-2">
                                                <a href="#">#Viral</a>
                                                <a href="#">#travel</a>
                                            </p>
                                        </div>
                                        <div className="post-img video-item">
                                            <div className="plyr__video-embed player">
                                                <iframe
                                                    src="https://www.youtube.com/embed/LXb3EKWsInQ"
                                                    allow="autoplay; fullscreen"
                                                    allowFullScreen
                                                    title="Travel Video"
                                                    width="100%"
                                                    height="315"
                                                ></iframe>
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
                                        <button className="mdtxt">4 Comments</button>
                                        <button className="mdtxt">1 Shares</button>
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
                                                <div className="avatar position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/avatar-1.png" alt="avatar" />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="public-profile-post.html">Lori Cortez</a></h6>
                                                    <span className="mdtxt status">Dec 3, 2024</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn me-3" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Following</button>
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
                                                <li><span className="mdtxt d-center">5+</span></li>
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
            <ToastContainer />

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
                                                    <a href="#"><img src="assets/images/add-post-avatar.png" className="max-un" alt="icon" /></a>
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
                            {/* <div className="modal cmn-modal fade" id="photoVideoMod" tabIndex="-1" aria-hidden="true"> */}
                            <div className={`modal cmn-modal ${isModalOpen ? "fade show" : "fade"}`}
                                id="photoVideoMod"
                                tabIndex="-1"
                                style={{ display: isModalOpen ? 'block' : 'none' }}
                                aria-hidden={!isModalOpen}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="top-content pb-5">
                                            <h5>Add Post Photo/Video</h5>
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#"><img src={user.profilePicture || "assets/images/add-post-avatar.png"} className="max-un" alt="icon" style={{ width: "40px", borderRadius: "30px" }} /></a>
                                                </div>
                                                <textarea
                                                    cols="10"
                                                    rows="1"
                                                    placeholder="Write something to Lerio.."
                                                    value={postContent}
                                                    onChange={(e) => setPostContent(e.target.value)}
                                                    style={{
                                                        borderRadius: "50px",
                                                        height: "100%",
                                                        //width: "100%",
                                                    }}
                                                >
                                                </textarea>
                                            </div>
                                            <div className="file-upload">
                                                <label>Upload attachment</label>
                                                <label className="file mt-1">
                                                    <input type="file" accept="image/*,video/*" name="media" multiple onChange={handleFileChange} />
                                                    <span className="file-custom pt-8 pb-8 d-grid text-center">
                                                        <i className="material-symbols-outlined mat-icon"> perm_media </i>
                                                        <span>Drag here or click to upload files.</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="footer-area pt-5">
                                            <div className="btn-area d-flex justify-content-end gap-2">
                                                <button type="button" className="cmn-btn alt" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: "50px", }}>Cancel</button>
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
                            <div className="modal cmn-modal fade" id="activityMod">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content p-5">
                                        <div className="modal-header justify-content-center">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                                            </button>
                                        </div>
                                        <div className="top-content pb-5">
                                            <h5>Create post</h5>
                                        </div>
                                        <div className="mid-area">
                                            <div className="d-flex mb-5 gap-3">
                                                <div className="profile-box">
                                                    <a href="#"><img src="assets/images/add-post-avatar.png" className="max-un" alt="icon" /></a>
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
                                            <div className="tooltips-area d-flex mt-3 gap-2">
                                                <button type="button" className="btn d-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Fallings/Activity">
                                                    <i className="material-symbols-outlined mat-icon"> mood </i>
                                                </button>
                                                <button type="button" className="btn d-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Video">
                                                    <i className="material-symbols-outlined mat-icon"> movie </i>
                                                </button>
                                                <button type="button" className="btn d-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Maps">
                                                    <i className="material-symbols-outlined mat-icon"> location_on </i>
                                                </button>
                                                <button type="button" className="btn d-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Tag">
                                                    <i className="material-symbols-outlined mat-icon"> sell </i>
                                                </button>
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

        </>
    );
}
export default SocialMedia;