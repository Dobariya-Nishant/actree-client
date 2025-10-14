import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, InputGroup } from "react-bootstrap";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function PaymentHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [user] = useState(JSON.parse(localStorage.getItem("user")) || {}); //setUser
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 10;

    useEffect(() => {
        if (user._id) {
            getOrderTransaction(user._id);
        }
    }, [user._id]);

    const getOrderTransaction = async (buyerId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_TRANSACTION, {}, {}, { buyerId });
            if (response.statusCode === 200) {
                console.log("response", response.data);
            }
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const payments = [
        {
            id: "1001",
            date: "Jun 11, 2024, 08:22 AM",
            product: "Filmora 14 Video Editor - More AI, Videos...",
            recipient: "Justus_Everett",
            price: "$14.99",
            status: "Success",
        },
        {
            id: "1002",
            date: "Jun 10, 2024, 08:40 AM",
            product: "Relax with these seriously laid-back classics.",
            recipient: "Billy_Williams",
            price: "$6.33",
            status: "Failed",
        },
    ];

    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const filteredPayments = payments.filter((payment) =>
        payment.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentPayments = filteredPayments.slice(
        indexOfFirstPayment,
        indexOfLastPayment
    );
    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    const renderStatus = (status) => {
        if (status === "Success") {
            return (
                <span
                    style={{
                        backgroundColor: "#D1FFCC",
                        color: "#3DB22F",
                        padding: "0px 10px",
                        borderRadius: "30px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        height: "30px",
                    }}
                >
                    {status}
                </span>
            );
        } else if (status === "Failed") {
            return (
                <span
                    style={{
                        backgroundColor: "#FDD7D4",
                        color: "#FA1702",
                        padding: "0px 10px",
                        borderRadius: "30px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        height: "30px",
                    }}
                >
                    {status}
                </span>
            );
        }
        return null;
    };

    return (
        <>
            <style>
                {`
                    .orders-container {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }

                    .table {
                        border-collapse: separate;
                        border-spacing: 0 10px;
                    }

                    .table th {
                        background-color: #f3e6f8;
                        color: #333;
                        border: none;
                        font-weight: bold;
                    }

                    .table tbody tr {
                        background-color: #fff;
                        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    }

                    .table tbody tr td {
                        vertical-align: middle;
                        border: none;
                    }

                    .item-column {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .product-img {
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }

                    .search-box {
                        border-radius: 20px;
                    }

                    .pagination-container {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 5px;
                        align-items: center;
                    }

                    .pagination .page-item .page-link {
                        color: #9a00a9;
                        border-radius: 50%;
                    }

                    .pagination .page-item.active .page-link {
                        background-color: #9a00a9;
                        color: white;
                    }

                    .pagination-info {
                        color: #333;
                        font-weight: bold;
                        font-size: 14px;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8 orders-container">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="m-0">Payment History</h6>
                                <InputGroup style={{ maxWidth: "300px" }}>
                                    <Form.Control
                                        placeholder="Search Product"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-box"
                                    />
                                </InputGroup>
                            </div>
                            <div className="table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Date ⇅</th>
                                            <th>Product ⇅</th>
                                            <th>Recipient ⇅</th>
                                            <th>Price ⇅</th>
                                            <th>Status ⇅</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPayments.map((payment, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {payment.date.split(", ")[0] + ", " + payment.date.split(", ")[1]} <br />
                                                    {payment.date.split(", ")[2]}
                                                </td>
                                                <td className="item-column">
                                                    <img
                                                        src="../assets/images/marketplace-img-1.png"
                                                        alt="Product"
                                                        className="product-img"
                                                    />
                                                    {payment.product}
                                                </td>
                                                <td>{payment.recipient}</td>
                                                <td className="fw-bold">{payment.price}</td>
                                                <td>{renderStatus(payment.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="pagination-container">
                                <span className="pagination-info">
                                    Showing {indexOfFirstPayment + 1} to{" "}
                                    {Math.min(indexOfLastPayment, filteredPayments.length)} of{" "}
                                    {filteredPayments.length} entries
                                </span>
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                    />
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Pagination.Item
                                            key={idx}
                                            active={idx + 1 === currentPage}
                                            onClick={() => setCurrentPage(idx + 1)}
                                        >
                                            {idx + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        onClick={() =>
                                            setCurrentPage(Math.min(currentPage + 1, totalPages))
                                        }
                                    />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}