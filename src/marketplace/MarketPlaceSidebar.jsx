import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MarketPlaceSidebar = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isBuyingOpen, setIsBuyingOpen] = useState(false);
    const [isSellingOpen, setIsSellingOpen] = useState(false);

    useEffect(() => {
        if (
            [
                "/orders",
                "/paymentHistory",
            ].includes(location.pathname)
        ) {
            setIsBuyingOpen(true);
            setIsSellingOpen(false);
        } else if (
            [
                "/dashboard",
                "/ProductSellerList",
                "/AddProduct",
                "/AddNewCategory",
                "/paymentlist",
                "/SellerStripeConnect",
            ].includes(location.pathname)
        ) {
            setIsSellingOpen(true);
            setIsBuyingOpen(false);
        }
    }, [location.pathname]);

    const toggleBuying = () => {
        setIsBuyingOpen((prev) => !prev);
        setIsSellingOpen(false);
    };

    const toggleSelling = () => {
        setIsSellingOpen((prev) => !prev);
        setIsBuyingOpen(false);
    };

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
                        color: #9A00A9;
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
                    .sub-menu {
                        padding-left: 20px;
                    }
                    .sub-menu .list-group-item {
                        padding-left: 30px;
                    }
                    .sub-menu .list-group-item:hover {
                        background-color: #9a00a9;
                    }
                    .sub-menu .list-group-item a {
                        color: inherit;
                    }
                    .list-group-item.active {
                        background-color: #F5E6F6;
                        color: white;
                        font-weight: bold;
                        color: #9A00A9;
                        border-radius: 5px;
                        height: 40px;
                    }

                    .disabled-link {
                        pointer-events: none;
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                `}
            </style>
            <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
                <div className="d-inline-block d-lg-none">
                    <button className="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2">
                        <i className="material-symbols-outlined mat-icon"> tune </i>
                        <span>Side Now</span>
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
                            <Link to="/profile"><img className="avatar-img max-un"
                                src={user.profilePicture || "../assets/images/navbar/picture.png"}
                                alt="avatar" style={{ width: "40px", height: "40px" }} />
                            </Link>
                        </div>
                        <div className="text-area">
                            <h6 className="m-0 mb-1"><Link to="/profile">{user.userName}</Link></h6>
                            <p className="mdtxt">@{user.userName}</p>
                        </div>
                    </div>
                    <ul className="profile-link mt-7 mb-7 pb-7">
                        <li className={location.pathname === "/marketplace" ? "active-link" : ""} >
                            <Link to="/marketplace" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/marketplace"
                                            ? "../assets/images/marketplace/sidebar/product-active.png"
                                            : "../assets/images/marketplace/sidebar/product.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />

                                <span>All Products</span>
                            </Link>
                        </li>
                        <li onClick={toggleBuying} className="list-group-item">
                            <div className="d-flex gap-4">
                                <img
                                    src={
                                        isBuyingOpen
                                            ? "../assets/images/marketplace/sidebar/buying-active.png"
                                            : "../assets/images/marketplace/sidebar/buying.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Buying</span>
                            </div>
                        </li>
                        {isBuyingOpen && (
                            <ul className="list-group sub-menu">
                                <li className={location.pathname === "/orders" ? "active-link" : ""} >
                                    <Link to="/orders" className="text-decoration-none text-dark">
                                        <span>My Orders</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/paymentHistory" ? "active-link" : ""} >
                                    <Link to="/paymentHistory" className="d-flex gap-4">
                                        <span>Payment</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <li onClick={toggleSelling} className="list-group-item">
                            <div className="d-flex gap-4">
                                <img
                                    src={
                                        isSellingOpen
                                            ? "../assets/images/marketplace/sidebar/selling-active.png"
                                            : "../assets/images/marketplace/sidebar/selling.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Selling</span>
                            </div>
                        </li>
                        {isSellingOpen && (
                            <ul className="list-group sub-menu">
                                <li className={location.pathname === "/dashboard" ? "active-link" : ""}>
                                    <Link to="/dashboard" className="text-decoration-none text-dark">
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/ProductSellerList" ? "active-link" : ""}>
                                    <Link to="/ProductSellerList" className="text-decoration-none text-dark">
                                        <span>All Seller Products</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/AddProduct" ? "active-link" : ""}>
                                    <Link to="/AddProduct" className="text-decoration-none text-dark">
                                        <span>Add New Product</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/AddNewCategory" ? "active-link" : ""}>
                                    <Link to="/AddNewCategory" className="text-decoration-none text-dark">
                                        <span>Add New Category</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/paymentlist" ? "active-link" : ""}>
                                    <Link to="/paymentlist" className="text-decoration-none text-dark">
                                        <span>Payment List</span>
                                    </Link>
                                </li>
                                <li className={location.pathname === "/SellerStripeConnect" ? "active-link" : ""}>
                                    <Link to="/SellerStripeConnect" className="text-decoration-none text-dark">
                                        <span>Seller Stripe Connect</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <li className={location.pathname === "/wishlist" ? "active-link" : ""} >
                            <Link to="/wishlist" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/wishlist"
                                            ? "../assets/images/marketplace/sidebar/whishlist-active.png"
                                            : "../assets/images/marketplace/sidebar/wishlist.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Wishlist</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/analytics" ? "active-link" : ""} >
                            <Link to="/analytics" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/analytics"
                                            ? "../assets/images/marketplace/sidebar/analytics-active.png"
                                            : "../assets/images/marketplace/sidebar/analytics.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Analytics</span>
                            </Link>
                        </li>
                        <hr></hr>
                        <li><span className="mb-3 mt-3">Categories</span></li>
                        <li className={location.pathname === "/Ebooks" ? "active-link" : ""} >
                            <Link to="/Ebooks" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/Ebooks"
                                            ? "../assets/images/marketplace/sidebar/ebook-active.png"
                                            : "../assets/images/marketplace/sidebar/ebook.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>E-Books</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/DigitalArtsGraphics" ? "active-link" : ""}>
                            <Link to="/DigitalArtsGraphics" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/DigitalArtsGraphics"
                                            ? "../assets/images/marketplace/sidebar/digitalartsgraphics-active.png"
                                            : "../assets/images/marketplace/sidebar/digitalartsgraphics.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Digital Arts & Graphics</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/MusicAudioFiles" ? "active-link" : ""}>
                            <Link to="/MusicAudioFiles" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/MusicAudioFiles"
                                            ? "../assets/images/marketplace/sidebar/musicaudiofile-active.png"
                                            : "../assets/images/marketplace/sidebar/musicaudiofile.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Music & Audio files</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/Videos" ? "active-link" : ""}>
                            <Link to="/Videos" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/Videos"
                                            ? "../assets/images/marketplace/sidebar/videos-active.png"
                                            : "../assets/images/marketplace/sidebar/videos.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Videos</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/AaFonts" ? "active-link" : ""}>
                            <Link to="/AaFonts" className="d-flex gap-4">
                                {/* <img
                                    src={
                                        location.pathname === "/AaFonts"
                                            ? "../assets/images/marketplace/sidebar/Aafont-active.png"
                                            : "../assets/images/marketplace/sidebar/Aafont.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                /> */}
                                <img
                                    src={
                                        location.pathname === "/AaFonts"
                                            ? "../assets/images/marketplace/sidebar/Aafont-active.png"
                                            //: "../assets/images/marketplace/sidebar/font-icon-1.svg"
                                            : "../assets/images/marketplace/sidebar/font icon.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Aa Fonts</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/WebsiteThemesPlugins" ? "active-link" : ""}>
                            <Link to="/WebsiteThemesPlugins" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/WebsiteThemesPlugins"
                                            ? "../assets/images/marketplace/sidebar/websitetheme-active.png"
                                            : "../assets/images/marketplace/sidebar/websitetheme.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Website Themes & Plugins</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/DigitalTemplates" ? "active-link" : ""}>
                            <Link to="/DigitalTemplates" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/DigitalTemplates"
                                            ? "../assets/images/marketplace/sidebar/digitaltemplates-active.png"
                                            : "../assets/images/marketplace/sidebar/digitaltemplates.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Digital Templates</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/VirtualGoodsinGames" ? "active-link" : ""}>
                            <Link to="/VirtualGoodsinGames" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/VirtualGoodsinGames"
                                            ? "../assets/images/marketplace/sidebar/virtualgoodsgames-active.png"
                                            : "../assets/images/marketplace/sidebar/virtualgoodsgames.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Virtual Goods in Games</span>
                            </Link>
                        </li>
                        {/* <li className={location.pathname === "/DigitalArt" ? "active-link" : ""}>
                            <Link to="/DigitalArt" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/DigitalArt"
                                            ? "../assets/images/marketplace/sidebar/digitalarts-active.png"
                                            : "../assets/images/marketplace/sidebar/digitalarts.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Digital Art</span>
                            </Link>
                        </li> */}
                        <li className={location.pathname === "/EducationalCourses" ? "active-link" : ""}>
                            <Link to="/EducationalCourses" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/EducationalCourses"
                                            ? "../assets/images/marketplace/sidebar/education-active.png"
                                            : "../assets/images/marketplace/sidebar/education.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Educational Courses</span>
                            </Link>
                        </li>
                        <li><span className="mb-3 mt-3">Coming Soon</span></li>
                        <li className="disabled-link">
                            <Link to="/GreetingCards" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/GreetingCards"
                                            ? "../assets/images/marketplace/sidebar/greetingcards-active.png"
                                            : "../assets/images/marketplace/sidebar/greetingcards.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Greeting Cards</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/Insurance" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/Insurance"
                                            ? "../assets/images/marketplace/sidebar/insurance-active.png"
                                            : "../assets/images/marketplace/sidebar/insurance.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Insurance</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/Flight" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/Flight"
                                            ? "../assets/images/marketplace/sidebar/flight-active.png"
                                            : "../assets/images/marketplace/sidebar/flight.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Flight</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/Hotel" className="d-flex gap-4">
                                <img
                                    src={
                                        location.pathname === "/Hotel"
                                            ? "../assets/images/marketplace/sidebar/hotel-active.png"
                                            : "../assets/images/marketplace/sidebar/hotel.png"
                                    }
                                    alt="icon"
                                    style={{ width: "25px" }}
                                />
                                <span>Hotel</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/SoftwareApps" className="d-flex gap-4">
                                <img src="../assets/images/marketplace/sidebar/softwareapps.png" alt="icon" style={{ width: "25px" }} />
                                <span>Software & Apps</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/Subscription" className="d-flex gap-4">
                                <img src="../assets/images/marketplace/sidebar/onlinesubscription.png" alt="icon" style={{ width: "25px" }} />
                                <span>Online Subscription</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/DigitalMemberships" className="d-flex gap-4">
                                <img src="../assets/images/marketplace/sidebar/digitalmemberships.png" alt="icon" style={{ width: "25px" }} />
                                <span>Digital Memberships</span>
                            </Link>
                        </li>
                        <li className="disabled-link">
                            <Link to="/LicensesStockFiles" className="d-flex gap-4">
                                <img src="../assets/images/marketplace/sidebar/licensesstockfiles.png" alt="icon" style={{ width: "25px" }} />
                                <span>Licenses & Stock Files</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MarketPlaceSidebar;