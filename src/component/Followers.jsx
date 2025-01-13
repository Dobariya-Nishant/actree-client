import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";

function Followers() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeItem, setActiveItem] = useState("");

    useEffect(() => {
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }
    }, []);

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
                        {/* <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
                            <div className="d-inline-block d-lg-none">
                                <button className="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2">
                                    <i className="material-symbols-outlined mat-icon"> tune </i>
                                    <span>My profile</span>
                                </button>
                            </div>
                            <div className="profile-sidebar cus-scrollbar p-5">
                                <div className="d-block d-lg-none position-absolute end-0 top-0">
                                    <button className="button profile-close">
                                        <i className="material-symbols-outlined mat-icon fs-xl"> close </i>
                                    </button>
                                </div>
                                <div className="profile-pic d-flex gap-2 align-items-center">
                                    <div className="position-relative1">
                                        <img className="avatar-img max-un" src={user.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" style={{ width: "40px" }} />
                                    </div>
                                    <div className="text-area">
                                        <h6 className="m-0 mb-1"><a href="profile-post.html">{user.userName}</a></h6>
                                        <p className="mdtxt">@{user.userName}</p>
                                    </div>
                                </div>
                                <ul className="profile-link mt-7 mb-7 pb-7">
                                    <li
                                        className={location.pathname === "/monetize" ? "active-link" : ""}
                                    >
                                        <Link to="/monetize" className="d-flex gap-4">
                                            <img
                                                src="assets/images/socialsidebar/monetize.png"
                                                alt="icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Monetize</span>
                                        </Link>
                                    </li>
                                    <hr />
                                    <li>
                                        <span className="mb-3 mt-3">Explore</span>
                                    </li>
                                    {[
                                        { path: "/activapost", label: "ActivaPost", icon: "activapost.png" },
                                        { path: "/video", label: "Video", icon: "video.png" },
                                        { path: "/friendsrequest", label: "Friends Request", icon: "friendsrequest.png" },
                                        { path: "/follwing", label: "Following", icon: "follwing.png" },
                                        { path: "/followers", label: "Followers", icon: "followers.png" },
                                        { path: "/bookmark", label: "Bookmarks", icon: "bookmark.png" },
                                        { path: "/group", label: "Group", icon: "group.png" },
                                        { path: "/livestream", label: "Live Streams", icon: "livestream.png" },
                                        { path: "/profile", label: "Profile", icon: "profile.png" },
                                        { path: "/setting", label: "Settings", icon: "setting.png" },
                                        { path: "/logout", label: "Logout", icon: "logout.png" },
                                    ].map((link) => (
                                        <li
                                            key={link.path}
                                            className={location.pathname === link.path ? "active-link" : ""}
                                        >
                                            <Link to={link.path} className="d-flex gap-4">
                                                <img
                                                    src={`assets/images/socialsidebar/${link.icon}`}
                                                    alt="icon"
                                                    style={{ width: "25px" }}
                                                />
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
                            <div className="filter-head d-center justify-content-between">
                                <div className="d-center">
                                    <button onClick={goBack} className="cmn-btn third gap-1 me-3" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>
                                        <img className="avatar-img max-un me-3" src="assets/images/socialsidebar/arrow.png" alt="icon" style={{ marginLeft: "-5px" }} />
                                    </button>
                                    <h6>{user.userName}</h6>
                                </div>
                                <h6>{user.followersCount} Followers</h6>
                            </div>
                            {/* <div className="filter-head justify-content-between">
                                <h6><img className="avatar-img max-un me-3" src="assets/images/socialsidebar/arrow.png" alt="icon" />{user.userName}</h6>
                                <p className="mdtxt" style={{ marginLeft: "35px" }}>{user.followersCount} Followers</p>
                            </div> */}
                            <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
                                <div className="post-single-box p-3 p-sm-5">
                                    <h6>Followers</h6>
                                    <div className="top-area pb-5">
                                        <hr></hr>
                                        <div className="profile-area d-center justify-content-between">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/Justus_Everett.png" alt="icon" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Isai Boyer</a></h6>
                                                    <span className="mdtxt status">@isaiboyer</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/Justus_Everett.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Justus_Everett</a></h6>
                                                    <span className="mdtxt status">@justus_everett</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
                                            </div>
                                        </div>
                                        <div className="profile-area d-center justify-content-between py-4">
                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                <div className="position-relative">
                                                    <img className="avatar-img max-un" src="assets/images/navbar/picture.png" alt="avatar" style={{ borderRadius: "50px", width: "40px" }} />
                                                </div>
                                                <div className="info-area">
                                                    <h6 className="m-0"><a href="#">Julie Bates</a></h6>
                                                    <span className="mdtxt status">@juliebates</span>
                                                </div>
                                            </div>
                                            <div className="btn-group cus-dropdown">
                                                <button className="cmn-btn" style={{ backgroundColor: "#F5E6F6", color: "#9A00A9", borderRadius: "30px", }}>Follow</button>
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
                                                <div className="profile-area d-center position-relative align-items-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Billy_Williams.png" alt="avatar" style={{ borderRadius: "50px" }} />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Justus_Everett</a></h6>
                                                            <p className="mdtxt">@Justus_Everett</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Justus_Everett.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Billy_Williams</a></h6>
                                                            <p className="mdtxt">@Billy_Williams</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Julie Bates.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Darrell Steward</a></h6>
                                                            <p className="mdtxt">@Darrell Steward</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Hana Marshall.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Kristin Watson</a></h6>
                                                            <p className="mdtxt">@Kristin Watson</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Kelvin Leon.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Jane Cooper</a></h6>
                                                            <p className="mdtxt">@Jane Cooper</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Roy Benton.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Devon Lane</a></h6>
                                                            <p className="mdtxt">@Devon Lane</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Noel_Hunt.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Annette Black</a></h6>
                                                            <p className="mdtxt">@Annette Black</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/avatar-10.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Jerome Bell</a></h6>
                                                            <p className="mdtxt">@Jerome Bell</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
                                                <div className="profile-area d-center justify-content-between">
                                                    <div className="avatar-item d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src="assets/images/Hana Marshall.png" alt="avatar" />
                                                        </div>
                                                        <div className="info-area">
                                                            <h6 className="m-0"><a href="public-profile-post.html" className="mdtxt">Guy Hawkins</a></h6>
                                                            <p className="mdtxt">@Guy Hawkins</p>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group cus-dropdown dropend">
                                                        <button className="cmn-btn" style={{ borderRadius: "50px", backgroundColor: "#F5E6F6", color: "#9A00A9" }}>Follow</button>
                                                    </div>
                                                </div>
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

export default Followers;