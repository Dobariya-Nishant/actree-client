import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function ProductPaymentDetail() {
    const navigate = useNavigate();
    const { id: transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        getTransaction(transactionId);
    }, [transactionId]);

    const getTransaction = async (transactionId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_TRANSACTION, {}, {}, { transactionId });
            if (response.statusCode === 200) {
                console.log("response", response.data);
                setTransaction(response.data);
            }
        } catch (error) {
            console.error("Error fetching payment detail:", error);
        }
    };

    const handleBack = () => {
        navigate("/paymentlist");
    };

    return (
        <>
            <style>
                {`
                    .form-container {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                    }
                    .form-control {
                        border-radius: 30px;
                    }
                    .order-summary-box,
                    .payment-box {
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 15px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                        margin: 5px 10px 10px 10px;
                    }
                    .order-details-table td {
                        vertical-align: middle;
                    }
                    .no-gap {
                        display: flex;
                        gap: 8px;
                    }
                    .product-image {
                        margin-right: 0;
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        object-fit: cover;
                    }
                    .fw-bold-header {
                        font-weight: 600;
                    }
                    .table-no-border th {
                        background-color: #f3e0ff;
                        color:rgb(22, 20, 24);
                        border: none !important;
                    }
                    table-no-border td {
                        border: none !important;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" /> Payment Detail</h6>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="form-container">
                                        <span className="fw-bold-header">Order Id: #{transaction?._id}</span>
                                        <div className="text-muted">
                                            {new Date(transaction?.transactionDate).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "2-digit",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <hr />
                                        <div className="mb-4">
                                            <h6 className="mb-3">Product Summary</h6>
                                            <div className="table-responsive">
                                                <table className="table table-no-border">
                                                    <thead>
                                                        <tr>
                                                            <th>Item</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="no-gap">
                                                                <img
                                                                    src={transaction?.product?.displayMedia[0]?.url || ""}
                                                                    alt={transaction?.product?.name || "Product"}
                                                                    className="product-image"
                                                                />
                                                                <div>
                                                                    <div className="fw-bold">{transaction?.product?.name}</div>
                                                                </div>
                                                            </td>
                                                            <td className="fw-bold text-start">${transaction?.amount}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-container">
                                        <div className="d-flex justify-content-between">
                                            <span>Payment ID:</span>
                                            <span>#{transaction?._id}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Payment Date:</span>
                                            <span>
                                                {new Date(transaction?.transactionDate).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Payment Status:</span>
                                            <span
                                                style={{
                                                    backgroundColor: transaction?.paymentStatus === "completed" ? "#D1FFCC" : "#FFCCCB",
                                                    color: transaction?.paymentStatus === "completed" ? "#3DB22F" : "#D9534F",
                                                    padding: "0px 10px",
                                                    borderRadius: "30px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    height: "30px",
                                                }}
                                            >
                                                {transaction?.paymentStatus}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Amount:</span>
                                            <span>${transaction?.totalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="form-container">
                                        <h6 className="mb-3">Customer</h6><hr></hr>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={transaction?.buyer?.profilePicture || ""}
                                                alt="Product"
                                                style={{
                                                    borderRadius: "30px",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <div className="">
                                                <h6 className="mb-1">{transaction?.buyer?.userName}</h6>
                                                <span className="mb-0">{transaction?.buyer?.userName}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Email:</span>
                                            <span>{transaction?.buyer?.email}</span>
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
