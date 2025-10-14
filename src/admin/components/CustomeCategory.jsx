import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import API_ENDPOINTS from "../../api/apiConfig";
import { networkRequest } from "../../utils/networkRequest";

const CustomeCategory = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, { isCustomCategory: true });
            console.log("API Response:", response);
            if (response.statusCode === 200) {
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.error("Unexpected API response format:", response.data);
                }
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setProducts(sortedProducts);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCustomeCategoryApprove = async (productId) => {
        try {
            const response = await networkRequest("PATCH", API_ENDPOINTS.STATUS_PRODUCT, { productId, status: "approved" });
            if (response.statusCode === 200) {
                console.log("Category approve successfully!");
                navigate("/admin/customeCategory");
            } else {
                console.log("Failed to approve category.");
            }
        } catch (error) {
            console.error("Error approve category:", error);
        }
    };

    const handleCustomeCategoryDecline = async (productId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.STATUS_PRODUCT, { productId, status: "reject" });
            if (response.statusCode === 200) {
                console.log("Category  decline successfully!");
                navigate("/admin/customeCategory");
            } else {
                console.log("Failed to decline category.");
            }
        } catch (error) {
            console.error("Error decline category:", error);
        }
    };

    return (
        <>
            <style>
                {`
                .table thead th, .table th {
                    background-color: #F5E6F6;
                }
                .main-content table td {
                    text-align: start;
                }
                .main-content table tr th {
                    padding: 18px 0;
                }
                table th {
                    font-weight: 500;
                }
            `}
            </style>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">All Custom Category</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                                <div className="search-box me-2 mb-2 d-inline-block">
                                                    <div className="position-relative">
                                                        <h4 className="mb-sm-0 font-size-18">Category List</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search Data"
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                            />
                                                            <i className="bx bx-search-alt search-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap table-check">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="align-middle" onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                                            Product {sortConfig.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}
                                                        </th>
                                                        <th className="align-middle" onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>
                                                            Created At {sortConfig.key === "createdAt" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}
                                                        </th>
                                                        <th className="align-middle" onClick={() => handleSort("seller")} style={{ cursor: "pointer" }}>
                                                            Seller {sortConfig.key === "seller" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}
                                                        </th>
                                                        <th className="align-middle" onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                                                            Price {sortConfig.key === "price" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}
                                                        </th>
                                                        <th className="align-middle" onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                                                            Category {sortConfig.key === "category" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}
                                                        </th>
                                                        <th className="align-middle">Status</th>
                                                        {/* <th className="align-middle">Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentProducts.length > 0 ? (
                                                        currentProducts.map((product, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <img
                                                                        src={product.displayMedia?.[0]?.url || ""}
                                                                        alt=""
                                                                        className="rounded me-3"
                                                                        style={{ width: "50px", height: "50px" }}
                                                                    />
                                                                    <span>{product.name}</span>
                                                                </td>
                                                                <td>
                                                                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        second: '2-digit',
                                                                        hour12: true
                                                                    })}
                                                                </td>
                                                                <td>{product.seller?.userName || ""}</td>
                                                                <td>${product.price}</td>
                                                                <td>{product.category}</td>
                                                                <td>
                                                                    {product.status === "pending" && (
                                                                        <span className="badge rounded-pill badge-soft-warning font-size-12">
                                                                            Pending
                                                                        </span>
                                                                    )}
                                                                    {product.status === "approved" && (
                                                                        <span className="badge rounded-pill badge-soft-success font-size-12">
                                                                            Approved
                                                                        </span>
                                                                    )}
                                                                    {product.status === "reject" && (
                                                                        <span className="badge rounded-pill badge-soft-danger font-size-12">
                                                                            Reject
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                {/* <td>
                                                                    <div className="d-flex gap-3">
                                                                        <Link to={`/admin/productDetail/${product._id}`}
                                                                            className="text-success">
                                                                            <img src="../assets/admin/assets/eyes.png"
                                                                                alt=""
                                                                                style={{ width: "32px", height: "32px" }}
                                                                            />
                                                                        </Link>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleCustomeCategoryApprove(product._id)}
                                                                            className="text-danger">
                                                                            <img src="../assets/admin/assets/true.png"
                                                                                alt=""
                                                                                style={{ width: "32px", height: "32px" }}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleCustomeCategoryDecline(product._id)}
                                                                            className="text-danger">
                                                                            <img src="../assets/admin/assets/false.png"
                                                                                alt=""
                                                                                style={{ width: "32px", height: "32px" }}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </td> */}
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="6" className="text-center">No custom category found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6">
                                                <p>Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} entries</p>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <ul className="pagination pagination-rounded justify-content-end mb-2">
                                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                                            <i className="mdi mdi-chevron-left"></i>
                                                        </button>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                            <i className="mdi mdi-chevron-right"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default CustomeCategory;