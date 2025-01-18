import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { networkRequest } from "../utils/networkRequest";
import API_ENDPOINTS from "../api/apiConfig";


function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    // const handleSocialMediaClick = () => {
    //     navigate("/socialMedia");
    //     window.location.reload();
    // };

    const handleProfileClick = () => {
        setIsPopupOpen(true);
    };

    const handleNavigation = (path) => {
        setIsPopupOpen(false);
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.LOGOUT);
            if (response.statusCode === 200 || response.statusCode === 201) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                //toast.success("You have successfully logged out!");
                localStorage.setItem("logoutMessage", "You have successfully logged out!");
                navigate("/login");
            } else {
                console.error("Logout failed with response:", response.data?.message || "Unknown error");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server response error:", error.response.data);
            }
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <button className="scrollToTop d-none d-lg-block">
                <i className="mat-icon fas fa-angle-double-up"></i>
            </button>
            <header className="header-section header-menu">
                <style>
                    {`
                        .header-menu {
                            background-color: #fff;
                            padding: 10px 0;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }

                        .navbar-brand .activatreelogo {
                            display: block;
                            width: 100%;
                            max-width: 400px;
                            height: auto;
                            transition: max-width 0.3s ease;
                        }

                        .navbar-brand .ATlogo {
                            display: none;
                            width: 100%;
                            max-width: 200px;
                            height: auto;
                            transition: max-width 0.3s ease;
                        }

                        @media (max-width: 768px) {
                            .navbar-brand .activatreelogo {
                                display: none;
                            }

                            .navbar-brand .ATlogo {
                                display: block;
                                //max-width: 50%;
                                max-width: 150px; 
                            }

                            .navbar-brand .activatreelogo,
                            .navbar-brand .ATlogo {
                                max-width: 100px;
                            }
                        }

                        @media (max-width: 576px) {
                            .navbar-brand .activatreelogo,
                            .navbar-brand .ATlogo {
                                //max-width: 40px;
                                max-width: 120px;
                            }
                        }
                        
                        @media (max-width: 420px) {
                            .navbar-brand .activatreelogo,
                            .navbar-brand .ATlogo {
                                max-width: 100px;
                            }
                        }

                        @media (max-width: 991px) {
                            .header-section .navbar .navbar-brand img {
                                max-width: 200px;
                            }
                        }
                    
                        @media (max-width: 576px) {
                            .icon-container {
                                display: flex;
                                flex-direction: column;
                                margin-left: 70px;
                            }
                            .icon-container span {
                                display: none;
                            }
                            .icon-container img {
                                width: 30px;
                                height: auto;
                            }
                            .navbar-nav {
                                justify-content: center;
                            }
                        }

                        .icon-container {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }

                        // .icon-container img {
                        //     width: 40%;
                        //     height: auto;
                        //     margin-bottom: 5px;
                        // }
                        
                        .icon-container span {
                            margin-top: 5px;
                            font-size: 14px;
                            color: #000;
                        }
                    `}
                </style>
                <nav className="navbar navbar-expand-lg p-0">
                    <div className="container">
                        <nav className="navbar w-100 navbar-expand-lg justify-content-betweenm">
                            <Link to="/socialMedia" className="navbar-brand">
                                <img src="assets/images/navbar/activatreelogo.png" className="activatreelogo" alt="Activatree Logo" />
                            </Link>
                            <Link to="socialMedia" className="navbar-brand">
                                <img src="assets/images/navbar/ATlogo.png" className="ATlogo" alt="AT Logo" style={{ maxWidth: "30px" }} />
                            </Link>
                            <ul className="navbar-nav feed flex-row gap-xl-20 gap-lg-10 gap-sm-7 gap-1 py-4 py-lg-0 m-lg-auto ms-auto ms-aut align-self-center">
                                <li>
                                    <Link to="/" className="nav-icon home active">
                                        <div className="icon-container">
                                            {/* <img src="assets/images/navbar/home_defualt.png" className="image" alt="image" /> */}
                                            <img
                                                src={
                                                    isActive("/")
                                                        ? "assets/images/navbar/home_avtive.png"
                                                        : "assets/images/navbar/home_defualt.png"
                                                }
                                                className="image"
                                                alt="Home Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Home</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/socialMedia" className="nav-icon feed">
                                        <div className="icon-container">
                                            <img
                                                src={
                                                    isActive("/socialMedia")
                                                        ? "assets/images/navbar/Social_active.png"
                                                        : "assets/images/navbar/Social_defualt.png"
                                                }
                                                className="image"
                                                alt="Social Media Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Social Media</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/marketPlace" className="nav-icon">
                                        <div className="icon-container">
                                            <img
                                                src={
                                                    isActive("/marketPlace")
                                                        ? "assets/images/navbar/marketplace_active.png"
                                                        : "assets/images/navbar/marketplace_defualt.png"
                                                }
                                                className="image"
                                                alt="Market Place Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Market Place</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/discussionForum" className="nav-icon">
                                        <div className="icon-container">
                                            <img
                                                src={
                                                    isActive("/discussionForum")
                                                        ? "assets/images/navbar/discussionforum_active.png"
                                                        : "assets/images/navbar/discussionforum_defualt.png"
                                                }
                                                className="image"
                                                alt="Discussion Forum Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Discussion Forum</span>
                                        </div>
                                    </Link>
                                </li>
                                {!token && (
                                    <li className="d-flex">
                                        <Link
                                            to="/login"
                                            className="cmn-btn me-2"
                                            style={{
                                                border: "1px solid black",
                                                color: "black",
                                                borderRadius: "30px",
                                                height: "40px",
                                                width: "90px",
                                                marginTop: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <span style={{ color: "#131010", fontWeight: "bold" }}>Log In</span>
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="cmn-btn"
                                            style={{
                                                border: "1px solid black",
                                                color: "black",
                                                background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                borderRadius: "30px",
                                                height: "40px",
                                                width: "110px",
                                                marginTop: "10px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <span style={{ color: "white", fontWeight: "bold" }}>Join Now</span>
                                        </Link>
                                    </li>
                                )}

                                {/* {!token && (
                                    <li className="d-flex">
                                        <Link to="/login" className="cmn-btn me-2" style={{ border: "1px solid black", color: "black", borderRadius: "30px", height: "50%", width: "70%", marginTop: "10px", textAlign: "center" }}>
                                            <div className="icon-container">
                                                <span style={{ color: "#131010", fontWeight: "bold", textAlign: "center" }}>Log In</span>
                                            </div>
                                        </Link>
                                        <Link to="/signup" className="cmn-btn" style={{ border: "1px solid black", color: "black", background: "linear-gradient(to right, #9A00A9, #580097, #29008B)", borderRadius: "30px", height: "50%", width: "70%", marginTop: "10px", textAlign: "center" }}>
                                            <div className="icon-container">
                                                <span style={{ color: "white", fontWeight: "bold", }}>Join Now</span>
                                            </div>
                                        </Link>
                                    </li>
                                )} */}
                            </ul>
                            {token && user && (
                                <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center">
                                    <div className="single-item d-none d-lg-block profile-area position-relative">
                                        <div className="profile-pic d-flex align-items-center" onClick={handleProfileClick}>
                                            <span className="avatar cmn-head active-status">
                                                <img className="avatar-img max-un" src={user.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" style={{ width: "50px", height: "50px" }} />
                                            </span>
                                        </div>
                                        {isPopupOpen && (
                                            <div className="main-area p-5 profile-content">
                                                <div className="head-area">
                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src={user.profilePicture || "assets/images/navbar/picture.png"} alt="avatar" />
                                                        </div>
                                                        <div className="text-area">
                                                            <h6 className="m-0 mb-1">{user.userName}</h6>
                                                            <p className="mdtxt"> {user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : ""}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="view-profile my-2">
                                                    <Link to="/profile" onClick={() => handleNavigation("/profile")} className="mdtxt w-100 text-center py-2">Profile</Link>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <button
                                                            className="mdtxt logout-btn"
                                                            onClick={handleLogout}
                                                            style={{
                                                                background: "none",
                                                                border: "none",
                                                                color: "inherit",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <i className="material-symbols-outlined mat-icon">
                                                                power_settings_new
                                                            </i>
                                                            Sign Out
                                                        </button>
                                                        {/* <div
                                                            className="switch-wrapper mt-4 d-flex gap-1 align-items-center"
                                                        >
                                                            <i className="mat-icon material-symbols-outlined sun icon">
                                                                light_mode
                                                            </i>
                                                            <label className="switch">
                                                                <input type="checkbox" class="checkbox" />
                                                                <span className="slider"></span>
                                                            </label>
                                                            <i className="mat-icon material-symbols-outlined moon icon">
                                                                dark_mode
                                                            </i>
                                                            <span className="mdtxt ms-2">Dark mode</span>
                                                        </div> */}
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </nav>
                    </div>
                </nav >
            </header >
        </>
    );
}

export default Header;