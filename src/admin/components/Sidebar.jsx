import React, { useState } from "react";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                            <li>
                                <Link to="/admin/dashboard" className="waves-effect">
                                    <img src="../assets/admin/assets/dashboard.png" alt="" height="22" style={{ marginRight: "10px" }} />
                                    <span key="t-dashboards">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/report-analytics" className="waves-effect">
                                    <img src="../assets/admin/assets/report.png" alt="" height="22" style={{ marginRight: "10px" }} />
                                    <span key="t-maps">Report Analytics</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/admin/products" className="waves-effect">
                                    <img src="../assets/admin/assets/products.png" alt="" height="22" style={{ marginRight: "10px" }} />
                                    <span key="t-multi-level">All Products</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link to="#" onClick={toggleDropdown} className="has-arrow waves-effect">
                                    <img src="../assets/admin/assets/products.png" alt="" height="22" style={{ marginRight: "10px" }} />
                                    <span>Marketplace</span>
                                </Link>
                                <ul className={`sub-menu ${isDropdownOpen ? "d-block" : "d-none"}`} aria-expanded="false">
                                    <li><Link to="/admin/products"><span>Pending Products</span></Link></li>
                                    <li><Link to="/admin/productApproved"><span>Approved Products</span></Link></li>
                                    <li><Link to="/admin/productReject"><span>Reject Products</span></Link></li>
                                    <li><Link to="/admin/customeCategory"><span>Custom Category</span></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div >
            </div >
        </>
    );
};

export default Sidebar;
