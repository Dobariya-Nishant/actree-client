import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
//import { toast } from 'react-toastify';
import { networkRequest } from "../utils/networkRequest";
import API_ENDPOINTS from "../api/apiConfig";
import { env } from "../config/env";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isActiveCalss, setIsActiveCalss] = useState(false);
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
    const [isActiveCalssNotification, setisActiveCalssNotification] = useState(false);
    const [isNotificationHistory, setIsNotificationHistory] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    async function getAllNotification() {
        try {
            if (!user) {
                return
            }
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_NOTIFICATION, {}, {}, { ...(isNotificationHistory && { isRead: true }) });
            setNotifications(response?.data);
        } catch (error) {
            console.log(error)
        }
    }

    const notificationImage = {
        "Product Created": "ProductCreated",
        "Product Updated": "ProductUpdated",
        "Product Deleted": "ProductDeleted",
        "Product Approved": "ProductApprove",
        "Product Rejected": "ProductReject",
        "Product Sold": "ProductSold",
        "Product Purchased": "ProductPurchased"
    }

    useEffect(() => {
        getAllNotification();
        const socket = io(env.BACK_END_URL);
        socket.on("notification", (data) => {
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
        });
        socket.emit("register", user?._id);
        return () => {
            socket.off("notification");
            socket.disconnect();
        };
    }, [user?._id, isNotificationHistory]);

    const handleClearNotification = async () => {
        try {
            const response = await networkRequest("PATCH", API_ENDPOINTS.GET_ALL_NOTIFICATION, {});
            if (response.statusCode === 201) {
                setNotifications([]);
                console.log("Notification clear successfully!");
            } else {
                console.log("Else!");
            }
        } catch (error) {
            console.error("Error clear notification:", error);
        }
    };


    const handleProfileClick = () => {
        setIsActiveCalss(!isActiveCalss);
        setIsPopupOpen(true);
    };

    const handleNotificationClick = () => {
        setisActiveCalssNotification(!isActiveCalssNotification);
        setIsNotificationPopupOpen(true);
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
    const formatDate = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDiff = now - createdDate;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days >= 1) {
            return createdDate.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });
        } else if (hours >= 1) {
            return `${hours}h ago`;
        } else if (minutes >= 1) {
            return `${minutes}m ago`;
        } else {
            return "Just now";
        }
    };


    return (
        <>
            <button className="scrollToTop d-none d-lg-block">
                <i className="mat-icon fas fa-angle-double-up"></i>
            </button>
            <header className="header-section header-menu">
                <style>
                    {`
                        .navbar-brand img {
                            max-width: 500px;
                            max-height: 50px;
                            width: auto;
                            height: auto;
                            transition: all 0.3s ease;
                        }
                        .header-menu {
                            background-color: #fff;
                            padding: 10px 0;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        .navbar-nav {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            gap: 20px;
                            padding: 0;
                            margin: 0;
                            margin-right: 20px;
                            list-style: none;
                        }
                        .icon-container {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }
                        .icon-container img {
                            width: 25px;
                            height: auto;
                            margin-bottom: 5px;
                        }
                        .icon-container span {
                            font-size: 14px;
                            color: #000;
                        }
                        .activatreelogo {
                            display: block;
                        }
                        .atlogo {
                            display: none;
                        } 
                
                        @media (min-width: 768px) and (max-width: 1024px) {
                            .activatreelogo {
                                display: none;
                            }
                            .atlogo {
                                display: block;
                            }
                            .navbar-brand img {
                                max-width: 120px;
                                max-height: 40px;
                            }
                        }
                        @media (max-width: 768px) {
                            .activatreelogo {
                                display: none;
                            }
                            .atlogo {
                                display: block;
                            }
                            .navbar-brand img {
                                max-width: 60px;
                                max-height: 40px;
                            }
                            .icon-container span {
                                display: none;
                            }
                            .icon-container img {
                                display: inline-block;
                                width: 20px;
                                height: auto;
                                margin: 
                            }

                            .profile-content {
                                top: auto;
                                bottom: 100%;
                                margin-bottom: -250px;
                                max-height: 80vh;
                                overflow-y: auto;
                            }
                        }

                        @media (max-width: 480px) {
                            .auth-buttons a {
                                max-width: 30px;
                            }
                        }
                        @media (max-width: 375px) {
                            .auth-buttons a {
                                max-width: 30px;
                            }
                        }                        
                        @media (max-width: 325px) {
                            .auth-buttons {
                                flex-direction: inherit;
                                //margin-top: -100px;
                            }
                            .navbar-nav {
                                display: contents;
                            }
                            .auth-buttons a {
                                font-size: 10px;
                                padding: 3px 6px;
                                width: 70px;
                            }
                        }
                        @media (max-width: 768px) {
                            .authloginjoin {
                                display: none !important;
                            }
                        }
                        @media (min-width: 769px) {
                            .authloginjoin {
                                display: flex !important;
                            }
                        }

                        .notification-content {
                            top: 50px;
                            transform: translateX(-50%);
                            z-index: 999;
                            background: white;
                            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
                            border-radius: 18px !important;
                            //padding: 15px;
                            white-space: nowrap !important;
                            // max-height: 400px;
                            overflow-y: auto;
                        }

                        @media (max-width: 991px) {
                            .notification-content {
                                position: fixed !important;
                                top: 100px !important;
                                left: 30% !important;
                                transform: translateX(-50%);
                                z-index: 999;
                                white-space: nowrap !important; 
                                border-radius: 18px !important;                                                          
                            }
                        }

                        @media (max-width: 768px) {
                            .notification-content {
                                width: 80%;
                                position: fixed !important;
                                top: 80px !important;
                                left: 10% !important;
                                transform: translateX(-50%);
                                z-index: 999;
                                white-space: nowrap !important;
                                border-radius: 18px !important;
                            }
                        }

                        @media (max-width: 480px) {
                            .notification-content {
                                width: 50%;
                                max-width: 150px;
                                top: 50px;
                                transform: translateX(-50%);
                                z-index: 999;
                                white-space: nowrap !important;
                            }
                        }
                    `}
                </style>
                <nav className="navbar navbar-expand-lg p-0">
                    <div className="container">
                        <nav className="navbar w-100 navbar-expand-lg justify-content-between">
                            <Link to="/" className="navbar-brand activatreelogo">
                                <img src="../assets/images/navbar/activatreelogo.png" className="activatreelogo" alt="Activatree Logo" />
                            </Link>
                            <Link to="" className="navbar-brand atlogo">
                                <img src="../assets/images/navbar/ATlogo.png" className="atlogo" alt="AT Logo" />
                            </Link>
                            <ul className="navbar-nav feed py-4 py-lg-0 m-lg-auto ms-auto ms-aut align-self-center">
                                <li>
                                    <Link to="/" className="nav-icon home active">
                                        <div className="icon-container">
                                            <img
                                                src={
                                                    isActive("/")
                                                        ? "../assets/images/navbar/home_avtive.png"
                                                        : "../assets/images/navbar/home_defualt.png"
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
                                                        ? "../assets/images/navbar/Social_active.png"
                                                        : "../assets/images/navbar/Social_defualt.png"
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
                                                        ? "../assets/images/navbar/marketplace_active.png"
                                                        : "../assets/images/navbar/marketplace_defualt.png"
                                                }
                                                className="image"
                                                alt="Market Place Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Market Place</span>
                                        </div>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/discussionForum" className="nav-icon">
                                        <div className="icon-container">
                                            <img
                                                src={
                                                    isActive("/discussionForum")
                                                        ? "../assets/images/navbar/discussionforum_active.png"
                                                        : "../assets/images/navbar/discussionforum_defualt.png"
                                                }
                                                className="image"
                                                alt="Discussion Forum Icon"
                                                style={{ width: "25px" }}
                                            />
                                            <span>Discussion Forum</span>
                                        </div>
                                    </Link>
                                </li> */}
                                {!token && (
                                    <li className="d-flex authloginjoin">
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
                            </ul>
                            {token && user && (
                                <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center">
                                    <div className={`single-item messages-area notification-area ${isActiveCalssNotification ? "active" : ""}`}>
                                        <div className="notification-btn cmn-head position-relative" onClick={handleNotificationClick}>
                                            <div className="icon-area d-center position-relative">
                                                {!isNotificationHistory && <span className="abs-area position-absolute d-center mdtxt">{notifications?.length || 0}</span>}
                                                <img
                                                    className="avatar-img max-un"
                                                    src="../assets/images/navbar/notification.png"
                                                    alt="avatar"
                                                    style={{ width: "50px", height: "50px" }}
                                                />
                                            </div>
                                        </div>
                                        {notifications?.length > 0 && (
                                            <div className="main-area p-5 notification-content">
                                                <h5 className="mb-8">Notification</h5>
                                                {notifications.map((notification) => (
                                                    <div key={notification._id} className="single-box p-0 mb-7">
                                                        <a
                                                            id={notification?._id}
                                                            href="#"
                                                            className="d-flex justify-content-between align-items-center"
                                                        >
                                                            <div className="left-item position-relative d-inline-flex gap-3">
                                                                <div className="avatar position-relative d-inline-flex">
                                                                    <img
                                                                        className="avatar-img max-un"
                                                                        src={`../assets/images/navbar/${notificationImage[notification?.type]}.png`}
                                                                        alt="avatar"
                                                                        style={{ width: "50px", height: "50px" }}
                                                                    />
                                                                </div>
                                                                <div className="text-area">
                                                                    <h6 className="m-0 mb-1">{notification?.type}</h6>
                                                                    <p className="mdtxt">{notification?.message}</p>
                                                                </div>
                                                            </div>
                                                            <div className="time-remaining">
                                                                <p className="mdtxt">{formatDate(notification.createdAt)}</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                                <div className="btn-area d-flex justify-content-between">
                                                    <button onClick={() => setIsNotificationHistory((prev) => !prev)}>{isNotificationHistory ? "Live Notifications" : "Notification History"}</button>
                                                    {!isNotificationHistory && <button onClick={handleClearNotification} style={{ color: "#29008B" }}>Clear All</button>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`single-item profile-area position-relative ${isActiveCalss ? "active" : ""}`}>
                                        <div className="profile-pic d-flex align-items-center" onClick={handleProfileClick}>
                                            <span className="avatar cmn-head active-status">
                                                <img className="avatar-img max-un" src={user.profilePicture || "../assets/images/navbar/picture.png"} alt="avatar" style={{ width: "50px", height: "50px" }} />
                                            </span>
                                        </div>
                                        {isPopupOpen && (
                                            <div className="main-area p-5 profile-content">
                                                <div className="head-area">

                                                    <div className="d-flex gap-3 align-items-center">
                                                        <div className="avatar-item">
                                                            <img className="avatar-img max-un" src={user.profilePicture || "../assets/images/navbar/picture.png"} alt="avatar" />
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
                                                            className="mdtxt logout-btn p-2 d-flex"
                                                            onClick={handleLogout}
                                                            style={{
                                                                background: "none",
                                                                border: "none",
                                                                color: "inherit",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <img className="avatar-img max-un" src="../assets/images/navbar/signout.png" alt="avatar" style={{ width: "24px", height: "24px", borderRadius: "30px" }} />
                                                            {/* <i className="material-symbols-outlined mat-icon">power_settings_new</i> */}
                                                            Sign Out
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </nav>
                    </div>
                </nav>
            </header>
        </>
    );
}
export default Header;
