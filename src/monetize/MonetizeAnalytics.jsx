import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocialSidebar from "../component/SocialSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

import "./MonetizeAnalytics.css";

function MonetizeAnalytics() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [suggestList, setSuggestList] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("reloadAfterLogin") === "true") {
            localStorage.removeItem("reloadAfterLogin");
            window.location.reload();
        }
        getAllSuggest();
    }, []);

    const getAllFollowing = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_FOLLOWING, {}, {}, { type: "followings" });
            if (response.statusCode === 200) {
                console.log(response.data);
                const followingsList = response.data.followings || [];
                setFollowingCount(followingsList.length > 0 ? followingsList.length : 0);
            } else {
                console.error("Error: Response status is not 200", response);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const getAllSuggest = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_SUGGEST, {}, {});
            if (response.statusCode === 200) {
                const filteredSuggestions = (response.data || []).filter(
                    (suggestedUser) => suggestedUser._id !== user._id
                );
                setSuggestList(filteredSuggestions);
                getAllFollowing();
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleFollowToggle = async (userId) => {
        try {
            if (followedUsers.includes(userId)) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_UNFOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    console.log("Unfollowed successfully!");
                    setFollowedUsers((prevFollowedUsers) =>
                        prevFollowedUsers.filter((id) => id !== userId)
                    );
                    getAllFollowing();
                } else {
                    console.error("Failed to unfollow");
                }
            } else {
                const response = await networkRequest("POST", API_ENDPOINTS.POST_FOLLOW, { followedId: userId });
                if (response.statusCode === 201) {
                    console.log("Followed successfully!");
                    setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
                    getAllFollowing();
                } else {
                    console.error("Failed to follow");
                }
            }
        } catch (error) {
            console.error("Error in follow/unfollow operation:", error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    // Line Chart Data
    const audienceData = [
        { date: "Apr 1", value: 28000 },
        { date: "Apr 4", value: 39000 },
        { date: "Apr 7", value: 42000 },
        { date: "Apr 11", value: 33000 },
        { date: "Apr 14", value: 14000 },
        { date: "Apr 17", value: 28000 },
        { date: "Apr 20", value: 31000 },
        { date: "Apr 24", value: 29000 },
        { date: "Apr 27", value: 27000 },
        { date: "Apr 30", value: 35000 },
    ];

    // Bar Chart Data
    const ageData = [
        { range: "18–24", female: 10, male: 7 },
        { range: "25–34", female: 8, male: 5 },
        { range: "35–44", female: 22, male: 14 },
        { range: "45–54", female: 6, male: 3 },
        { range: "55–64", female: 7, male: 5 },
        { range: "65+", female: 25, male: 8 },
    ];

    const earningsData = [
        { day: "Apr 1", value: 5000 },
        { day: "Apr 4", value: 15000 },
        { day: "Apr 7", value: 5000 },
        { day: "Apr 11", value: 5000 },
        { day: "Apr 14", value: 10000 },
        { day: "Apr 17", value: 22000 },
        { day: "Apr 21", value: 16000 },
        { day: "Apr 24", value: 19000 },
        { day: "Apr 27", value: 9000 },
        { day: "Apr 30", value: 14000 },
    ];

    const activityData = [
        {
            day: "Apr 1",
            d30: 33000,
            d7: 15000,
            d1: 8000,
        },
        {
            day: "Apr 4",
            d30: 31000,
            d7: 10000,
            d1: 5000,
        },
        {
            day: "Apr 7",
            d30: 32000,
            d7: 20000,
            d1: 5000,
        },
        {
            day: "Apr 11",
            d30: 33000,
            d7: 25000,
            d1: 10000,
        },
        {
            day: "Apr 14",
            d30: 31000,
            d7: 20000,
            d1: 15000,
        },
        {
            day: "Apr 17",
            d30: 35000,
            d7: 18000,
            d1: 22000,
        },
        {
            day: "Apr 21",
            d30: 30000,
            d7: 8000,
            d1: 18000,
        },
        {
            day: "Apr 24",
            d30: 29000,
            d7: 12000,
            d1: 12000,
        },
        {
            day: "Apr 27",
            d30: 31000,
            d7: 15000,
            d1: 7000,
        },
        {
            day: "Apr 30",
            d30: 30000,
            d7: 18000,
            d1: 14000,
        },
    ];

    const engagementTimeData = [
        { day: "Apr 1", secs: 300 },   // 5m 00s
        { day: "Apr 5", secs: 420 },   // 7m 00s
        { day: "Apr 9", secs: 360 },   // 6m 00s
        { day: "Apr 12", secs: 320 },  // 5m 20s
        { day: "Apr 15", secs: 460 },  // 7m 40s
        { day: "Apr 18", secs: 540 },  // 9m 00s (spike)
        { day: "Apr 21", secs: 420 },  // 7m 00s
        { day: "Apr 25", secs: 360 },  // 6m 00s
        { day: "Apr 28", secs: 600 },  // 10m 00s (spike)
        { day: "Apr 30", secs: 480 },  // 8m 00s
    ];

    // retention: percent over days (Day 2...Day 42)
    const retentionData = [
        { dayLabel: "Day 2", value: 18 },
        { dayLabel: "Day 9", value: 60 },
        { dayLabel: "Day 16", value: 12 },
        { dayLabel: "Day 23", value: 22 },
        { dayLabel: "Day 30", value: 18 },
        { dayLabel: "Day 37", value: 30 },
        { dayLabel: "Day 42", value: 24 }
    ];

    const pageViews = [
        { title: "Home page", views: 30 },
        { title: "Social media page", views: 13 },
        { title: "E-book marketplace page", views: 22 }
    ];

    const events = [
        { name: "Home page", count: 3 },
        { name: "About us", count: 5 },
        { name: "Log in", count: 1 },
        { name: "Social Media", count: 10 },
        { name: "Post Comment", count: 18 }
    ];

    // helper to format seconds -> "Xm Ys"
    const formatSecondsToMinSec = (s) => {
        if (s == null) return "";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}m ${sec < 10 ? "0" : ""}${sec}s`;
    };



    const revenueData = [
        { date: "Apr 5", value: 5 },
        { date: "Apr 10", value: 6 },
        { date: "Apr 15", value: 5 },
        { date: "Apr 20", value: 5 },
        { date: "Apr 25", value: 6 },
        { date: "Apr 30", value: 7 }
    ];

    const retentionData2 = [
        { date: "Apr 5", newUsers: 2, returningUsers: 1 },
        { date: "Apr 10", newUsers: 1, returningUsers: 2 },
        { date: "Apr 15", newUsers: 3, returningUsers: 1.5 },
        { date: "Apr 20", newUsers: 1.2, returningUsers: 2.2 },
        { date: "Apr 25", newUsers: 1.8, returningUsers: 1.2 },
        { date: "Apr 30", newUsers: 2, returningUsers: 1.3 }
    ];



    return (
        <>
            <main className="main-content">
                <div className="container sidebar-toggler">
                    <div className="row">
                        <SocialSidebar />
                        <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">

                            <div className="filter-head d-center justify-content-between">
                                <div className="d-center">
                                    <button
                                        onClick={goBack}
                                        className="cmn-btn third gap-1 me-3"
                                        style={{
                                            backgroundColor: "#F5E6F6",
                                            color: "#9A00A9",
                                            borderRadius: "30px",
                                        }}
                                    >
                                        <img
                                            className="avatar-img max-un me-3"
                                            src="assets/images/socialsidebar/arrow.png"
                                            alt="icon"
                                            style={{ marginLeft: "-5px" }}
                                        />
                                    </button>
                                    <h6>Monetisation Result and Analytics</h6>
                                </div>
                            </div>

                            <div className="post-item d-flex flex-column gap-5" id="news-feed">
                                <div className="post-single-box p-3 p-sm-5" style={{ borderRadius: "16px" }}>

                                    <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                                        <div className="col-lg-6">
                                            <select
                                                className="form-select"
                                                style={{
                                                    borderRadius: "12px",
                                                    height: "45px",
                                                }}
                                            >
                                                <option>All Ads</option>
                                            </select>

                                            <div
                                                className="d-flex align-items-center justify-content-between px-3"
                                                style={{
                                                    border: "1px solid #ddd",
                                                    borderRadius: "12px",
                                                    height: "45px",
                                                    width: "260px",
                                                    marginLeft: "110%",
                                                    marginTop: "-40px",
                                                }}
                                            >
                                                <span>📅</span>
                                                <span>Apr 1, 2025 – Apr 30, 2025</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <div className="p-3 rounded shadow-sm bg-white" style={{ borderRadius: "14px" }}>
                                                <p className="text-muted mb-1" style={{ fontWeight: 500 }}>Reach</p>
                                                <h3 style={{ fontWeight: 500, fontSize: "30px" }}>10k</h3>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="p-3 rounded shadow-sm bg-white" style={{ borderRadius: "14px" }}>
                                                <p className="text-muted mb-1" style={{ fontWeight: 500 }}>Impressions</p>
                                                <h3 style={{ fontWeight: 500, fontSize: "30px" }}>10</h3>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="p-3 rounded shadow-sm bg-white" style={{ borderRadius: "14px" }}>
                                                <p className="text-muted mb-1" style={{ fontWeight: 500 }}>Estimated Audience</p>
                                                <h3 style={{ fontWeight: 500, fontSize: "30px" }}>5k</h3>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded shadow-sm bg-white mb-4" style={{ borderRadius: "16px" }}>
                                        <h6 className="mb-3" style={{ fontWeight: 600 }}>Audience analytics</h6>

                                        <div style={{ width: "100%", height: "260px" }}>
                                            <ResponsiveContainer>
                                                <LineChart data={audienceData}>
                                                    {/* horizontal dotted lines like image */}
                                                    <CartesianGrid vertical={false} stroke="#D9D9D9" strokeDasharray="4 4" />

                                                    {/* bottom dates */}
                                                    <XAxis
                                                        dataKey="date"
                                                        tick={{ fontSize: 12, fontWeight: 500 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />

                                                    {/* left Y numbers same spacing like image */}
                                                    <YAxis
                                                        tick={{ fontSize: 12, fontWeight: 500 }}
                                                        tickFormatter={(v) => `${v / 1000}k`}
                                                        domain={[0, 50000]}
                                                        ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />

                                                    <Tooltip
                                                        formatter={(v) => `${v.toLocaleString()}`}
                                                    />

                                                    {/* Purple smooth line exactly like image */}
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#C025FF"
                                                        strokeWidth={3}
                                                        dot={{
                                                            r: 6,
                                                            fill: "#ffffff",
                                                            stroke: "#C025FF",
                                                            strokeWidth: 3,
                                                        }}
                                                        activeDot={{
                                                            r: 7,
                                                            fill: "#fff",
                                                            stroke: "#C025FF",
                                                            strokeWidth: 4
                                                        }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded shadow-sm bg-white mb-4" style={{ borderRadius: "16px" }}>
                                        <div className="d-flex justify-content-between mb-3">
                                            <h6 style={{ fontWeight: 600 }}>Age & Gender</h6>

                                            <div className="d-flex gap-3">
                                                <span className="d-flex align-items-center gap-1">
                                                    <span style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        background: "#3B82F6"
                                                    }}></span>
                                                    Female
                                                </span>

                                                <span className="d-flex align-items-center gap-1">
                                                    <span style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        background: "#000"
                                                    }}></span>
                                                    Male
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ width: "100%", height: "260px" }}>
                                            <ResponsiveContainer>
                                                <BarChart data={ageData} barGap={6}>
                                                    <CartesianGrid vertical={false} stroke="#E6E6E6" />
                                                    <YAxis
                                                        ticks={[20, 25, 40, 55, 70, 85, 100]}
                                                        domain={[0, 100]}
                                                        tickFormatter={(v) => `${v}%`}
                                                        tick={{ fontSize: 12, fontWeight: 500 }}
                                                    />
                                                    <XAxis
                                                        dataKey="range"
                                                        tick={{ fontSize: 12, fontWeight: 500 }}
                                                    />

                                                    <Tooltip formatter={(v) => `${v}%`} />

                                                    <Bar dataKey="female" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="male" fill="#000" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded shadow-sm bg-white mb-4" style={{ borderRadius: "16px" }}>
                                        <h6 className="mb-3" style={{ fontWeight: 600 }}>Impression shown by pages</h6>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Pages Name</th>
                                                    <th>Impression</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>Home</td><td>10</td></tr>
                                                <tr><td>Social Media</td><td>03</td></tr>
                                                <tr><td>Marketplace</td><td>01</td></tr>
                                                <tr><td>Cardstudio</td><td>01</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="analytics-container mt-4">

                                        {/* Estimated Earnings */}
                                        <div className="card-box">
                                            <div className="card-head">
                                                <h3>Estimated earnings</h3>
                                                <span className="earn-text">$ 30,000 Estimated Earnings</span>
                                            </div>

                                            <div className="chart-wrapper">
                                                <ResponsiveContainer width="100%" height={220}>
                                                    <LineChart data={earningsData}>
                                                        <CartesianGrid stroke="#ECECEC" vertical={false} />
                                                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                                        <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
                                                        <Tooltip />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="value"
                                                            stroke="#5607FF"
                                                            strokeWidth={3}
                                                            dot={false}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Analytics Title */}
                                        <h5 className="mt-4">Analytics</h5>

                                        {/* User Activity Over Time */}
                                        <div className="card-box mt-2">
                                            <div className="card-head">
                                                <h3>User activity over time</h3>

                                                <div className="legend">
                                                    <span><span className="dot purple"></span>30 days</span>
                                                    <span><span className="dot green"></span>7 days</span>
                                                    <span><span className="dot orange"></span>1 day</span>
                                                </div>
                                            </div>

                                            <div className="chart-wrapper">
                                                <ResponsiveContainer width="100%" height={250}>
                                                    <LineChart data={activityData}>
                                                        <CartesianGrid stroke="#ECECEC" vertical={false} />
                                                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                                        <YAxis tickFormatter={(v) => `${v / 1000}k`} />
                                                        <Tooltip />

                                                        <Line type="monotone" dataKey="d30" stroke="#7A4DF5" strokeWidth={3} dot={false} />
                                                        <Line type="monotone" dataKey="d7" stroke="#4BAF73" strokeWidth={3} dot={false} />
                                                        <Line type="monotone" dataKey="d1" stroke="#FF7A3D" strokeWidth={3} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Bottom Cards */}
                                        <div className="bottom-cards">
                                            <div className="small-card">
                                                <h4>Active users in last 30 minutes</h4>
                                                <h1>0</h1>
                                            </div>

                                            <div className="small-card">
                                                <h4>Active users per minutes</h4>
                                                <h1>0</h1>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="analytics-container mt-4">
                                        {/* <div className="ad-row top-row"> */}
                                        <div className="card large-card">
                                            <div className="card-head">
                                                <div className="chips">
                                                    <span className="chip purple">Average engagement time per active user</span>
                                                    <span className="chip gray">Engaged sessions per active user</span>
                                                </div>
                                                <div className="metrics">
                                                    <div className="metric-left">
                                                        <div className="big-number">4m 40s</div>
                                                    </div>
                                                    <div className="metric-right">
                                                        <div className="small-number">1.5</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="chart-area">
                                                <ResponsiveContainer width="100%" height={260}>
                                                    <LineChart data={engagementTimeData} margin={{ left: 12, right: 12, top: 6, bottom: 6 }}>
                                                        <CartesianGrid stroke="#ECECEC" vertical={false} strokeDasharray="4 4" />
                                                        <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                                        <YAxis
                                                            tickFormatter={(v) => formatSecondsToMinSec(v)}
                                                            tick={{ fontSize: 12 }}
                                                            domain={[0, "dataMax + 100"]}
                                                            axisLine={false}
                                                            tickLine={false}
                                                        />
                                                        <Tooltip labelFormatter={(l) => l} formatter={(value) => formatSecondsToMinSec(value)} />
                                                        <Line type="monotone" dataKey="secs" stroke="#1E90FF" strokeWidth={3} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        {/* </div> */}

                                        <div className="analytics-container mt-4">
                                            <div className="card full-card">
                                                <div className="card-head simple">
                                                    <h4>User retention</h4>
                                                    <div className="muted">Last 42 days ending Oct 10</div>
                                                </div>

                                                <div className="chart-area">
                                                    <ResponsiveContainer width="100%" height={220}>
                                                        <LineChart data={retentionData} margin={{ left: 12, right: 12, top: 6, bottom: 6 }}>
                                                            <CartesianGrid stroke="#ECECEC" vertical={false} strokeDasharray="4 4" />
                                                            <XAxis dataKey="dayLabel" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                                            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} domain={[0, 100]} axisLine={false} tickLine={false} />
                                                            <Tooltip formatter={(v) => `${v}%`} />
                                                            <Line type="monotone" dataKey="value" stroke="#2EA7FF" strokeWidth={3} dot={false} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ad-row bottom-row mt-4">
                                            <div className="card small-card">
                                                <h5>View by page title & screen class</h5>
                                                <div className="table">
                                                    {pageViews.map((p) => (
                                                        <div className="table-row" key={p.title}>
                                                            <div className="left">{p.title}</div>
                                                            <div className="right">{p.views}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="card small-card">
                                                <h5>Event count by event name</h5>
                                                <div className="table">
                                                    {events.map((e) => (
                                                        <div className="table-row" key={e.name}>
                                                            <div className="left">{e.name}</div>
                                                            <div className="right">{String(e.count).padStart(2, "0")}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="analytics-container">
                                        <div className="card">
                                            <div className="revenue-tabs">
                                                <span className="revenue-tab active">Total revenue</span>
                                                <span className="revenue-tab">Purchase revenue</span>
                                                <span className="revenue-tab">Total ad revenue</span>
                                                <span className="revenue-tab">Average purchase revenue</span>
                                            </div>
                                            <h3 className="revenue-amount">$0.00</h3>
                                            <div className="chart-wrapper">
                                                <ResponsiveContainer>
                                                    <LineChart data={revenueData}>
                                                        <CartesianGrid stroke="#efefef" />
                                                        <XAxis dataKey="date" />
                                                        <YAxis tickFormatter={(v) => `$${v}k`} />
                                                        <Tooltip />
                                                        <Line type="monotone" dataKey="value" stroke="#4b7efe" strokeWidth={2} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="two-column">
                                            <div className="card">
                                                <h3 className="section-title">Active users by country</h3>
                                                <table className="data-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Country</th>
                                                            <th>Active users</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td>India</td><td>10</td></tr>
                                                        <tr><td>United State</td><td>03</td></tr>
                                                        <tr><td>Australia</td><td>01</td></tr>
                                                        <tr><td>Italy</td><td>01</td></tr>
                                                        <tr><td>Malaysia</td><td>04</td></tr>
                                                        <tr><td>Nigeria</td><td>06</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="card">
                                                <h3 className="section-title">Active users by device model</h3>
                                                <table className="data-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Device model</th>
                                                            <th>Active Users</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td>24MC N151</td><td>05</td></tr>
                                                        <tr><td>MacBook Pro M4</td><td>02</td></tr>
                                                        <tr><td>Avita Liber V14</td><td>01</td></tr>
                                                        <tr><td>Asus Vivobook S16</td><td>01</td></tr>
                                                        <tr><td>Dell Inspiron 5440</td><td>03</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-head simple">
                                                <h4>User retention</h4>
                                            </div>
                                            <div className="retention-tabs">
                                                <span className="active">New Users</span>
                                                <span>Returning Users</span>
                                            </div>
                                            <div className="retention-counts">
                                                <div>
                                                    <h2>6</h2>
                                                    <p>New Users</p>
                                                </div>
                                                <div>
                                                    <h2>9</h2>
                                                    <p>Returning Users</p>
                                                </div>
                                            </div>
                                            <div className="chart-wrapper">
                                                <ResponsiveContainer>
                                                    <LineChart data={retentionData2}>
                                                        <CartesianGrid stroke="#efefef" />
                                                        <XAxis dataKey="date" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Line type="monotone" dataKey="newUsers" stroke="#a855f7" strokeWidth={2} />
                                                        <Line type="monotone" dataKey="returningUsers" stroke="#4b7efe" strokeWidth={2} />
                                                    </LineChart>
                                                </ResponsiveContainer>
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
                                                {Array.isArray(suggestList) && suggestList.length > 0 ? (
                                                    suggestList.map((suggestedUser) => (
                                                        <div key={suggestedUser._id} className="profile-area d-center position-relative align-items-center justify-content-between">
                                                            <div className="avatar-item d-flex gap-3 align-items-center">
                                                                <div className="avatar-item">
                                                                    <img
                                                                        className="avatar-img max-un"
                                                                        src={suggestedUser.profilePicture || "assets/images/avatar-14.png"}
                                                                        alt="avatar"
                                                                        style={{ borderRadius: "50px", width: "40px", height: "40px" }}
                                                                    />
                                                                </div>
                                                                <div className="info-area">
                                                                    <h6 className="m-0">
                                                                        <Link to={suggestedUser?._id === user?._id ? "/profile" : `/accountProfile/${suggestedUser?.userName}`}>
                                                                            {suggestedUser?.userName}
                                                                        </Link>
                                                                    </h6>
                                                                    <p className="mdtxt">@{suggestedUser.userName}</p>
                                                                </div>
                                                            </div>

                                                            <div className="btn-group cus-dropdown dropend">
                                                                <button
                                                                    className="cmn-btn"
                                                                    style={{
                                                                        borderRadius: "50px",
                                                                        backgroundColor: followedUsers.includes(suggestedUser._id) ? "#D0F0E8" : "#F5E6F6",
                                                                        color: followedUsers.includes(suggestedUser._id) ? "#007B5F" : "#9A00A9",
                                                                    }}
                                                                    onClick={() => handleFollowToggle(suggestedUser._id)}
                                                                    onMouseEnter={(e) => {
                                                                        if (followedUsers.includes(suggestedUser._id)) {
                                                                            e.target.textContent = "Unfollow";
                                                                        }
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        if (followedUsers.includes(suggestedUser._id)) {
                                                                            e.target.textContent = "Following";
                                                                        }
                                                                    }}
                                                                >
                                                                    {followedUsers.includes(suggestedUser._id) ? "Following" : "Follow"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No suggestions available</p>
                                                )}
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

export default MonetizeAnalytics;