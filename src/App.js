import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Header from "./component/Header";
import { SignUpProvider } from "./context/SignUpContext";

import Login from "./component/Login";
import SignUp from "./component/SignUp";
import IndividualSignUp from "./component/IndividualSignUp";

import ConnectSocials from "./component/ConnectSocials";
import InterestSignup from "./component/InterestSignup";

import Home from "./component/Home";
import AboutUs from "./component/AboutUs";
import Blog from "./component/Blog";
import Revolutionizing from "./component/Revolutionizing";
import Impactful from "./component/Impactful";
import Investors from "./component/Investors";
import Helpcenter from "./component/Helpcenter";
import Whatsnew from "./component/Whatsnew";
import Privacypolicy from "./component/Privacypolicy";
import Termsofservice from "./component/Termsofservice";

import SocialMedia from "./component/SocialMedia";
//import MarketPlace from "./component/MarketPlace";
import MarketPlace from "./marketplace/MarketPlace";
import Monetize from "./monetize/Monetize";
import ProductDetail from "./marketplace/ProductDetail";
import BuyNow from "./marketplace/BuyNow";
import Orders from "./marketplace/Orders";
import OrderDetail from "./marketplace/OrderDetail";
import OrderInvoice from "./marketplace/OrderInvoice";
import Wishlist from "./marketplace/Wishlist";
import PaymentHistory from "./marketplace/PaymentHistory";
import Dashboard from "./marketplace/Dashboard";
import ProductSellerList from "./marketplace/ProductSellerList";
import PaymentList from "./marketplace/PaymentList";
import ProductPaymentDetail from "./marketplace/ProductPaymentDetail";
import Analytics from "./marketplace/Analytics";
import AddNewProduct from "./marketplace/AddNewProduct";
import AddProduct from "./marketplace/AddProduct";
import ProductEditSeller from "./marketplace/ProductEditSeller";
import ProductDetailSeller from "./marketplace/ProductDetailSeller";
import AddNewCategory from "./marketplace/AddNewCategory";
import SellerStripeConnect from "./marketplace/SellerStripeConnect";

import Ebooks from "./marketplace/Ebooks";
import DigitalArtsGraphics from "./marketplace/DigitalArtsGraphics";
import MusicAudioFiles from "./marketplace/MusicAudioFiles";
import Videos from "./marketplace/Videos";
import AaFonts from "./marketplace/AaFonts";
import WebsiteThemesPlugins from "./marketplace/WebsiteThemesPlugins";
import DigitalTemplates from "./marketplace/DigitalTemplates";
import VirtualGoodsinGames from "./marketplace/VirtualGoodsinGames";
import EducationalCourses from "./marketplace/EducationalCourses";

import DiscussionForum from "./component/DiscussionForum";
import OAuthCallback from "./component/OauthCallback";
import Profile from "./component/Profile";
import AccountProfile from "./component/AccountProfile";
// import Monetize from "./component/Monetize";
import ActivaPost from "./component/ActivaPost";
import Video from "./component/Video";
import FrindRequest from "./component/FrindRequest";
import Following from "./component/Following";
import Followers from "./component/Followers";
import Bookmark from "./component/Bookmark";
import Groups from "./component/Groups";
import Livestream from "./component/Livestream";
import NotFound from "./component/NotFound";

//Admin
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/Dashboard";
import AdminReportAnalytics from "./admin/components/AdminReportAnalytics";
import AdminProducts from "./admin/components/AdminProducts";
import AdminProductsApproved from "./admin/components/AdminProductsApproved";
import AdminProductsReject from "./admin/components/AdminProductsReject";
import AdminProductsDetail from "./admin/components/AdminProductsDetail";
import CustomeCategory from "./admin/components/CustomeCategory";

const DynamicCSSJSLoader = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove old styles
    document
      .querySelectorAll("link[data-dynamic]")
      .forEach((link) => link.remove());
    document
      .querySelectorAll("script[data-dynamic]")
      .forEach((script) => script.remove());

    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-dynamic", "true");
      document.head.appendChild(link);
    };

    const loadJS = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-dynamic", "true");
      document.body.appendChild(script);
    };

    if (location.pathname.startsWith("/admin")) {
      loadCSS("/assets/admin/assets/css/bootstrap.min.css");
      loadCSS("/assets/admin/assets/css/icons.min.css");
      loadCSS("/assets/admin/assets/css/app.min.css");

      loadJS("/assets/admin/assets/libs/jquery/jquery.min.js");
      loadJS("/assets/admin/assets/libs/bootstrap/js/bootstrap.bundle.min.js");
      //loadJS("/assets/admin/assets/libs/metismenu/metisMenu.min.js");
      loadJS("/assets/admin/assets/libs/simplebar/simplebar.min.js");
      loadJS("/assets/admin/assets/libs/node-waves/waves.min.js");
      loadJS("/assets/admin/assets/libs/apexcharts/apexcharts.min.js");
      // loadJS("/assets/admin/assets/js/pages/dashboard.init.js");
      // loadJS("/assets/admin/assets/js/app.js");
    } else {
      loadCSS("/assets/css/style.css");

      loadJS("/assets/js/plugins/jquery.min.js");
      loadJS("/assets/js/bootstrap.bundle.min.js");
      loadJS("/assets/js/plugins/slick.js");
      loadJS("/assets/js/plugins/jquery.nice-select.min.js");
      loadJS("/assets/js/plugins/plyr.js");
      //loadJS("/assets/js/plugins/apexcharts.js");
      loadJS("/assets/js/plugins/wow.min.js");
      loadJS("/assets/js/plugins/plugin.js");
      loadJS("/assets/js/main.js");
    }
  }, [location.pathname]);

  return null;
};

