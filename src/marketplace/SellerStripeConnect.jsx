import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const SellerStripeConnect = () => {
  const [status, setStatus] = useState("Inactive");
  const [statusClass, setStatusClass] = useState("status-inactive");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [requiredInfo, setRequiredInfo] = useState([]);
  useEffect(() => {
    getAccountStatus();
  }, []);

  const getAccountStatus = async () => {
    try {
      const response = await networkRequest(
        "GET",
        API_ENDPOINTS.GET_ACCOUNT_STATUS,
        {},
        {},
        {}
      );
      if (response.statusCode === 200) {
        console.log("Response:", response.data);
        setStatus(response.data.isActive ? "Active" : "Inactive");
        setStatusClass(
          response.data.isActive ? "status-active" : "status-inactive"
        );
        setPaymentStatus(
          response.data.chargesEnabled && response.data.payoutsEnabled
        );
        setIsConnected(true);
        setRequiredInfo(response.data.requirements?.currently_due || []);
      } else {
        console.log("Unknown status:", response);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
      if (error.response?.status === 404) {
        setStatus("Inactive");
        setStatusClass("status-inactive");
        setPaymentStatus(false);
        setIsConnected(false);
        setRequiredInfo([]);
      }
    }
  };

  const accountCreate = async () => {
    try {
      const response = await networkRequest(
        "POST",
        API_ENDPOINTS.ACCOUNT_CREATE
      );
      if (response.statusCode == 201) {
        window.open(response.data, "_blank", "noopener,noreferrer");
        console.log("Account Created Successfully:", response.data);
      } else {
        console.error("Failed to create account:", response);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const dashboard = async () => {
    try {
      const response = await networkRequest("GET", API_ENDPOINTS.DASHBOARD);
      if (response.statusCode === 200) {
        console.log("Dashboard Data:", response.data);
        window.open(response.data, "_blank");
      } else {
        console.error("Failed to fetch dashboard data:", response);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <>
      <style>
        {`
                    .dashboard-header {
                        background: #9A00A9;
                        color: white;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                    }

                    .dashboard-header h2 {
                        margin: 0;
                        font-size: 22px;
                        font-weight: bold;
                    }

                    .dashboard-header p {
                        font-size: 14px;
                        color: white;
                    }

                    .content-box {
                        padding: 20px;
                        background: white;
                        border-radius: 0 0 8px 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }

                    .button-group {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 20px;
                    }

                    .btn-create {
                        background: #2563EB;
                        color: white;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .btn-view {
                        border: 1px solid #ccc;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .status-grid {
                        display: flex;
                        gap: 15px;
                        margin-bottom: 20px;
                    }

                    .status-box {
                        border: 1px solid #ccc;
                        padding: 15px;
                        border-radius: 5px;
                        width: 100%;
                    }
                    
                    .status-active {
                        color: green;
                        font-weight: bold;
                    }

                    .status-inactive {
                        color: red;
                        font-weight: bold;
                    }

                    .status-success {
                        color: green;
                        font-weight: bold;
                    }

                    .status-failure {
                        color: red;
                        font-weight: bold;
                    }

                    .required-info {
                        background: #FEF3C7;
                        padding: 15px;
                        border-left: 4px solid #D97706;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }

                    .btn-complete {
                        background: #D97706;
                        color: white;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 10px;
                    }

                    .bottom-buttons {
                        display: flex;
                        gap: 10px;
                    }

                    .btn-dashboard {
                        background: #9A00A9;
                        color: white;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 30px;
                        cursor: pointer;
                    }

                    .btn-refresh {
                        background: #E5E7EB;
                        color: black;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 30px;
                        cursor: pointer;
                    }
                `}
      </style>
      <main className="main-content">
        <div className="container">
          <div className="row">
            <MarketPlaceSidebar />
            <div className="col-xl-9 col-lg-8">
              <div className="seller-dashboard">
                <div className="dashboard-header">
                  <h2>Seller Dashboard</h2>
                  <p>Manage your seller profile and payment settings</p>
                </div>
                <div className="content-box">
                  <div className="status-grid">
                    <div className="status-box">
                      <h5>Account Status</h5>
                      <p className={statusClass}>
                        {status === "Active" ? "● Active" : "● Inactive"}
                      </p>
                    </div>
                    <div className="status-box">
                      <h5>Payment Capability</h5>
                      <p
                        className={
                          paymentStatus ? "status-success" : "status-failure"
                        }
                      >
                        {paymentStatus
                          ? "✔ Can accept payments"
                          : "❌ Cannot accept payments"}
                      </p>
                      <p
                        className={
                          paymentStatus ? "status-success" : "status-failure"
                        }
                      >
                        {paymentStatus
                          ? "✔ Can receive payouts"
                          : "❌ Cannot receive payouts"}
                      </p>
                    </div>
                  </div>
                  <div className="required-info">
                    <h5>Required Information</h5>
                    {requiredInfo.length > 0 ? (
                      <>
                        <p>Currently Required:</p>
                        <ul>
                          {requiredInfo.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <button
                          className="btn-complete"
                          onClick={accountCreate}
                        >
                          Complete Requirements
                        </button>
                      </>
                    ) : (
                      <p>No additional information required.</p>
                    )}
                  </div>
                  <div className="bottom-buttons">
                    <button className="btn-refresh" onClick={dashboard}>
                      Seller Dashboard
                    </button>
                    <button
                      className="btn-dashboard"
                      onClick={accountCreate}
                      disabled={isConnected}
                    >
                      {isConnected ? "Connected" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SellerStripeConnect;
