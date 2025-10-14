import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

const OrderInvoice = () => {
    const navigate = useNavigate();
    const { id: transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        if (transactionId) {
            getAllOrderList(transactionId);
        }
    }, [transactionId]);

    const getAllOrderList = async (transactionId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_TRANSACTION, {}, {}, { transactionId });
            if (response.statusCode === 200) {
                console.log("Response:", response.data);
                setTransaction(response.data);
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const invoiceData = {
        invoiceNumber: "10Y113X4675",
        date: "Nov 11, 2024",
        orderNumber: "#1001",
        orderDate: "Feb 11, 2024",
        customer: {
            name: "John Thomas",
            address: "13th Street, 47 W 13th St, New York, NY 10011, USA"
        },
        items: [
            { name: "Filmora 14 Video Editor - More AI, Videos...", price: 14.99, amount: 14.99 },
            { name: "Filmora 14 Video Editor - More AI, Videos...", price: 3.39, amount: 3.49 },
            { name: "Filmora 14 Video Editor - More AI, Videos...", price: 14.99, amount: 14.99 },
        ],
        subTotal: 68.98,
        transactionFee: 0.02,
        total: 69,
        balanceDue: 0.00,
        paymentMethod: "Card"
    };

    const downloadInvoice = () => {
        const invoiceElement = document.getElementById("invoice");
        html2canvas(invoiceElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            pdf.save(`invoice_${invoiceData.invoiceNumber}.pdf`);
        });
    };

    const handleBack = () => {
        navigate("/orders");
    };

    if (!transaction) return <p>Loading...</p>;
    return (
        <>
            <style>
                {`
                    .invoice-container {
                        max-width: 700px;
                        margin: 5px auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        background: #fff;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        font-family: 'Arial', sans-serif;
                    }
                    .invoice-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-bottom: 10px;
                    }
                    .invoice-header h1 {
                        font-size: 45px;
                        font-weight: bold;
                    }
                    .company-address {
                        font-size: 14px;
                        color: #555;
                    }
                    .invoice-details {
                        display: flex;
                        justify-content: space-between;
                        margin: 20px 0;
                        font-size: 14px;
                    }
                    .invoice-details p {
                        margin: 5px 0;
                    }
                    .invoice-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .invoice-table td {                        
                        padding: 10px;
                        text-align: left !important;
                        font-size: 14px;
                    }
                    .invoice-table th {
                        background: #F5E6F6;
                        color: #333;
                        font-weight: bold;
                        padding: 10px;
                        text-align:left;
                        font-size: medium;
                    }
                    .invoice-summary {
                        text-align: right;
                        margin-top: 20px;
                    }
                    .invoice-summary p {
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .balance-due {
                        display: inline-block;
                        background: #F5E6F6;
                        padding: 5px 10px;
                        border-radius: 5px;
                    }
                    .download-btn {
                        display: block;                        
                        background: linear-gradient(to right, rgb(154, 0, 169), rgb(88, 0, 151), rgb(41, 0, 139));
                        color: #fff;
                        padding: 5px;
                        text-align: center;
                        border: none;
                        border-radius: 30px;
                        font-size: 16px;
                        cursor: pointer;
                        margin: 20px auto;
                        width: fit-content;
                    }
                    .download-btn:hover {
                        background: #036dcf;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" /> Invoice</h6>
                            <div className="invoice-container" id="invoice">
                                <div className="invoice-header">
                                    <div style={{ flexGrow: 1, borderBottom: "2px solid black", marginRight: "30px" }}></div>
                                    <h1>Invoice</h1>
                                </div>
                                <div className="company-logo">
                                    <img src="../assets/images/marketplace/sidebar/activatreelogo.png" alt="Activatree Logo" />
                                </div>
                                <p className="company-address">State of Georgia, U.S.A.</p>
                                <div className="invoice-details">
                                    <div>
                                        <p>Bill To</p>
                                        <p className="customer-name"><strong>{transaction.buyer?.fullName}</strong></p>
                                        <p>{transaction.buyer?.email}</p>
                                        {/* {invoiceData.customer.address.match(/.{1,50}/g)?.map((chunk, index) => (
                                            <p key={index}>{chunk}</p>
                                        ))} */}
                                        <p>{transaction.buyer?.address}</p>
                                    </div>
                                    <div className="invoice-meta">
                                        <p>Invoice no: <strong>INV-{transaction._id.slice(-6).toUpperCase()}</strong></p>
                                        <p>Date: <strong> {new Date(transaction?.transactionDate).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}</strong></p>
                                        {/* <p>Order no: <strong> {transaction.product?._id}</strong></p> */}
                                    </div>
                                </div>
                                <table className="invoice-table">
                                    <thead>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{transaction.product?.name}</td>
                                            <td>${transaction.product?.price}</td>
                                            <td>${transaction.amount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="invoice-summary">
                                    <p>Sub Total: ${transaction.amount}</p>
                                    <p>Transaction Fee: ${transaction.stripeFee}</p>
                                    <p className="total"><strong>Total:</strong> ${transaction.totalAmount}</p>
                                    <p className="balance-due"><strong>Balance Due:</strong> ${invoiceData.balanceDue.toFixed(2)}</p>
                                </div>
                            </div>
                            <button onClick={downloadInvoice} className="download-btn">Download Invoice</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default OrderInvoice;