function App() {
  const location = useLocation();
  const hideHeaderPaths = [
    "/login",
    "/signup",
    "/individualSignUp",
    "/connectSocials",
    "/interestSignup",
    "/admin",
  ];

  const shouldHideHeader =
    hideHeaderPaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {/* User Routes Start*/}
      <DynamicCSSJSLoader />
      {!shouldHideHeader && <Header />}
      <SignUpProvider>
        <Routes>
          {/* Admin Routes Start */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="report-analytics" element={<AdminReportAnalytics />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="productApproved" element={<AdminProductsApproved />} />
            <Route path="productReject" element={<AdminProductsReject />} />
            <Route path="productDetail/:id" element={<AdminProductsDetail />} />
            <Route path="customeCategory" element={<CustomeCategory />} />
          </Route>

          {/* Admin Routes End */}

          {/* User Public Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/revolutionizing" element={<Revolutionizing />} />
          <Route path="/impactful" element={<Impactful />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/help-center" element={<Helpcenter />} />
          <Route path="/whats-new" element={<Whatsnew />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/terms-of-service" element={<Termsofservice />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="/individualsignup" element={<IndividualSignUp />} />
          <Route path="/connectSocials" element={<ConnectSocials />} />
          <Route path="/interestSignup" element={<InterestSignup />} />
          <Route
            path="/accountProfile/:userName"
            element={
              <ProtectedRoute>
                <AccountProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/socialMedia"
            element={
              <ProtectedRoute>
                <SocialMedia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketPlace"
            element={
              <ProtectedRoute>
                <MarketPlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monetize"
            element={
              <ProtectedRoute>
                <Monetize />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product_detail/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderDetail/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderDownloadInvoice/:id"
            element={
              <ProtectedRoute>
                <OrderInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/BuyNow/:id"
            element={
              <ProtectedRoute>
                <BuyNow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductSellerList"
            element={
              <ProtectedRoute>
                <ProductSellerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddNewProduct"
            element={
              <ProtectedRoute>
                <AddNewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddNewCategory"
            element={
              <ProtectedRoute>
                <AddNewCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductEditSeller/:id"
            element={
              <ProtectedRoute>
                <ProductEditSeller />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductDetailSeller/:id"
            element={
              <ProtectedRoute>
                <ProductDetailSeller />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentlist"
            element={
              <ProtectedRoute>
                <PaymentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productPaymentDetail/:id"
            element={
              <ProtectedRoute>
                <ProductPaymentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SellerStripeConnect"
            element={
              <ProtectedRoute>
                <SellerStripeConnect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentHistory"
            element={
              <ProtectedRoute>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Ebooks"
            element={
              <ProtectedRoute>
                <Ebooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DigitalArtsGraphics"
            element={
              <ProtectedRoute>
                <DigitalArtsGraphics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MusicAudioFiles"
            element={
              <ProtectedRoute>
                <MusicAudioFiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Videos"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AaFonts"
            element={
              <ProtectedRoute>
                <AaFonts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/WebsiteThemesPlugins"
            element={
              <ProtectedRoute>
                <WebsiteThemesPlugins />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DigitalTemplates"
            element={
              <ProtectedRoute>
                <DigitalTemplates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/VirtualGoodsinGames"
            element={
              <ProtectedRoute>
                <VirtualGoodsinGames />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EducationalCourses"
            element={
              <ProtectedRoute>
                <EducationalCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discussionForum"
            element={
              <ProtectedRoute>
                <DiscussionForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monetize"
            element={
              <ProtectedRoute>
                <Monetize />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activapost"
            element={
              <ProtectedRoute>
                <ActivaPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video"
            element={
              <ProtectedRoute>
                <Video />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friendsrequest"
            element={
              <ProtectedRoute>
                <FrindRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/following"
            element={
              <ProtectedRoute>
                <Following />
              </ProtectedRoute>
            }
          />
          <Route
            path="/followers"
            element={
              <ProtectedRoute>
                <Followers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmark"
            element={
              <ProtectedRoute>
                <Bookmark />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/livestream"
            element={
              <ProtectedRoute>
                <Livestream />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignUpProvider>
      {/* User Routes End */}
    </>
  );
}
export default App;
