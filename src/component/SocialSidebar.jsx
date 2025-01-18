import React from "react";
import { Link, useLocation } from "react-router-dom";

function SocialSidebar() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <style>
                {`
                    .active-link {
                        background-color: #F5E6F6;
                        color: #9A00A9;
                        border-radius: 5px;
                        height: 40px;                        
                    }
                    .active-link a span {
                        color: #9A00A9 !important;
                        margin-top: 5px;
                    }
                    .active-link img {
                        filter: brightness(0) saturate(100%) sepia(100%) hue-rotate(280deg) saturate(500%) brightness(100%);
                        transition: filter 0.3s ease;
                    }
                    .profile-link li img {
                        filter: none;
                        transition: filter 0.3s ease;
                    }
                `}
            </style>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
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
                            <h6 className="m-0 mb-1"><Link to="/socialMedia">{user.userName}</Link></h6>
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
                        <li
                            className={location.pathname === "/activapost" ? "active-link" : ""}
                        >
                            <Link to="/activapost" className="d-flex gap-4">
                                <img
                                    src="assets/images/socialsidebar/icon (20).png"
                                    alt="icon"
                                    style={{ width: "7%", marginLeft: "2%" }}
                                />
                                <span style={{ marginLeft: "1%" }}>ActivaPost</span>
                            </Link>
                        </li>

                        {[

                            { path: "/video", label: "Video/Vlog", icon: "video.png" },
                            { path: "/friendsrequest", label: "Friends Request", icon: "friendsrequest.png" },
                            { path: "/following", label: "Following", icon: "follwing.png" },
                            { path: "/followers", label: "Followers", icon: "followers.png" },
                            { path: "/bookmark", label: "Bookmarks", icon: "bookmark.png" },
                            { path: "/group", label: "Group", icon: "group.png" },
                            { path: "/livestream", label: "Live Streams", icon: "livestream.png" },
                            // { path: "/profile", label: "Profile", icon: "profile.png" },
                            // { path: "/setting", label: "Settings", icon: "setting.png" },
                            // { path: "/logout", label: "Logout", icon: "logout.png" },
                        ].map((link) => (
                            <li
                                key={link.path}
                                className={location.pathname === link.path ? "active-link" : ""}
                            >
                                <Link to={link.path} className="d-flex gap-4">
                                    {/* <img
                                        src={`assets/images/socialsidebar/${link.icon}`}
                                        alt="icon"
                                        style={{ width: "25px" }}
                                    /> */}
                                    <img
                                        src={
                                            location.pathname === link.path
                                                ? `assets/images/socialsidebar/${link.icon.replace(".png", "-active.png")}`
                                                : `assets/images/socialsidebar/${link.icon}`
                                        }
                                        alt="icon"
                                        style={{ width: "25px" }}
                                    />
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* <ul className="profile-link mt-7 mb-7 pb-7">
                        <li>
                            <Link to="/monetize" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/monetize.png" alt="icon" style={{ width: "25px" }} />
                                <span>Monetize</span>
                            </Link>
                        </li>
                        <hr></hr>
                        <li><span className="mb-3 mt-3">Explore</span></li>
                        <li>
                            <Link to="/activapost" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/activapost.png" alt="icon" style={{ width: "15px" }} />
                                <span>ActivaPost</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/video" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/video.png" alt="icon" style={{ width: "25px" }} />
                                <span>Video</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/friendsrequest" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/friendsrequest.png" alt="icon" style={{ width: "25px" }} />
                                <span>Friends Request</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/follwing" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/follwing.png" alt="icon" style={{ width: "25px" }} />
                                <span>Following</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/followers" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/followers.png" alt="icon" style={{ width: "25px" }} />
                                <span>Followers</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookmark" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/bookmark.png" alt="icon" style={{ width: "25px" }} />
                                <span>Bookmarks</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/group" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/group.png" alt="icon" style={{ width: "25px" }} />
                                <span>Group</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/livestream" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/livestream.png" alt="icon" style={{ width: "25px" }} />
                                <span>Live Streams</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/profile.png" alt="icon" style={{ width: "25px" }} />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/setting.png" alt="icon" style={{ width: "25px" }} />
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" className="d-flex gap-4">
                                <img src="assets/images/socialsidebar/logout.png" alt="icon" style={{ width: "25px" }} />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul> */}
                </div>
            </div>
        </>

    );
}

export default SocialSidebar;