import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import SocialSidebar from "./SocialSidebar";
import EmojiPicker from "emoji-picker-react";

const Profile = () => {
  const token = localStorage.getItem("token");
  //const user = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [suggestList, setSuggestList] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

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
    getAllSuggest();
    getAllPost();
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const defaultAvatar = "assets/images/avatar-14.png";
  const defaultCover = "assets/images/profile-edit-cover.png";
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [previewCover, setPreviewCover] = useState(defaultCover);
  const [previewAvatar, setPreviewAvatar] = useState(user.profilePicture || defaultAvatar);

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewCover(reader.result);
      };
      reader.readAsDataURL(file);
      setCoverPhoto(file);
    }
  };

  const handleAvatarPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarPhoto(file);
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

  const [posts, setPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (emojiObject) => {
    setPostContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
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
      const response = await networkRequest("POST", API_ENDPOINTS.POST_CREATE, formData);
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

  // const getAllPost = async () => {
  //   try {
  //     const response = await networkRequest("GET", API_ENDPOINTS.GET_POSTLIST, {}, {}, { userId: user._id });
  //     if (response.statusCode === 200) {
  //       console.log("response", response)
  //       const postsData = response.data.postList;
  //       const updatedPosts = postsData.map((post) => ({
  //         ...post,
  //         user: {
  //           ...post?.user,
  //           isFollowed: post?.user.isFollowed || false,
  //         },
  //         likeCount: post?.likeCount || 0,
  //         isLiked: post?.isLiked || false,
  //       }));
  //       setPosts(updatedPosts);
  //       const followedUserIds = updatedPosts
  //         .filter(post => post?.user.isFollowed)
  //         .map(post => post?.user._id);
  //       setFollowedPosts(followedUserIds);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };

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

  // const handleDropdownToggle = (postId) => {
  //   setOpenDropdown((prev) => (prev === postId ? null : postId));
  // };

  const handlePostFollowToggle = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post?._id === postId) {
        const isCurrentlyFollowed = post?.user.isFollowed;
        if (isCurrentlyFollowed) {
          unfollowUser(post?.user._id);
        } else {
          followUser(post?.user._id);
        }
        //return { ...post, isFollowed: !isCurrentlyFollowed };
        return {
          ...post,
          user: {
            ...post?.user,
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
  const handleFollowToggle1 = async (userId) => {
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
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showEmojiPickerAdd, setShowEmojiPickerAdd] = useState(false);

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };
  const handleOpenModal = (postId) => {
    setActivePostId(postId);
    fetchComments(postId);
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
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const [expandedComments, setExpandedComments] = useState({});
  const handleToggleExpand = (commentId) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = (e) => { };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", selectedPost._id);
    formData.append("content", postContent);
    uploadedFiles.forEach((file) => {
      formData.append("media", file);
    });
    try {
      const response = await networkRequest("PATCH", `${API_ENDPOINTS.UPDATE_POST}`, formData);
      if (response.statusCode === 201) {
        //toast.success("post updated successfully!");
        setPostContent("");
        setUploadedFiles([]);
        getAllPost();
        closeModal();
        window.location.reload();
      } else {
        toast.error(response.message || "Failed to update post?.");
      }
    } catch (error) {
      console.error("Error update post:", error);
    }
  };

  const handleEditPost = async (postId, postData) => {
    setSelectedPost(postData);
    console.log("postId", postId);
    console.log("postData", postData);
    setPostContent(postData.content || "");
    setUploadedFiles(postData.media || []);
  };

  const [isPrivate, setIsPrivate] = useState(user.isPrivate || false);
  const handleToggle = async () => {
    const newValue = !isPrivate;
    setIsPrivate(newValue);
    try {
      const updatedUser = {
        userId: user._id,
        isPrivate: newValue,
        type: user.type,
      };
      const response = await networkRequest("PATCH", API_ENDPOINTS.UPDATE_USER, updatedUser);
      if (response.statusCode === 201) {
        const serverUpdatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(serverUpdatedUser));
        setUser(serverUpdatedUser);
        console.log("isPrivate updated successfully:", serverUpdatedUser);
      } else {
        console.error("update failed:", response);
        alert(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error update post:", error);
    }
  };

  const [pinError, setPinError] = useState("");
  const handlePinToggle = async (postId, isPinned) => {
    try {
      setPinError("");
      if (isPinned) {
        const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNPIN, { postId });
        if (response.statusCode === 201) {
          console.log("Unpin successful!");
          getAllPost();
        } else {
          console.error("Failed to unpin");
        }
      } else {
        const response = await networkRequest("POST", API_ENDPOINTS.POST_PIN, { postId });
        if (response.statusCode === 201) {
          console.log("Pin post created successfully!");
          getAllPost();
        } else if (response.statusCode === 409) {
          setPinError("You can only pin up to 3 posts.");
        } else {
          console.error("Failed to pin post");
        }
      }
    } catch (error) {
      if (error.statusCode === 409) {
        setPinError("You can only pin up to 3 posts.");
      } else {
        console.error("Error in pin/unpin operation:", error);
      }
    }
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (commentId) => {
    setActiveDropdown((prev) => (prev === commentId ? null : commentId));
  };

  const [editedMedia, setEditedMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaPreviewAdd, setMediaPreviewAdd] = useState(null);

  return (
    <>
      <main className="main-content">
        <ToastContainer />
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
                .textremove span {
                  display: none;
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
            .dropdown-menu {
              position: absolute;
              right: 10px;
              transform: translateY(0);
              z-index: 1000;
            }
            .change-cover-photo {
              display: inline-flex;
            }
            .cover-photo-text {
              display: inline;
            }
            @media (max-width: 320px) {
              .cover-photo-text {
                display: none;
              }
            }
            @media (max-width: 375px) {
              .cover-photo-text {
                display: none;
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
                      <div className="file-upload position-absolute p-4 bottom-0 end-0">
                        <label className="file text-start mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverPhotoChange}
                            style={{ display: "none" }}
                          />
                          <span className="cmn-btn d-center gap-1 change-cover-photo">
                            <i className="material-symbols-outlined mat-icon fs-2"> edit_note </i>
                            <span className="cover-photo-text">Change Cover Photo</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between align-items-start">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="avatar-item">
                          <img className="avatar-img1 max-un" src={previewAvatar} alt="avatar" />
                          <label className="avatar-upload">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarPhotoChange}
                              style={{ display: "none" }}
                            />
                            <i className="material-symbols-outlined cemeraphoto">photo_camera</i>
                          </label>
                        </div>
                        <div className="text-area text-start mt-5">
                          <h5 className="m-1 mb-1">{user.userName}</h5>
                          <div className="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
                            <span className="mdtxt d-center"></span>
                            <span className="mdtxt d-center">@{user.userName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="btn-item d-center gap-3">
                        {user.type === 'individual' ? (
                          <Link to="/individualsignup" className="cmn-btn d-center gap-1">
                            <i className="material-symbols-outlined mat-icon fs-4"> person_add </i>
                            <span className="cover-photo-text">Edit Profile</span>
                          </Link>
                        ) : (
                          <Link to="/individualsignup" className="cmn-btn d-center gap-1">
                            <i className="material-symbols-outlined mat-icon fs-4"> person_add </i>
                            <span className="cover-photo-text">Edit Profile</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="single-box p-3 p-sm-5">
                <div className="head-area text-start">
                  <h6>About Me</h6>
                  <span className="mdtxt">{user.bio}</span>
                  <hr />
                </div>
                <div className="d-flex" style={{ gap: '5%' }}>
                  <div className="head-area text-start">
                    <h6>Joined</h6>
                  </div>
                  <div className="head-area text-start">
                    <h6>Mobile No</h6>
                    <span className="mdtxt">{user?.phoneNumber}</span>
                  </div>
                  {user.type === 'individual' ? (
                    <div className="head-area text-start">
                      <h6>DOB</h6>
                      {user?.dateOfBirth && <span className="mdtxt">{new Date(user?.dateOfBirth)?.toISOString().split('T')[0]}</span>}
                    </div>
                  ) : (
                    <div className="head-area text-end">
                      <h6>Operating Hours</h6>
                      <span className="mdtxt">{user?.operatingHours}</span>
                    </div>
                  )}
                </div>
                <hr />
                <div className="head-area text-start">
                  <h6>Location</h6>
                  <span className="mdtxt">{user?.location}</span>
                </div>
                {user?.type === 'business' && (
                  <div className="head-area mt-1 text-start">
                    <h6>Category</h6>
                    <span className="mdtxt">{user?.businessCategory}</span>
                  </div>
                )}
                <hr />
                <div className="head-area text-start d-flex" style={{ gap: '5%' }}>
                  <span>{user?.followingCount} Following</span>
                  <span>{user?.followersCount} Followers</span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="single-box p-3 p-sm-5">
                    <div className="head-area text-start">
                      <h6>Social Links</h6>
                    </div>
                    <hr />
                    <div className="profile-area d-center justify-content-between">
                      <div className="avatar-item d-flex" style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}>
                        {user?.socialLinks?.map((link, index) => {
                          const logoMap = {
                            Google: "assets/images/sociallink/google.png",
                            LinkedIn: "assets/images/sociallink/linkedin.png",
                            Facebook: "assets/images/sociallink/facebook.png",
                            "Website Link": "assets/images/sociallink/website.png",
                            X: "assets/images/sociallink/x.png",
                            "WhatsApp API": "assets/images/sociallink/whatsapp.png",
                            Instagram: "assets/images/sociallink/instagram.png",
                            TikTok: "assets/images/sociallink/tiktok.png",
                            Snapchat: "assets/images/sociallink/snapchat.png",
                            YouTube: "assets/images/sociallink/youtube.png",
                            Threads: "assets/images/sociallink/threads.png",
                            Rumble: "assets/images/sociallink/rumble.png",
                            Parler: "assets/images/sociallink/parler.png",
                            Reddit: "assets/images/sociallink/reddit.png",
                            Discord: "assets/images/sociallink/discord.png",
                            "Truth Social": "assets/images/sociallink/truthsocial.png",
                            Gettr: "assets/images/sociallink/Gettr.png",
                            Mastodon: "assets/images/sociallink/Mastodon.png",
                            BeReal: "assets/images/sociallink/BeReal.png",
                            Telegram: "assets/images/sociallink/telegram.png",
                            Pinterest: "assets/images/sociallink/pinterest.png",
                          };
                          const logoSrc = logoMap[link.logoName] || "assets/images/sociallink/default.png";

                          return (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={index}
                              className="me-3"
                            >
                              <img
                                className="avatar-img max-un"
                                src={logoSrc}
                                alt={link.logoName}
                                style={{
                                  borderRadius: "50px",
                                  height: "40px",
                                  width: "40px",
                                }}
                              />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <SocialSidebar />
            <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
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
                <div className="post-single-box p-3 p-sm-5">
                  <div className="top-area pb-2">
                    <div className="profile-area d-center justify-content-between">
                      <div className="avatar-item d-flex gap-3 align-items-center">
                        <div className="info-area">
                          <h6 className="m-0">Account Privacy</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="avatar-item d-flex gap-3 align-items-center">
                    <div className="info-area">
                      <h6 className="m-0">Private Account</h6>
                    </div>
                    <div
                      onClick={handleToggle}
                      style={{
                        width: '60px',
                        height: '30px',
                        borderRadius: '30px',
                        backgroundColor: isPrivate ? "#007aff" : "#ccc",
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        display: 'flex',
                        padding: '5px',
                        marginLeft: "65%",
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          position: 'absolute',
                          left: isPrivate ? "35px" : "5px",
                          transition: 'left 0.3s',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="avatar-item d-flex gap-3 align-items-center">
                    <div className="info-area">
                      <span className="m-0">When your account is public, your profile and posts can be seen by anyone, on or off Acitvatree, even if they don't have an Activatree account.</span>
                    </div>
                  </div>
                  <div className="avatar-item d-flex gap-3 align-items-center">
                    <div className="info-area">
                      <span className="m-0">When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists.</span>
                    </div>
                  </div>
                </div>
                <div className="share-post d-flex gap-3 gap-sm-5 p-3 p-sm-5">
                  <div className="profile-box">
                    <Link to="/profile">
                      <img
                        className="avatar-img max-un"
                        src={user.profilePicture || "../assets/images/navbar/picture.png"}
                        alt="icon"
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
                {posts.filter((post) => post?.user._id === user._id).map((post) => (
                  <div key={post?._id} className="post-single-box p-3 p-sm-5">
                    <div className="top-area pb-2">
                      <div className="profile-area d-center justify-content-between">
                        <div className="avatar-item d-flex gap-3 align-items-center">
                          <div className="position-relative">
                            <img
                              className="avatar-img max-un"
                              src={post?.user.profilePicture || "../assets/images/navbar/picture.png"}
                              alt="avatar"
                              style={{ borderRadius: "50px", width: "40px", height: "40px" }} />
                          </div>
                          <div className="info-area">
                            <h6 className="m-0"><a href="public-profile-post?.html">{post?.user?.userName}</a></h6>
                            <span className="mdtxt status">{post?.createdAt &&
                              new Date(post?.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}</span>

                          </div>
                        </div>
                        <div className="btn-group cus-dropdown" ref={dropdownRef}>
                          {post?.user._id !== user._id && (
                            <button
                              className="cmn-btn me-3"
                              style={{
                                borderRadius: "50px",
                                backgroundColor: post?.user.isFollowed ? "#D0F0E8" : "#F5E6F6",
                                color: post?.user.isFollowed ? "#007B5F" : "#9A00A9",
                              }}
                              onClick={() => handlePostFollowToggle(post?._id)}
                              onMouseEnter={(e) => {
                                if (post?.isFollowed) {
                                  e.target.textContent = "Unfollow";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (post?.isFollowed) {
                                  e.target.textContent = "Following";
                                }
                              }}
                            >
                              {post?.user.isFollowed ? "Following" : "Follow"}
                            </button>
                          )}
                          <span className="mdtxt status">
                            {post?.isPinned && (
                              <i className="material-symbols-outlined mat-icon">push_pin</i>
                            )}
                          </span>
                          <button
                            type="button"
                            className="dropdown-btn"
                            // onClick={() => handleDropdownToggle(post?._id)}
                            // aria-expanded={openDropdown === post?._id}
                            onClick={(e) => handleDropdownToggle(post._id, e)}
                            aria-expanded={openDropdown === post._id}
                          >
                            <i className="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                          </button>
                          <ul
                            className={`dropdown-menu p-4 mt-8 pt-2 ${openDropdown === post?._id ? "show fade-in" : ""} `}
                            style={{
                              display: openDropdown === post?._id ? "block" : "none",
                            }}
                          >
                            {post?.isBookMarked ? (
                              <li>
                                <a className="droplist d-flex align-items-center gap-2"
                                  onClick={() => handleBookmarkRemove(post?._id)}
                                >
                                  <i className="material-symbols-outlined mat-icon">delete</i>
                                  <span>Unsave Post</span>
                                </a>
                              </li>
                            ) : (
                              <li>
                                <a className="droplist d-flex align-items-center gap-2"
                                  onClick={() => handleBookmark(post?._id)}
                                >
                                  <i className="material-symbols-outlined mat-icon">bookmark_add</i>
                                  <span>Save Post</span>
                                </a>
                              </li>
                            )}
                            {post?.user._id === user._id && (
                              <li>
                                <a className="droplist d-flex align-items-center gap-2"
                                  onClick={() => handleDeletePost(post?._id)}
                                >
                                  <i className="material-symbols-outlined mat-icon">delete</i>
                                  <span>Delete Post</span>
                                </a>
                              </li>
                            )}
                            <li>
                              <a className="droplist d-flex align-items-center gap-2"
                                data-bs-toggle="modal"
                                data-bs-target="#photoVideoModEdit"
                                //onClick={() => handleEditPost(post?._id, post)}
                                onClick={() => {
                                  handleEditPost(post?._id, post);
                                  setOpenDropdown(null);
                                }}
                              >
                                <i className="material-symbols-outlined mat-icon">edit</i>
                                <span>Edit Post</span>
                              </a>
                            </li>
                            <li>
                              <a className="droplist d-flex align-items-center gap-2"
                                //onClick={() => handlePinToggle(post?._id, post?.isPinned)}
                                onClick={() => {
                                  handlePinToggle(post?._id, post?.isPinned);
                                  setOpenDropdown(null);
                                }}
                              >
                                <i className="material-symbols-outlined mat-icon">  {post.isPinned ? "push_pin" : "push_pin"} </i>
                                <span>{post.isPinned ? "Unpin Post" : "Pin Post"}</span>
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
                      <div className="py-2">
                        <p className="description">{post?.content}</p>
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
                      {/* {post?.media && post?.media[0] && (
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
                          {post?.media && post?.media[0] && post?.media?.[0]?.type === "photos" && (
                            <img src={post?.media?.[0]?.url}
                              alt="image"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          )}
                          {post?.media && post?.media[0] && post?.media?.[0]?.type === "video" && (
                            <video
                              controls
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            >
                              <source src={post?.media?.[0]?.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      )} */}
                      {post?.media && post?.media?.length > 0 && (
                        <div className="post-media-container" style={{ width: "100%", height: "auto", overflow: "hidden", }}>
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

                      {/* {post.orignalPostId && (
                        <div className="orignal-post-container p-3" style={{ border: "1px solid #ddd", borderRadius: "8px", marginTop: "15px" }}>
                          <div className="d-flex gap-3 align-items-center">
                            <div className="position-relative">
                              <Link
                                to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                              >
                                <img
                                  className="avatar-img max-un"
                                  src={post.orignalPostId.user?.profilePicture || "../assets/images/navbar/picture.png"}
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
                                  {post.orignalPostId.user?.userName}
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
                        <div className="orignal-post-container p-3" style={{ width: "100%", height: "auto", overflow: "hidden", border: "1px solid #ddd", borderRadius: "8px", marginTop: "15px" }}>
                          <div className="d-flex gap-3 align-items-center">
                            <div className="position-relative">
                              <Link
                                to={post.orignalPostId.user?._id === user._id ? "/profile" : `/accountProfile/${post.orignalPostId.user?.userName}`}
                              >
                                <img
                                  className="avatar-img max-un"
                                  src={post.orignalPostId.user?.profilePicture || "../assets/images/navbar/picture.png"}
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
                      <button className="d-center gap-1 gap-sm-2 mdtxt" onClick={() => handleLikeToggle(post?._id, post?.isLiked)}>
                        <i className="material-symbols-outlined mat-icon">
                          {post?.isLiked?.userId === user._id ? "favorite" : "favorite_border"}
                        </i>
                        {post?.isLiked?.userId === user._id ? "Liked" : "Like"} {post?.likeCount}
                        <div className="friends-list d-flex gap-3 align-items-center text-center">
                          <ul className="d-flex align-items-center justify-content-center">
                            {post?.isLiked && post?.isLiked.userId && (
                              <li key={post?.isLiked.userId}>
                                <img
                                  src={post?.user.profilePicture || "../assets/images/navbar/picture.png"}
                                  alt="User Avatar"
                                  style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                                />
                              </li>
                            )}
                            {post?.likeCount > 3 && <li><span className="mdtxt d-center">{post?.likeCount - 3}+</span></li>}
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
                        onClick={() => handleOpenModal(post?._id)} >
                        <i className="material-symbols-outlined mat-icon"> chat </i>
                        Comment {post?.commentCount}
                      </button>
                      <button className="d-center gap-1 gap-sm-2 mdtxt">
                        <i className="material-symbols-outlined mat-icon"> share </i>
                        Share {post?.repostCount}
                      </button>
                    </div>
                  </div>
                ))}
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
                                style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                              />
                            </div>
                            <div className="info-area">
                              <h6 className="m-0"><a href="public-profile-post?.html" className="mdtxt">{suggestedUser.userName}</a></h6>
                              <p className="mdtxt">@{suggestedUser.userName}</p>
                            </div>
                          </div>
                          <div className="btn-group cus-dropdown dropend">
                            {/* <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button> */}
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
      <style>
        {`
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
              imgcomment, video {
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
              imgcomment, video {
                  max-width: 100% !important;
                  height: auto !important;
                  display: block;
                  margin: auto;
                  border-radius: 5px;
              }
          }
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
                      <div className="comments-list">
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
                                      className="imgcomment"
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
                                        style={{ borderRadius: "50px", marginTop: "-40px", marginLeft: "120px", }}
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
                        <div className="d-flex footer-area pt-3 text-end justify-content-end">
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
              <div className="modal cmn-modal fade" id="photoVideoModEdit">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-5">
                    <div className="modal-header justify-content-center">
                      <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                        <i className="material-symbols-outlined mat-icon xxltxt"> close </i>
                      </button>
                    </div>
                    <div className="top-content pb-5">
                      <h5>Update Post Photo/Video</h5><hr />
                    </div>
                    <div className="mid-area">
                      <div className="d-flex mb-5 gap-3">
                        <div className="profile-box">
                          <a href="#">
                            <img
                              src={user.profilePicture || "../assets/images/add-post-avatar.png"}
                              className="max-un"
                              alt="icon"
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
                      <div className="file-upload">
                        <label>Upload attachment</label>
                        <label className="file mt-1">
                          <input type="file" accept="image/*,video/*" name="media" multiple onChange={handleFileChange} />
                          <span className="file-custom pt-8 pb-8 d-grid text-center">
                            <i className="material-symbols-outlined mat-icon"> perm_media </i>
                            <span>Drag here or click to upload files.</span>
                          </span>
                        </label>
                        {uploadedFiles.length > 0 && (
                          <div className="media-preview mt-3">
                            <label>Existing Attachments:</label>
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
                      {/* <div className="emoji-picker-container">
                        <div className="emoji-picker-modal">
                          < EmojiPicker onEmojiClick={handleEmojiClick} style={{
                            height: "450px",
                            width: window.innerWidth > 768 ? "510px" : "100%",
                          }} />
                        </div>
                      </div> */}
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
                        <button type="button" className="cmn-btn alt" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: "50px", }}>Cancel</button>
                        <button className="cmn-btn" onClick={handlePostUpdate} style={{ borderRadius: "50px", }}>Post</button>
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
                      <h5>Add Post Photo/Video</h5>
                      <hr />
                    </div>
                    <div className="mid-area">
                      <div className="d-flex mb-5 gap-3">
                        <div className="profile-box">
                          <a href="#">
                            <img
                              src={user.profilePicture || "../assets/images/add-post-avatar.png"}
                              className="max-un"
                              alt="icon"
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
                      {/* <div className="emoji-picker-container">
                        <div className="emoji-picker-modal">
                          < EmojiPicker onEmojiClick={handleEmojiClick} style={{
                            height: "450px",
                            width: window.innerWidth > 768 ? "510px" : "100%",
                          }} />
                        </div>
                      </div> */}
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
                              src={user.profilePicture || "../assets/images/add-post-avatar.png"}
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
                      {/* <div className="emoji-picker-container">
                        <div className="emoji-picker-modal">
                          <EmojiPicker onEmojiClick={handleEmojiClick} style={{
                            height: "450px",
                            width: window.innerWidth > 768 ? "510px" : "100%",
                          }} />
                        </div>
                      </div> */}
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
        </div >
      </div>
    </>
  );
}
export default Profile;