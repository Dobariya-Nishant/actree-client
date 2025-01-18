import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const Profile = () => {
  const token = localStorage.getItem("token");
  //const user = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [suggestList, setSuggestList] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  useEffect(() => {
    getAllSuggest();
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
  const [previewAvatar, setPreviewAvatar] = useState(
    user.profilePicture || defaultAvatar
  );

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
      const response = await networkRequest(
        "GET",
        API_ENDPOINTS.GET_SUGGEST,
        {},
        {}
      );
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
        const response = await networkRequest(
          "DELETE",
          API_ENDPOINTS.DELETE_UNFOLLOW,
          { followedId: userId }
        );
        if (response.statusCode === 201) {
          console.log("Unfollowed successfully!");
          setFollowedUsers((prevFollowedUsers) =>
            prevFollowedUsers.filter((id) => id !== userId)
          );
        } else {
          console.error("Failed to unfollow");
        }
      } else {
        const response = await networkRequest(
          "POST",
          API_ENDPOINTS.POST_FOLLOW,
          { followedId: userId }
        );
        if (response.statusCode === 201) {
          console.log("Followed successfully!");
          setFollowedUsers((prevFollowedUsers) => [
            ...prevFollowedUsers,
            userId,
          ]);
        } else {
          console.error("Failed to follow");
        }
      }
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
    }
  };

