import React, { useState, useEffect } from "react";
import { } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { MenuItem, Select } from "@mui/material";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import { Box, Typography, IconButton } from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";

const SalesAnalyticsChart = () => {
    const [analytics, setAnalytics] = useState([]);
    const [productAnalitics, setProductAnalitics] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState([
        {
            fromDate: dayjs().startOf("month").toDate(),
            toDate: dayjs().endOf("month").toDate(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        getAnalytics();
    }, [selectedRange]);

    const getAnalytics = async () => {
        try {
            const fromDate = dayjs(selectedRange[0].fromDate).format("YYYY-MM-DD");
            const toDate = dayjs(selectedRange[0].toDate).format("YYYY-MM-DD");
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ANALYTICS, {}, {}, { fromDate, toDate });
            if (response.statusCode === 200 && response.data?.salesAnalitics) {
                console.log("API Response:", response.data.salesAnalitics);
                setAnalytics(response.data.salesAnalitics);
                setProductAnalitics(response.data.productAnalitics);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };
    const labels = analytics.map((item) => dayjs(item._id).format("MMM D"));
    const chartData = analytics.map((item) => item.totalSales);

    const data = {
        labels,
        datasets: [
            {
                label: "Product Sale",
                data: chartData,
                backgroundColor: "#ea80fc",
                borderRadius: 8,
                barThickness: 30,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return "$" + value;
                    },
                },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `$ ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "300px", padding: "20px", background: "#fff", borderRadius: "10px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", }}>
                <h5 style={{ marginBottom: "10px" }}>Sales Analytics</h5>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: "20px",
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <CalendarMonthIcon sx={{ fontSize: 18, color: "#333" }} />
                        <Typography variant="body2">
                            {dayjs(selectedRange[0].fromDate).format("MMM D, YYYY")} - {dayjs(selectedRange[0].toDate).format("MMM D, YYYY")}
                        </Typography>
                    </IconButton>
                    {open && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "40px",
                                right: 0,
                                zIndex: 10,
                                background: "#fff",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setSelectedRange([{
                                        fromDate: item.selection.startDate,
                                        toDate: item.selection.endDate,
                                        key: "selection",
                                    }]);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={selectedRange}
                            />
                        </Box>
                    )}
                </Box>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

const ProductAnalyticsChart = () => {
    const [productAnalitics, setProductAnalitics] = useState([]);
    const [selectedRange, setSelectedRange] = useState([
        {
            fromDate: dayjs().startOf("month").toDate(),
            toDate: dayjs().endOf("month").toDate(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        getAnalytics();
    }, [selectedRange]);

    const getAnalytics = async () => {
        try {
            const fromDate = dayjs(selectedRange[0].fromDate).format("YYYY-MM-DD");
            const toDate = dayjs(selectedRange[0].toDate).format("YYYY-MM-DD");
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ANALYTICS, {}, {}, { fromDate, toDate });
            if (response.statusCode === 200 && response.data?.salesAnalitics) {
                console.log("API Response:", response.data.salesAnalitics);
                setProductAnalitics(response.data.productAnalitics);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    const colors = ["#800080", "#D8BFD8", "#00008B", "#FFD700", "#40E0D0", "#FF4500", "#008000"];
    const labels = productAnalitics.map((item) => item.productDetails?.name || "Unknown Product");
    const productData = productAnalitics.map((item) => item.totalSales || 0);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Total Sales",
                data: productData,
                backgroundColor: colors.slice(0, productAnalitics.length),
                barThickness: 30,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return "$" + value;
                    },
                },
            },
        },
        plugins: {
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `$ ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "300px", padding: "20px", background: "#fff", borderRadius: "10px" }}>
            <h5 style={{ marginBottom: "10px" }}>Product Analytics</h5>
            <Bar data={data} options={options} />
        </div>
    );
};

const RevenueOrdersAnalytics = () => {
    const [revenueAnalytics, setRevenueAnalytics] = useState("Month");
    const [ordersAnalytics, setOrdersAnalytics] = useState("Week");
    const [revenue, setRevenue] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedRange, setSelectedRange] = useState([
        {
            fromDate: dayjs().startOf("month").toDate(),
            toDate: dayjs().endOf("month").toDate(),
            key: "selection",
        },
    ]);
    useEffect(() => {
        getAnalytics();
    }, [selectedRange]);

    const getAnalytics = async () => {
        try {
            const fromDate = dayjs(selectedRange[0].fromDate).format("YYYY-MM-DD");
            const toDate = dayjs(selectedRange[0].toDate).format("YYYY-MM-DD");
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ANALYTICS, {}, {}, { fromDate, toDate });
            if (response.statusCode === 200) {
                setRevenue(response.data.revenueAnalitics || []);
                setOrders(response.data.orderAnalitics || []);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    const revenueData = {
        labels: revenue.length ? revenue.map((item, index) => item.month || `Month ${index + 1}`) : ["No Data"],
        datasets: [
            {
                label: "Profit",
                data: revenue.map((item) => item.totalRevenue),
                backgroundColor: "#90EE90",
                borderRadius: 8,
                barThickness: 15,
            },
        ],
    };

    const ordersData = {
        labels: orders.length ? orders.map((item) => item.dayOfWeek) : ["No Data"],
        datasets: [
            {
                label: "Orders",
                data: orders.map((item) => item.orderCount),
                backgroundColor: "#D8BFD8",
                borderRadius: 8,
                barThickness: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value >= 1000 ? value / 1000 + "k" : value;
                    },
                },
            },
        },
        plugins: {
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <>
            <style>
                {`
                    .analytics-container {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        justify-content: center;
                        padding: 10px;
                    }
                    .analytics-card {
                        width: 48%;
                        padding: 20px;
                        background: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .analytics-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .chart-container {
                        height: 250px;
                    }
                    @media (max-width: 1024px) {
                        .analytics-card {
                            width: 100%;
                        }
                    }
                    @media (max-width: 768px) {
                        .analytics-container {
                            flex-direction: column;
                            gap: 10px;
                        }
                        .analytics-card {
                            width: 100%;
                            padding: 15px;
                        }
                    }
                `}
            </style>
            <div className="analytics-container">
                <div className="analytics-card">
                    <div className="analytics-header">
                        <h5>Revenue Analytics</h5>
                        <Select size="small" value={revenueAnalytics} onChange={(e) => setRevenueAnalytics(e.target.value)}>
                            <MenuItem value="Month">Month</MenuItem>
                            <MenuItem value="Week">Week</MenuItem>
                        </Select>
                    </div>
                    <div className="chart-container">
                        <Bar data={revenueData} options={options} />
                    </div>
                </div>
                <div className="analytics-card">
                    <div className="analytics-header">
                        <h5>Orders Analytics</h5>
                        <Select size="small" value={ordersAnalytics} onChange={(e) => setOrdersAnalytics(e.target.value)}>
                            <MenuItem value="Week">Week</MenuItem>
                            <MenuItem value="Month">Month</MenuItem>
                        </Select>
                    </div>
                    <div className="chart-container">
                        <Bar data={ordersData} options={options} />
                    </div>
                </div>
            </div>
            {/* <div className="analytics-container" style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "50%", padding: "20px", background: "#fff", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h5>Revenue Analytics</h5>
                        <Select size="small" value={revenueAnalytics} onChange={(e) => setRevenueAnalytics(e.target.value)}>
                            <MenuItem value="Month">Month</MenuItem>
                            <MenuItem value="Week">Week</MenuItem>
                        </Select>
                    </div>
                    <div style={{ height: "250px" }}>
                        <Bar data={revenueData} options={options} />
                    </div>
                </div>

                <div style={{ width: "50%", padding: "20px", background: "#fff", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h5>Orders Analytics</h5>
                        <Select size="small" value={ordersAnalytics} onChange={(e) => setOrdersAnalytics(e.target.value)}>
                            <MenuItem value="Week">Week</MenuItem>
                            <MenuItem value="Month">Month</MenuItem>
                        </Select>
                    </div>
                    <div style={{ height: "250px" }}>
                        <Bar data={ordersData} options={options} />
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default function Analytics() {
    return (
        <>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <SalesAnalyticsChart /><br /><br />
                            <ProductAnalyticsChart /><br /><br />
                            <RevenueOrdersAnalytics />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
