import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function PaymentList() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [searchTerm] = useState(""); //setSearchTerm
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 10;
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        if (user._id) {
            getTransaction(user._id);
        }
    }, [user._id]);

    const getTransaction = async (sellerId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_TRANSACTION, {}, {}, { sellerId });
            if (response.statusCode === 200) {
                console.log("response", response.data);
                //setTransaction(response.data);
                const formattedTransactions = response.data.map((item) => ({
                    _id: item._id,
                    date: new Date(item.transactionDate).toLocaleString(),
                    image: item.product?.displayMedia?.[0]?.url || "../assets/images/marketplace-img-1.png",
                    product: item.product?.name || "",
                    customer: item.buyer?.userName || "",
                    price: `$${item.amount}`,
                    status: item.paymentStatus === "completed" ? "Success" : "Failed",
                }));

                setTransaction(formattedTransactions);
            }
        } catch (error) {
            console.error("Error fetching payment details:", error);
        }
    };

    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    // const filteredPayments = payments.filter((payment) =>
    //     payment.product.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredPayments = transaction.filter((payment) =>
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
    const [selectedDate, setSelectedDate] = useState(null);
    const totalPayment = transaction
        .filter((payment) => payment.status === "Success")
        .reduce((acc, payment) => acc + parseFloat(payment.price.replace("$", "")), 0)
        .toFixed(2);

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
                    .date-container {
                        background: #F6F1FF;
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
                        font-size: 14px
                    }

                    .table tbody tr {
                        background-color: #fff;
                        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    }

                    .table tbody tr td {
                        //vertical-align: middle;
                        text-align: start;
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
                    .action-icon {
                        font-size: 1.2rem;
                        cursor: pointer;
                        margin-right: 10px;
                        background-color: #FCDAFF;
                        color: #9a00a9;
                        border-radius: 50%;
                        padding: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        text-decoration: none;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-3 date-container">
                                <h6 className="m-0">Total Payment: ${totalPayment}</h6>
                                <div>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        className="form-control ms-2"
                                        placeholderText="Select Date"
                                    />
                                </div>
                            </div>
                            <div className="table-responsive orders-container">
                                <h6 className="m-0">Payment List</h6>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Date ⇅</th>
                                            <th>Customer ⇅</th>
                                            <th>Product ⇅</th>
                                            <th>Price ⇅</th>
                                            <th>Status ⇅</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPayments?.map((payment, index) => (
                                            <tr key={index}>
                                                <td>{new Date(payment.date).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}</td>
                                                <td>{payment.customer}</td>
                                                <td className="item-column">
                                                    <img
                                                        src={payment.image}
                                                        alt="Product"
                                                        className="product-img"
                                                    />
                                                    {payment.product}
                                                </td>
                                                <td className="fw-bold">{payment.price}</td>
                                                <td>{renderStatus(payment.status)}</td>
                                                <td><Link to={`/productPaymentDetail/${payment?._id}`} className=""><i className="bi bi-eye-fill action-icon"></i></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
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
                </div>
            </main>
        </>
    );
}