<<<<<<< Updated upstream
  return (
    <>
      <main className="main-content">
        <ToastContainer />
        <style>
          {`
=======
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
>>>>>>> Stashed changes
                       
                        .preview-image {
                            width: 100%;
                            height: 300px;
                            object-fit: cover;
                            border-radius: 8px;
                            display: block;
                        }
                        // .avatar-img1 {
                        //     position: absolute;
                        //     margin-top: -7%;
                        //     object-fit: cover;
                        //     border-radius: 50px;
                        //     height: 100px;
                        //     width: 100px;
                        // }
                        // .cemeraphoto {
                        //     position: absolute;
                        //     margin-top: -50px;
                        //     margin-left: 70px;
                        //     z-index: 5;
                        //     object-fit: cover;
                        // }  
                        
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
<<<<<<< Updated upstream
        </style>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-box p-5">
                <div className="col-md-12">
                  <div className="upload-single cover-img">
                    <div className="head-area mb-2 text-start">
                      <h6>Profile</h6>
=======
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
                                                    <span className="cmn-btn d-center gap-1" >
                                                        <i className="material-symbols-outlined mat-icon fs-2"> edit_note </i>
                                                        Change Cover Photo
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
                                                        Edit Profile
                                                    </Link>
                                                ) : (
                                                    <Link to="/individualsignup" className="cmn-btn d-center gap-1">
                                                        <i className="material-symbols-outlined mat-icon fs-4"> person_add </i>
                                                        Edit Profile
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
>>>>>>> Stashed changes
                    </div>
                    <div className="profile-picture position-relative text-start">
                      <img
                        className="preview-image w-100"
                        src={previewCover}
                        alt="Cover Preview"
                      />
                      <div className="file-upload position-absolute p-4 bottom-0 end-0">
                        <label className="file text-start mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverPhotoChange}
                            style={{ display: "none" }}
                          />
                          <span
                            className="cmn-btn d-center gap-1"
                            style={{
                              borderRadius: "50px",
                              backgroundColor: "#F5E6F6",
                              color: "#9A00A9",
                            }}
                          >
                            <i className="material-symbols-outlined mat-icon fs-2">
                              {" "}
                              edit_note{" "}
                            </i>
                            Change Cover Photo
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between align-items-start">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="avatar-item">
                          <img
                            className="avatar-img1 max-un"
                            src={previewAvatar}
                            alt="avatar"
                          />
                          <label className="avatar-upload">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarPhotoChange}
                              style={{ display: "none" }}
                            />
                            <i className="material-symbols-outlined cemeraphoto">
                              photo_camera
                            </i>
                          </label>
                        </div>
                        <div className="text-area text-start mt-5">
                          <h5 className="m-1 mb-1">{user.userName}</h5>
                          <div className="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
                            <span className="mdtxt d-center"></span>
                            <span className="mdtxt d-center">
                              @{user.userName}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="btn-item d-center gap-3">
                        {user.type === "individual" ? (
                          <Link
                            to="/individualsignup"
                            className="cmn-btn d-center gap-1"
                            style={{
                              borderRadius: "50px",
                              backgroundColor: "#F5E6F6",
                              color: "#9A00A9",
                            }}
                          >
                            <i className="material-symbols-outlined mat-icon fs-4">
                              {" "}
                              person_add{" "}
                            </i>
                            Edit Profile
                          </Link>
                        ) : (
                          <Link
                            to="/individualsignup"
                            className="cmn-btn d-center gap-1"
                            style={{
                              borderRadius: "50px",
                              backgroundColor: "#F5E6F6",
                              color: "#9A00A9",
                            }}
                          >
                            <i className="material-symbols-outlined mat-icon fs-4">
                              {" "}
                              person_add{" "}
                            </i>
                            Edit Profile
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
            <div className="col-xxl-9 col-xl-8 col-lg-7">
              <div className="single-box p-3 p-sm-5">
                <div className="head-area text-start">
                  <h6>About Me</h6>
                  <span className="mdtxt">{user.bio}</span>
                </div>
                <hr></hr>
                <div className="d-flex" style={{ gap: "20%" }}>
                  <div className="head-area mt-4 text-start">
                    <h6>Joined</h6>
                    <span className="mdtxt">
                      {new Date(user.createdAt).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="head-area mt-4 text-center">
                    <h6>Mobile No</h6>
                    <span className="mdtxt">{user.phoneNumber}</span>
                  </div>
                  {user.type === "individual" ? (
                    <div className="head-area mt-4 text-end">
                      <h6>DOB</h6>
                      <span className="mdtxt">
                        {
                          new Date(user.dateOfBirth)
                            ?.toISOString()
                            ?.split("T")[0]
                        }
                      </span>
                    </div>
                  ) : (
                    <div className="head-area mt-4 text-end">
                      <h6>Operating Hours</h6>
                      <span className="mdtxt">{user.operatingHours}</span>
                    </div>
                  )}
                </div>
                <hr></hr>
                <div className="head-area mt-6 text-start">
                  <h6>Location</h6>
                  <span className="mdtxt">{user.location}</span>
                </div>
                {user.type === "business" && (
                  <div className="head-area mt-4 text-start">
                    <h6>Category</h6>
                    <span className="mdtxt">{user.businessCategory}</span>
                  </div>
                )}
                <hr></hr>
                <div
                  className="head-area mt-4 text-start d-flex"
                  style={{ gap: "10%" }}
                >
                  <span>{user.followingCount} Following</span>
                  <span>{user.followersCount} Followers</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="single-box member-single p-3 p-sm-5">
                    <div className="head-area text-start">
                      <h6>Social Links</h6>
                    </div>
                    <hr />
                    <div className="profile-area d-center justify-content-between">
                      <div
                        className="avatar-item d-flex"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "15px",
                        }}
                      >
                        {user.socialLinks.map((link, index) => {
                          const logoMap = {
                            Google: "assets/images/sociallink/google.png",
                            LinkedIn: "assets/images/sociallink/linkedin.png",
                            Facebook: "assets/images/sociallink/facebook.png",
                            "Website Link":
                              "assets/images/sociallink/website.png",
                            X: "assets/images/sociallink/x.png",
                            "WhatsApp API":
                              "assets/images/sociallink/whatsapp.png",
                            Instagram: "assets/images/sociallink/instagram.png",
                            TikTok: "assets/images/sociallink/tiktok.png",
                            Snapchat: "assets/images/sociallink/snapchat.png",
                            YouTube: "assets/images/sociallink/youtube.png",
                            Threads: "assets/images/sociallink/threads.png",
                            Rumble: "assets/images/sociallink/rumble.png",
                            Parler: "assets/images/sociallink/parler.png",
                            Reddit: "assets/images/sociallink/reddit.png",
                            Discord: "assets/images/sociallink/discord.png",
                            "Truth Social":
                              "assets/images/sociallink/truthsocial.png",
                            Gettr: "assets/images/sociallink/Gettr.png",
                            Mastodon: "assets/images/sociallink/Mastodon.png",
                            BeReal: "assets/images/sociallink/BeReal.png",
                            Telegram: "assets/images/sociallink/telegram.png",
                            Pinterest: "assets/images/sociallink/pinterest.png",
                          };
                          const logoSrc =
                            logoMap[link.logoName] ||
                            "assets/images/sociallink/default.png";

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
            <div className="col-xxl-3 col-xl-4 col-lg-5">
              <div className="sidebar-wrapper d-flex al-item justify-content-end justify-content-xl-center flex-column flex-md-row flex-xl-column flex gap-6">
                <div className="sidebar-area p-5">
                  <div className="mb-4">
                    <h6 className="d-inline-flex">Suggested for you</h6>
                  </div>
                  <div className="d-flex flex-column gap-6">
                    {Array.isArray(suggestList) && suggestList.length > 0 ? (
                      suggestList.map((suggestedUser) => (
                        <div
                          key={suggestedUser._id}
                          className="profile-area d-center position-relative align-items-center justify-content-between"
                        >
                          <div className="avatar-item d-flex gap-3 align-items-center">
                            <div className="avatar-item">
                              <img
                                className="avatar-img max-un"
                                src={
                                  suggestedUser.profilePicture ||
                                  "assets/images/avatar-14.png"
                                }
                                alt="avatar"
                                style={{ borderRadius: "50px", width: "40px" }}
                              />
                            </div>
                            <div className="info-area">
                              <h6 className="m-0">
                                <a
                                  href="public-profile-post.html"
                                  className="mdtxt"
                                >
                                  {suggestedUser.userName}
                                </a>
                              </h6>
                              <p className="mdtxt">@{suggestedUser.userName}</p>
                            </div>
                          </div>
                          <div className="btn-group cus-dropdown dropend">
                            {/* <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button> */}
                            <button
                              className="cmn-btn"
                              style={{
                                borderRadius: "50px",
                                backgroundColor: followedUsers.includes(
                                  suggestedUser._id
                                )
                                  ? "#D0F0E8"
                                  : "#F5E6F6",
                                color: followedUsers.includes(suggestedUser._id)
                                  ? "#007B5F"
                                  : "#9A00A9",
                              }}
                              onClick={() =>
                                handleFollowToggle(suggestedUser._id)
                              }
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
                              {followedUsers.includes(suggestedUser._id)
                                ? "Following"
                                : "Follow"}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No suggestions available</p>
                    )}
                    {/* // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Justus_Everett.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Billy_Williams</a></h6>
                                        //             <p className="mdtxt">@Billy_Williams</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Julie Bates.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Darrell Steward</a></h6>
                                        //             <p className="mdtxt">@Darrell Steward</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Hana Marshall.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Kristin Watson</a></h6>
                                        //             <p className="mdtxt">@Kristin Watson</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Kelvin Leon.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Jane Cooper</a></h6>
                                        //             <p className="mdtxt">@Jane Cooper</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Roy Benton.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Devon Lane</a></h6>
                                        //             <p className="mdtxt">@Devon Lane</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Noel_Hunt.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Annette Black</a></h6>
                                        //             <p className="mdtxt">@Annette Black</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/avatar-10.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Jerome Bell</a></h6>
                                        //             <p className="mdtxt">@Jerome Bell</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div>
                                        // <div className="profile-area d-center justify-content-between">
                                        //     <div className="avatar-item d-flex gap-3 align-items-center">
                                        //         <div className="avatar-item">
                                        //             <img className="avatar-img max-un" src="assets/images/Hana Marshall.png" alt="avatar" />
                                        //         </div>
                                        //         <div className="info-area">
                                        //             <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Guy Hawkins</a></h6>
                                        //             <p className="mdtxt">@Guy Hawkins</p>
                                        //         </div>
                                        //     </div>
                                        //     <div className="btn-group cus-dropdown dropend">
                                        //         <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                        //     </div>
                                        // </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
