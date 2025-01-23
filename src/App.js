import React from "react";
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
import Investors from "./component/Investors";
import Helpcenter from "./component/Helpcenter";
import Whatsnew from "./component/Whatsnew";
import Privacypolicy from "./component/Privacypolicy";
import Termsofservice from "./component/Termsofservice";

import SocialMedia from "./component/SocialMedia";
import MarketPlace from "./component/MarketPlace";
import DiscussionForum from "./component/DiscussionForum";
import OAuthCallback from "./component/OauthCallback";
import Profile from "./component/Profile";
import AccountProfile from "./component/AccountProfile";
import Monetize from "./component/Monetize";
import ActivaPost from "./component/ActivaPost";
import Video from "./component/Video";
import FrindRequest from "./component/FrindRequest";
import Following from "./component/Following";
import Followers from "./component/Followers";
import Bookmark from "./component/Bookmark";
import Groups from "./component/Groups";
import Livestream from "./component/Livestream";
import NotFound from "./component/NotFound";

function App() {
  const location = useLocation();
  const hideHeaderPaths = [
    "/login",
    "/signup",
    "/individualSignUp",
    "/connectSocials",
    "/interestSignup",
  ];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {/* {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/individualSignUp" &&
        location.pathname !== "connectSocials" && <Header />} */}

      {/* <SignUpProvider>
        {!shouldHideHeader && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/individualSignUp" element={<IndividualSignUp />} />
          <Route path="/connectSocials" element={<ConnectSocials />} />
          <Route path="/interestSignup" element={<InterestSignup />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/socialMedia" element={<SocialMedia />} />
          <Route path="/marketPlace" element={<MarketPlace />} />
          <Route path="/discussionForum" element={<DiscussionForum />} />

          <Route path="/monetize" element={<Monetize />} />
          <Route path="/activapost" element={<ActivaPost />} />
          <Route path="/video" element={<Video />} />
          <Route path="/friendsrequest" element={<FrindRequest />} />
          <Route path="/following" element={<Following />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/group" element={<Group />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Routes>
      </SignUpProvider> */}

      {/* <SignUpProvider>
        {!shouldHideHeader && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/individualSignUp" element={<IndividualSignUp />} />
          <Route path="/connectSocials" element={<ConnectSocials />} />
          <Route path="/interestSignup" element={<InterestSignup />} />

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
            path="/follwing"
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
                <Group />
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
        </Routes>
      </SignUpProvider> */}

      {!shouldHideHeader && <Header />}
      <SignUpProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
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
          {/* Protected Routes */}
          {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/individualsignup"
            element={
              <ProtectedRoute>
                <IndividualSignUp />
              </ProtectedRoute>
            }
          /> */}

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
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignUpProvider>
    </>
  );
}
export default App;
