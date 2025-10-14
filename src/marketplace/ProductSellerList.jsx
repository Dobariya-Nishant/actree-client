import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";

export default function ProductSellerList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [user] = useState(JSON.parse(localStorage.getItem("user")) || {}); //setUser
    const [currentPage, setCurrentPage] = useState(1);
    const [productsSeller, setProductsSeller] = useState([]);
    const ProductsSellerPerPage = 10;

    useEffect(() => {
        if (user._id) {
            getAllSellerProducts(user._id);
        }
    }, [user._id]);

    const getAllSellerProducts = async (sellerId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, { sellerId });
            if (response.statusCode === 200) {
                console.log("API Response:", response);
                setProductsSeller(response.data.products);
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_PRODUCT, { productId });
            if (response.statusCode === 201) {
                console.log("Product deleted successfully!");
                navigate("/ProductSellerList");

            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const indexOfLastProductsSeller = currentPage * ProductsSellerPerPage;
    const indexOfFirstProductsSeller = indexOfLastProductsSeller - ProductsSellerPerPage;

    const filteredProductsSeller = productsSeller.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentProductsSeller = filteredProductsSeller.slice(indexOfFirstProductsSeller, indexOfLastProductsSeller);
    const totalPages = Math.ceil(filteredProductsSeller.length / ProductsSellerPerPage);

    // const renderStatus = (status) => {
    //     if (status === "Active") {
    //         return (
    //             <span
    //                 style={{
    //                     backgroundColor: "#D1FFCC",
    //                     color: "#3DB22F",
    //                     padding: "0px 10px",
    //                     borderRadius: "30px",
    //                     fontSize: "12px",
    //                     fontWeight: "bold",
    //                     height: "30px",
    //                 }}
    //             >
    //                 {status}
    //             </span>
    //         );
    //     } else if (status === "Disable") {
    //         return (
    //             <span
    //                 style={{
    //                     backgroundColor: "#FDD7D4",
    //                     color: "#FA1702",
    //                     padding: "0px 10px",
    //                     borderRadius: "30px",
    //                     fontSize: "12px",
    //                     fontWeight: "bold",
    //                     height: "30px",
    //                 }}
    //             >
    //                 {status}
    //             </span>
    //         );
    //     }
    //     return null;
    // };

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
                    .edit-icon {
                        font-size: 1.2rem;
                        cursor: pointer;
                        margin-right: 10px;
                        background-color: #D1FFCC;
                        color: #3DB22F;
                        border-radius: 50%;
                        padding: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        text-decoration: none;
                    }
                    
                    .delete-icon {
                        font-size: 1.2rem;
                        cursor: pointer;
                        margin-right: 10px;
                        background-color: #FDD7D4;
                        color: #FA1702;
                        border-radius: 50%;
                        padding: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        text-decoration: none;
                    }

                    .search-box {
                        border-radius: 20px;
                    }

                    // .pagination-container {
                    //     display: flex;
                    //     justify-content: end;
                    //     margin-top: 20px;
                    //     color: #9a00a9;
                    // }
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
                    .AddProductBtn {
                        background-color: #9a00a9;
                        border-radius: 50px;
                        padding: 8px 20px;
                        font-size: 14px;
                        font-weight: bold;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        white-space: nowrap;
                        height: 40px;
                        min-width: 120px;
                        color: white;
                        text-decoration: none;
                    }

                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8 orders-container">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="m-0">Product Seller List</h6>
                                <div className="d-flex">
                                    <Link to="/addProduct" variant="primary" className="AddProductBtn ms-2">
                                        Add Product
                                    </Link>
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
                                            <th>Product ⇅</th>
                                            <th>Created at ⇅</th>
                                            <th>Price ⇅</th>
                                            {/* <th>Status ⇅</th> */}
                                            <th>Category ⇅</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProductsSeller.map((product, index) => (
                                            <tr key={index}>
                                                <td className="item-column">
                                                    {product.category === "videos" ? (
                                                        <video
                                                            width="50"
                                                            height="50"
                                                            controls
                                                            muted
                                                            className="product-video"
                                                        >
                                                            <source src={product.displayMedia?.[0]?.url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={product.displayMedia?.[0]?.url || "../assets/images/default-product.png"}
                                                            alt="Product"
                                                            className="product-img"
                                                            width="50"
                                                            height="50"
                                                        />
                                                    )}
                                                    {product.name}
                                                </td>
                                                <td>{new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                                                <td className="fw-bold">${product.price}</td>
                                                {/* <td>{renderStatus(product.status)}</td> */}
                                                <td>{product.category}</td>
                                                <td className="d-flex">
                                                    <Link to={`/product_detail/${product._id}`}><i className="bi bi-eye-fill action-icon"></i></Link>
                                                    <Link to={`/ProductEditSeller/${product._id}`}><i className="bi bi-pencil edit-icon"></i></Link>
                                                    <Link to={`/ProductDelete/${product._id}`}><i
                                                        className="bi bi-trash-fill delete-icon"
                                                        onClick={() => handleDelete(product._id)}
                                                        style={{ cursor: "pointer" }}
                                                    ></i></Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="pagination-container">
                                <span className="pagination-info">
                                    Showing {indexOfFirstProductsSeller + 1} to{" "}
                                    {Math.min(indexOfLastProductsSeller, filteredProductsSeller.length)} of{" "}
                                    {filteredProductsSeller.length} entries
                                </span>
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                        disabled={currentPage === 1}
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
                                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                                        disabled={currentPage === totalPages}
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
