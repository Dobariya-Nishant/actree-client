import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function Orders() {
    const [user] = useState(JSON.parse(localStorage.getItem("user")) || {}); //setUser
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsBuyer, setProductsBuyer] = useState([]);
    const ordersPerPage = 10;

    useEffect(() => {
        if (user._id) {
            getAllOrderList(user._id);
        }
    }, [user._id]);

    const getAllOrderList = async (buyerId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_TRANSACTION, {}, {}, { buyerId });
            if (response.statusCode === 200) {
                console.log("Response:", response.data);
                setProductsBuyer(response.data);
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const filteredOrders = productsBuyer.filter((order) =>
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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

                    .table thead {                    
                        background-color: #f3e6f8;
                        text-align: start;
                        color: #333;
                    }

                    .table thead tr th {
                        background-color: #f3e6f8;
                    }

                    .table tbody tr td {
                        vertical-align: middle;
                        text-align: start;
                    }

                    .item-column {
                        display: flex;
                        align-items: start;
                        gap: 10px;
                    }

                    .product-img {
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
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
                    .action-icon2 {
                        font-size: 1.2rem;
                        color: #29008b;
                        cursor: pointer;
                        margin-right: 10px;
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

                    .pagination .page-item {
                        border-radius: 50%;
                    }

                    .pagination .page-link {
                        border-radius: 50%;
                        padding: 10px 15px;
                        font-weight: 500;
                    }

                    .pagination .page-link:hover {
                        background-color: #9a00a9;
                        color: white;
                    }

                    .pagination .page-item.active .page-link {
                        background-color: #9a00a9;
                        color: white;
                    }

                    .pagination .page-item .page-link {
                        color: #9a00a9;
                    }

                    .pagination .page-item .page-link {
                        color: #9a00a9;
                    }

                    .pagination .page-item .page-link:hover {
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
                                <h6 className="m-0">My Orders</h6>
                                <div>
                                    <InputGroup style={{ maxWidth: "300px" }}>
                                        <Form.Control
                                            placeholder="Search Product"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="search-box"
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Order Id ⇅</th>
                                            <th>Date ⇅</th>
                                            <th>Item ⇅</th>
                                            <th>Price ⇅</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td>#{1000 + index + 1}</td>
                                                <td>
                                                    {new Date(order.transactionDate).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="item-column">
                                                    <img
                                                        src={order.product.displayMedia?.[0]?.url || "../assets/images/marketplace-img-1.png"}
                                                        alt="Product"
                                                        className="product-img"
                                                    />
                                                    {order.product.name}
                                                </td>
                                                <td className="fw-bold">${order.amount}</td>
                                                <td>
                                                    <Link to={`/orderDetail/${order._id}`} className=""><i className="bi bi-eye-fill action-icon"></i></Link>
                                                    <Link to={`/orderDownloadInvoice/${order._id}`} className=""> <i className="bi bi-receipt action-icon2"></i></Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="pagination-container">
                                <span className="pagination-info">
                                    Showing {indexOfFirstOrder + 1} to{" "}
                                    {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                                    {filteredOrders.length} entries
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