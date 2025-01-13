import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "./SocialSidebar";

function Bookmark() {
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
                                <div className="post-single-box p-3 p-sm-5">
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
            </main>
        </>

    );
}

export default Bookmark;