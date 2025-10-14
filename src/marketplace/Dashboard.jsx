import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";

export default function Orders() {
    const [searchTerm,] = useState(""); //setSearchTerm
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const orders = [
        { id: "1001", date: "Feb 11, 2024", item: "Filmora 14 Video Editor", price: "$14.99", customer: "Justus_Everett" },
        { id: "#1002", date: "Apr 01, 2024", item: "Need for Speed payback", price: "$13.49", customer: "Justus_Everett" },
        { id: "#1003", date: "Apr 08, 2024", item: "Minimog - Next-gen Multipurpose Shopify...", price: "$88.00", customer: "Justus_Everett" },
        { id: "#1004", date: "Feb 28, 2024", item: "Relax with these seriously laid-back cl...", price: "$6.33", customer: "Justus_Everett" },
        { id: "#1005", date: "Apr 01, 2024", item: "Need for Speed payback", price: "$13.49", customer: "Justus_Everett" },
        { id: "#1006", date: "Apr 08, 2024", item: "Minimog - Next-gen Multipurpose Shopify...", price: "$88.00", customer: "Justus_Everett" },
        { id: "#1007", date: "Apr 11, 2024", item: "Spotify - Music & Podcast on the app st...", price: "$20.30", customer: "Justus_Everett" },
        { id: "#1008", date: "Apr 18, 2024", item: "Heatter € by RGB Studio", price: "$10.00", customer: "Justus_Everett" },
        { id: "#1009", date: "May 01, 2024", item: "Renatha Signature", price: "$4.50", customer: "Justus_Everett" },
        { id: "#1010", date: "May 29, 2024", item: "BlackPlayer EX", price: "$3.49", customer: "Justus_Everett" },

        { id: "#1011", date: "Feb 11, 2024", item: "Filmora 14 Video Editor", price: "$14.99", customer: "Justus_Everett" },
        { id: "#1012", date: "Feb 28, 2024", item: "Relax with these seriously laid-back cl...", price: "$6.33", customer: "Justus_Everett" },
        { id: "#1013", date: "Apr 01, 2024", item: "Need for Speed payback", price: "$13.49", customer: "Justus_Everett" },
        { id: "#1014", date: "Apr 08, 2024", item: "Minimog - Next-gen Multipurpose Shopify...", price: "$88.00", customer: "Justus_Everett" },
        { id: "#1015", date: "Apr 11, 2024", item: "Spotify - Music & Podcast on the app st...", price: "$20.30", customer: "Justus_Everett" },
        { id: "#1016", date: "Apr 18, 2024", item: "Heatter € by RGB Studio", price: "$10.00", customer: "Justus_Everett" },
        { id: "#1017", date: "May 01, 2024", item: "Renatha Signature", price: "$4.50", customer: "Justus_Everett" },
        { id: "#1018", date: "May 29, 2024", item: "BlackPlayer EX", price: "$3.49", customer: "Justus_Everett" },
        { id: "#1019", date: "Feb 11, 2024", item: "Filmora 14 Video Editor", price: "$14.99", customer: "Justus_Everett" },
        { id: "#1020", date: "Feb 28, 2024", item: "Relax with these seriously laid-back cl...", price: "$6.33", customer: "Justus_Everett" },

        { id: "#1021", date: "Apr 01, 2024", item: "Need for Speed payback", price: "$13.49", customer: "Justus_Everett" },
        { id: "#1022", date: "Apr 08, 2024", item: "Minimog - Next-gen Multipurpose Shopify...", price: "$88.00", customer: "Justus_Everett" },
        { id: "#1023", date: "Apr 11, 2024", item: "Spotify - Music & Podcast on the app st...", price: "$20.30", customer: "Justus_Everett" },
        { id: "#1024", date: "Apr 18, 2024", item: "Heatter € by RGB Studio", price: "$10.00", customer: "Justus_Everett" },
        { id: "#1025", date: "May 01, 2024", item: "Renatha Signature", price: "$4.50", customer: "Justus_Everett" },
        { id: "#1026", date: "May 29, 2024", item: "BlackPlayer EX", price: "$3.49", customer: "Justus_Everett" },
        { id: "#1027", date: "May 01, 2024", item: "Renatha Signature", price: "$4.50", customer: "Justus_Everett" },
    ];

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const filteredOrders = orders.filter((order) =>
        order.item.toLowerCase().includes(searchTerm.toLowerCase())
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
                        justify-content: end;
                        margin-top: 20px;
                        color: #9a00a9;
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

                    .dashboard-icon {
                        width: 40px;
                        height: 40px;
                        margin-left: 70%;
                        margin-top: -50px;
                    }

                    .dashboard-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                    }
                    .most-visited-container {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        margin-top: 0px;
                    }
                    .product-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #ddd;
                    }
                    .product-item:last-child {
                        border-bottom: none;
                    }
                    .product-info {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .product-img {
                        width: 40px;
                        height: 40px;
                        border-radius: 5px;
                    }
                    .visit {
                        border-bottom: 1px solid #ddd;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="head-area mb-5">
                                <h6>Today’s Sales</h6>
                            </div>
                            <div className="row mb-5">
                                <div className="col-lg-6">
                                    <div className="dashboard-grid">
                                        <div className="orders-container">
                                            <div>
                                                <h6>Total Orders</h6>
                                                <h5 className="mt-2">10</h5>
                                            </div>
                                            <img src="../assets/images/marketplace/dashboard/Orders.png" alt="Orders" className="dashboard-icon" />
                                        </div>
                                        <div className="orders-container">
                                            <div>
                                                <h6>Total Products</h6>
                                                <h5 className="mt-2">15</h5>
                                            </div>
                                            <img src="../assets/images/marketplace/dashboard/Products.png" alt="Products" className="dashboard-icon" />
                                        </div>
                                        <div className="orders-container">
                                            <div>
                                                <h6>Total Revenue</h6>
                                                <h5 className="mt-2">$100</h5>
                                            </div>
                                            <img src="../assets/images/marketplace/dashboard/Revenue.png" alt="Revenue" className="dashboard-icon" />
                                        </div>
                                        <div className="orders-container">
                                            <div>
                                                <h6>Clicks on Listings</h6>
                                                <h5 className="mt-2">10</h5>
                                            </div>
                                            <img src="../assets/images/marketplace/dashboard/Clicks.png" alt="Clicks" className="dashboard-icon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="most-visited-container">
                                        <h6 className="visit">Most Visited Products</h6>
                                        <div className="product-item">
                                            <div className="product-info">
                                                <img src="../assets/images/marketplace-img-1.png" alt="Filmora" className="product-img" />
                                                <span>Filmora 14 Video Editor</span>
                                            </div>
                                            <span>$14.99</span>
                                        </div>
                                        <div className="product-item">
                                            <div className="product-info">
                                                <img src="../assets/images/marketplace-img-1.png" alt="Relax Music" className="product-img" />
                                                <span>Relax with these classics</span>
                                            </div>
                                            <span>$6.33</span>
                                        </div>
                                        <div className="product-item">
                                            <div className="product-info">
                                                <img src="../assets/images/marketplace-img-1.png" alt="Minimog Theme" className="product-img" />
                                                <span>Minimog - Shopify Theme</span>
                                            </div>
                                            <span>$88.00</span>
                                        </div>
                                        <div className="product-item">
                                            <div className="product-info">
                                                <img src="../assets/images/marketplace-img-1.png" alt="Heacter C" className="product-img" />
                                                <span>Heacter C by RGB Studio</span>
                                            </div>
                                            <span>$10.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive orders-container">
                                <h6 className="mb-5">Recent Orders</h6>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Order Id ⇅</th>
                                            <th>Item ⇅</th>
                                            <th>Customer ⇅</th>
                                            <th>Date ⇅</th>
                                            <th>Price ⇅</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td>{order.id}</td>
                                                <td className="item-column">
                                                    <img
                                                        src="../assets/images/marketplace-img-1.png"
                                                        alt="Product"
                                                        className="product-img"
                                                    />
                                                    {order.item}
                                                </td>
                                                <td>{order.customer}</td>
                                                <td>{order.date}</td>
                                                <td className="fw-bold">{order.price}</td>
                                                <td><Link to={`/orderDetail/${order.id}`} className=""><i className="bi bi-eye-fill action-icon"></i></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="pagination-container">
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
            </main >
        </>
    );
}