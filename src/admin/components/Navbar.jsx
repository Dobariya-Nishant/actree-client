import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { networkRequest } from "../../utils/networkRequest";
import API_ENDPOINTS from "../../api/apiConfig";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = async (e) => {
        try {
            e.preventDefault()
            const response = await networkRequest("DELETE", API_ENDPOINTS.LOGOUT, {}, {}, {}, {}, true);
            //debugger
            if (response.statusCode === 200 || response.statusCode === 201) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("logoutMessage", "You have successfully logged out!");
                window.history.replaceState(null, "", "/admin/login");
                navigate("/admin/login", { replace: true });
            } else {
                console.error("Logout failed with response:", response.data?.message || "Unknown error");
            }
        } catch (error) {
            if (error.response) {
                console.error("Server response error:", error.response.data);
            }
        }
    };

    return (
        <>
            <div id="layout-wrapper">
                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box">
                                <a href="#" className="logo logo-dark" onClick={(e) => e.preventDefault()}>
                                    <span className="logo-sm">
                                        <img src="../assets/images/navbar/activatreelogo.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="../assets/images/navbar/activatreelogo.png" alt="" height="17" />
                                    </span>
                                </a>
                                <a href="#" className="logo logo-light" onClick={(e) => e.preventDefault()}>
                                    <span className="logo-sm">
                                        <img src="../assets/images/navbar/activatreelogo.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="../assets/images/navbar/activatreelogo.png" alt="" height="19" />
                                    </span>
                                </a>
                            </div>

                            <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                                <i className="fa fa-fw fa-bars"></i>
                            </button>
                            <form className="app-search d-none d-lg-block">
                                <div className="position-relative">
                                    <input type="text" className="form-control" placeholder="Search..." />
                                    <span className="bx bx-search-alt"></span>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex">
                            <div className="dropdown d-inline-block d-lg-none ms-2">
                                <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-magnify"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                    aria-labelledby="page-header-search-dropdown">
                                    <form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* <div className="dropdown d-inline-block">
                                <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="bx bx-bell bx-tada"></i>
                                    <span className="badge bg-danger rounded-pill">3</span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                    aria-labelledby="page-header-notifications-dropdown">
                                    <div className="p-3">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="m-0" key="t-notifications"> Notifications </h6>
                                            </div>
                                            <div className="col-auto">
                                                <a href="#!" className="small" key="t-view-all"> View All</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-simplebar style={{ maxHeight: "230px" }}>
                                        <a href="javascript: void(0);" className="text-reset notification-item">
                                            <div className="d-flex">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                        <i className="bx bx-cart"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1" key="t-your-order">Your order is placed</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript: void(0);" className="text-reset notification-item">
                                            <div className="d-flex">
                                                <img src="assets/images/users/avatar-3.jpg"
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">James Lemire</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-hours-ago">1 hours ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript: void(0);" className="text-reset notification-item">
                                            <div className="d-flex">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title bg-success rounded-circle font-size-16">
                                                        <i className="bx bx-badge-check"></i>
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1" key="t-shipped">Your item is shipped</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        <a href="javascript: void(0);" className="text-reset notification-item">
                                            <div className="d-flex">
                                                <img src="assets/images/users/avatar-4.jpg"
                                                    className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">Salena Layfield</h6>
                                                    <div className="font-size-12 text-muted">
                                                        <p className="mb-1" key="t-occidental">As a skeptical Cambridge friend of mine occidental.</p>
                                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-hours-ago">1 hours ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="p-2 border-top d-grid">
                                        <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                            <i className="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">View More..</span>
                                        </a>
                                    </div>
                                </div>
                            </div> */}

                            <div className="dropdown d-inline-block">
                                <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="rounded-circle header-profile-user" src={user.profilePicture || "../assets/admin/assets/images/users/avatar-1.jpg"}
                                        alt="Header Avatar" />
                                    <span className="d-none d-xl-inline-block ms-1" key="t-henry">{user.userName}</span>
                                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    {/* <a className="dropdown-item" href="#"><i className="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span></a>
                                    <div className="dropdown-divider"></div> */}
                                    <a className="dropdown-item text-danger" href="" onClick={handleLogout}><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Navbar;
