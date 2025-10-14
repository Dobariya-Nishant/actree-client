import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import Select from 'react-select';

const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "e-books", label: "E-Books" },
    { value: "digital arts graphics", label: "Digital Arts & Graphics" },
    { value: "music audio files", label: "Music & Audio files" },
    { value: "videos", label: "Videos" },
    { value: "images", label: "Images" },
    { value: "fonts", label: "Fonts" },
    { value: "website theme plugins", label: "Website Theme & Plugins" },
    { value: "digital templates", label: "Digital Templates" },
    { value: "virtual goods in games", label: "Virtual Goods in Games" },
    { value: "educational courses", label: "Educational Courses" },
];

const MarketPlace = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: "", category: "", price: "" });
    const [wishlistedProducts, setWishlistedProducts] = useState({});
    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {});
            if (response.statusCode === 200) {
                //console.log("response", response);
                setProducts(response.data.products);
                const wishlistStatus = {};
                response.data.products.forEach(product => {
                    wishlistStatus[product._id] = product.isWishlist !== null;
                });

                setWishlistedProducts(wishlistStatus);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            category: selectedOption.value
        }));
    };

    const handleApplyFilters = async () => {
        const filteredData = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, filteredData);
            if (response.statusCode === 200) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    const handleResetFilters = () => {
        setFilters({
            search: "",
            category: "",
            price: ""
        });
        getAllProduct();
    };

    const handleWishlist = async (productId) => {
        try {
            if (wishlistedProducts[productId]) {
                const response = await networkRequest("DELETE", API_ENDPOINTS.DELETE_WISHLIST, { productId });
                if (response.statusCode === 200) {
                    console.log(`Product ${productId} removed from wishlist`);
                    setWishlistedProducts(prevState => ({
                        ...prevState,
                        [productId]: false
                    }));
                }
            } else {
                const response = await networkRequest("POST", API_ENDPOINTS.POST_WISHLIST, { productId: productId });
                if (response.statusCode === 201) {
                    console.log("Product added to wishlist successfully");
                    setWishlistedProducts(prevState => {
                        const updatedState = {
                            ...prevState,
                            [productId]: true
                        };
                        return updatedState;
                    });
                }
            }
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
        }
    };

    const handleDownloadAll = async (product) => {
        if (product?.orignalMedia?.length) {
            for (const item of product.orignalMedia) {
                try {
                    const response = await fetch(item.url);
                    if (!response.ok) throw new Error(`Failed to fetch: ${item.url}`);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = item.url.split("/").pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error("Download failed:", error);
                }
            }
        }
    };

    return (
        <>
            <style>
                {`            
                    @media (max-width: 768px) {
                        .single-box .row > div {
                            margin-bottom: 10px;
                        }
                        .cmn-btn {
                            display: block;
                            width: 100%;
                            text-align: center;
                        }
                        .avatar-img {
                            height: 200px;
                            width: auto;
                            object-fit: cover;
                        }
                    }
                    .avatar-img {
                        height: 150px;
                        width: auto;
                        object-fit: cover;
                    }
                `}
            </style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <div className="head-area mb-5">
                                <h6>All Products</h6>
                            </div>
                            <div className="single-box p-4">
                                <div className="row g-3">
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                        <input
                                            type="text"
                                            name="search"
                                            className="form-control h-100"
                                            placeholder="Search item here..."
                                            value={filters.search}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                                        <Select
                                            name="category"
                                            options={categoryOptions}
                                            placeholder="Category"
                                            value={categoryOptions.find(option => option.value === filters.category) || null}
                                            onChange={handleCategoryChange}
                                        />
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Max Price"
                                            value={filters.price}
                                            className="form-control h-100"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-xl-2 col-lg-6 col-md-6 col-12 d-flex">
                                        <button
                                            className="cmn-btn w-100"
                                            style={{
                                                background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                borderRadius: 30,
                                                padding: "5px",
                                                display: "block",
                                                textAlign: "center",
                                                color: "#fff",
                                                textDecoration: "none"
                                            }}
                                            onClick={handleApplyFilters}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            className="cmn-btn w-100"
                                            style={{
                                                background: "red",
                                                borderRadius: 30,
                                                padding: "5px",
                                                display: "block",
                                                textAlign: "center",
                                                color: "#fff",
                                                textDecoration: "none"
                                            }}
                                            onClick={handleResetFilters}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {products.length === 0 ? (
                                <div className="single-box marketplace-item p-2 p-sm-1">
                                    <div className="text-center mt-4">
                                        <h4 style={{ color: "#9A00A9" }}>No products found</h4>
                                        <p>Try adjusting your filters or search criteria.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="row cus-mar mt-5">
                                    {products.map((product) => (
                                        <div key={product._id} className="col-xl-3 col-lg-8 col-md-6">
                                            <div className="single-box marketplace-item p-2 p-sm-1">
                                                <div className="avatar-area position-relative">
                                                    <div className="wishlist-icon position-absolute top-0 end-0 p-2"
                                                        onClick={() => handleWishlist(product._id)}
                                                    >
                                                        <i className="fas fa-heart"
                                                            style={{
                                                                backgroundColor: "#FFFFFF",
                                                                color: wishlistedProducts[product._id] ? "#E22C27" : "#E4E4E4",
                                                                fontSize: '20px',
                                                                cursor: 'pointer',
                                                                borderRadius: '50%',
                                                                padding: '8px',
                                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                                            }}>
                                                        </i>
                                                    </div>
                                                    {product.category === "videos" ? (
                                                        <video
                                                            width="50"
                                                            height="140"
                                                            controls
                                                            muted
                                                            className="product-video w-100"
                                                        >
                                                            <source src={product.displayMedia?.[0]?.url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            className="avatar-img w-100"
                                                            src={product.displayMedia[0]?.url || "../assets/images/marketplace-img-1.png"}
                                                            alt={product.name}
                                                        />
                                                    )}
                                                </div>
                                                <div className="info-box mt-1 text-start">
                                                    <h6>{product.name}</h6>
                                                    <p>{product.category}</p>
                                                </div>
                                                <div className="head-area mt-5 d-flex justify-content-between">
                                                    <div className="d-flex w-100 gap-3 align-items-center justify-content-between">
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <div className="avatar-item">
                                                                <h6 className="" style={{ color: "#29008B" }}>${product.price}</h6>
                                                            </div>
                                                            <div className="text-area text-start">
                                                                <h6 className="m-0">
                                                                    {product.isPurchased ? (
                                                                        <button
                                                                            className="cmn-btn"
                                                                            style={{
                                                                                background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                                                borderRadius: 30,
                                                                            }}
                                                                            onClick={() => handleDownloadAll(product)}
                                                                        >
                                                                            Download
                                                                        </button>
                                                                    ) : (
                                                                        <Link to={`/product_detail/${product._id}`} className="cmn-btn"
                                                                            style={{
                                                                                background: "linear-gradient(to right, #9A00A9, #580097, #29008B)",
                                                                                borderRadius: 30,
                                                                            }}
                                                                        >Buy Now</Link>
                                                                    )}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default MarketPlace;
