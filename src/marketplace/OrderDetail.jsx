import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function OrderDetail() {
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
        navigate("/orders");
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
                    .btn-download {
                        background: linear-gradient(to right, rgb(154, 0, 169), rgb(88, 0, 151), rgb(41, 0, 139));
                        color: #fff;
                        border: none;
                        border-radius: 20px;
                        padding: 5px 20px;
                    }
                    .btn-download:hover {
                        background: #036dcf;
                        color: #fff;
                        cursor: pointer;
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
                        font-size: medium;
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
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" /> Order Detail</h6>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-container">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="fw-bold-header">Order Id: #{transaction?._id}</span>
                                                <div className="text-muted">
                                                    {new Date(transaction?.transactionDate).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                            </div>
                                            <Link to={`/orderDownloadInvoice/${transaction?._id}`} className="btn btn-download">Download Invoice</Link>
                                        </div>
                                        <hr />
                                        <div className="mb-4">
                                            <h6 className="mb-3">Product Summary</h6>
                                            <div className="table-responsive">
                                                <table className="table table-no-border">
                                                    <thead>
                                                        <th>Item</th>
                                                        <th>Price</th>
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
                                                                    <div className="">{transaction?.product?.name}</div>
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
                                <div className="col-md-4">
                                    <div className="form-container">
                                        <h6 className="mb-3">Order Summary</h6><hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <span>${transaction?.amount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Transaction Fee</span>
                                            <span>${transaction?.stripeFee}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Infina Tips</span>
                                            <span>${transaction?.tipAmount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Tax</span>
                                            <span>{transaction?.taxAmount}%</span>
                                        </div><hr />
                                        <div className="d-flex justify-content-between">
                                            <h6>Total</h6>
                                            <h6>${transaction?.totalAmount}</h6>
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
