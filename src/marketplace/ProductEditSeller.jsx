import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { ArrowBack } from "@mui/icons-material";
import Select from 'react-select';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import Tagify from '@yaireo/tagify';
import "@yaireo/tagify/dist/tagify.css";

export default function ProductEditSeller() {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [displayImages, setDisplayImages] = useState([]);
    const [orignalImages, setOrignalImages] = useState([]);
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        displayMedia: [],
        orignalMedia: [],
        tags: [],
    });
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        formate: "",
        description: "",
        authorName: "",
        authorAbout: "",
        price: "",
        displayMedia: [],
        orignalMedia: [],
        tags: [],
    });
    const [category, setCategory] = useState("");
    const [productDataUpdate, setProductDataUpdate] = useState({});
    const [language, setLanguage] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [price, setPrice] = useState("");
    const [platformFee, setPlatformFee] = useState("0.00%");
    const [sellerReceive, setSellerReceive] = useState("$0.00");
    const inputRef = useRef(null);
    const tagifyRef = useRef(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (productId) {
            getAllSellerProducts(productId);
        }
    }, [productId]);
    const getAllSellerProducts = async (productId) => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.GET_ALL_PRODUCT, {}, {}, { productId });
            if (response.statusCode === 200) {
                console.log("API Response:", response);
                const displayImages = response.data.product.displayMedia?.map(media => media.url) || [];
                const orignalMedia = response.data.product.orignalMedia?.map(media => media.url) || [];
                const productTags = response.data.product.tags || [];
                setCategory(response.data.product.category)
                setProductData({
                    ...response.data.product,
                    productId: response.data.product._id,
                    name: response.data.product.name,
                    description: response.data.product.description,
                    category: response.data.product.category,
                    displayMedia: response.data.product.displayMedia || [],
                    orignalMedia: response.data.product.orignalMedia || [],
                    publisher: response.data.product.publisher,
                    publishedDate: response.data.product.publishedDate,
                    printLength: response.data.product.printLength,
                    language: response.data.product.language,
                    price: response.data.product.price,
                    tags: productTags,
                });
                setDisplayImages(displayImages);
                setOrignalImages(orignalMedia);
                setTags(productTags);
            } else {
                console.error("Failed to fetch products:", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        if (category === "videos" || category === "website theme plugins") {
            tagifyRef.current = new Tagify(inputRef.current, {
                whitelist: ["React", "JavaScript", "Node.js", "Vue.js"],
                maxTags: 10,
                enforceWhitelist: false,
                placeholder: "Add tags...",
            });
            tagifyRef.current.loadOriginalValues(tags.map(tag => ({ value: tag })));
            tagifyRef.current.on("change", (e) => {
                try {
                    const parsedTags = JSON.parse(e.detail.value) || [];
                    const tagValues = parsedTags.map((tag) => tag.value);

                    setTags(tagValues);
                    setFormData((prev) => ({ ...prev, tags: tagValues }));
                } catch (error) {
                    console.error("Error parsing tags:", error);
                    setTags([]);
                    setFormData((prev) => ({ ...prev, tags: [] }));
                }
            });
        }
        return () => {
            tagifyRef.current?.destroy();
        };
    }, [category, tags]);
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
    const countryOptions = [
        { value: "", label: "Select Country" },
        { value: "india", label: "India" },
        { value: "united kingdom", label: "United Kingdom" },
        { value: "japan", label: "Japan" },
    ];
    const languageOptions = [
        { value: "", label: "Select Language" },
        { value: "english", label: "English" },
        { value: "frence", label: "Frence" },
        { value: "japanese", label: "Japanese" },
    ];
    const getFormateType = {
        "e-books": ".pdf, .epub, .mobi, .azw, .azw3, .fb2, .lit, .ibooks, .cbr, .cbz, .djvu",
        "digital arts graphics": "",
        "music audio files": "audio/mp3, audio/wav, audio/aac",
        "videos": "",
        "images": "",
        "fonts": "",
        "website theme plugins": "",
        "digital templates": "",
        "virtual goods in games": "",
        "educational courses": ""
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        setProductDataUpdate((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setProductData((prevData) => ({
            ...prevData,
            category: selectedOption.value
        }));
        setProductDataUpdate((prevData) => ({
            ...prevData,
            category: selectedOption.value
        }));
    };
    const handleDisplayImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                displayMedia: [
                    ...prevData.displayMedia,
                    ...files.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ],
            }));
        }
    };
    const handleOriginalImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const imageFiles = files.filter((file) => file.type.startsWith("image/"));
            setFormData((prevData) => ({
                ...prevData,
                orignalMedia: [
                    ...prevData.orignalMedia,
                    ...imageFiles.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ]
            }));
        }
    };
    const handleLanguageChange = (selectedOption) => {
        const newLanguage = selectedOption?.value || "";
        setProductData(prevData => ({
            ...prevData,
            language: newLanguage,
        }));
        setProductDataUpdate(prevData => ({
            ...prevData,
            language: newLanguage,
        }));
    };
    const handleCountryChange = (selectedOption) => {
        setCountryOfOrigin(selectedOption?.value || "");
    };
    const handleVideoUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                displayMedia: [
                    ...prevData.displayMedia,
                    ...files.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ],
                orignalMedia: [
                    ...prevData.orignalMedia,
                    ...files.map((file) => ({
                        file: file,
                        name: file.name,
                        type: file.type
                    }))
                ]
            }));
        }
    };
    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                orignalMedia: [{ file: file, name: file.name, type: file.type }],
            }));
        }
    };
    const handleBookUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                orignalMedia: files.map((file) => ({
                    file: file,
                    name: file.name,
                    type: file.type
                }))
            }));
        }
    };
    const handleAuthorProfileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: file,
            }));
        }
    };
    const handlePriceChange = (e) => {
        let enteredPrice = parseFloat(e.target.value);
        if (isNaN(enteredPrice)) {
            setProductData(prevData => ({
                ...prevData,
                price: "",
                platformFee: "0.00%",
                sellerReceive: "$0.00",
            }));
            return;
        }
        let fee = (enteredPrice * 25) / 100;
        let finalAmount = enteredPrice - fee;
        setProductData(prevData => ({
            ...prevData,
            price: enteredPrice,
            platformFee: `${fee.toFixed(2)}%`,
            sellerReceive: `$${finalAmount.toFixed(2)}`,
        }));
        setProductDataUpdate(prevData => ({
            ...prevData,
            price: enteredPrice,
            platformFee: fee.toFixed(2),
            sellerReceive: finalAmount.toFixed(2),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...productDataUpdate,
            productId: productId,
            displayMedia: formData.displayMedia.map((img) => img.file),
            orignalMedia: formData.orignalMedia.map((img) => img.file),
            tags: tags,
        };
        try {
            const response = await networkRequest("PATCH", `${API_ENDPOINTS.UPDATE_PRODUCT}`, updatedData);
            if (response.statusCode === 200) {
                navigate("/ProductSellerList");
            } else {
                console.error("Failed to update product:", response.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleBack = () => {
        navigate("/ProductSellerList");
    };

    return (
        <>
            <style>{`
                .submit-btn {
                    background: linear-gradient(to right, #9A00A9, #580097, #29008B);
                    border-radius: 30px;
                    padding: 8px 20px;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    display: block;
                    width: 150px;
                    text-align: center;
                    margin: 20px auto;
                    font-size: 16px;
                    font-weight: bold;
                }

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

                label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                
                .span {
                    font-size: 12px;
                    color: #777;
                }
                .required {
                    color: red;
                }

                .upload-box {
                    border: 2px dashed #ddd;
                    padding: 40px;
                    text-align: center;
                    border-radius: 10px;
                    color: #666;
                    //height: 250px;
                }
                
                .upload-note {
                    font-size: 12px;
                    color: #777;
                }

                .image-preview {
                    display: grid;
                    gap: 10px;
                    margin-top: 15px;
                    //justify-content: center;
                    grid-template-columns: repeat(4, 1fr);
                }

                .image-thumb {
                    width: 70px;
                    height: 70px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f9f9f9;
                }

                .radio-group {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .radio-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .radio-label input {
                    display: none;
                }

                .custom-radio {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #580097;
                    border-radius: 50%;
                    display: inline-block;
                    position: relative;
                }

                .radio-label input:checked + .custom-radio {
                    background-color: #580097;
                }

                .radio-label input:checked + .custom-radio::after {
                    content: "";
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                @media (max-width: 768px) {
                    .form-container {
                        padding: 15px;
                    }
                    .submit-btn {
                        width: 100%;
                    }
                    .image-preview {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1px;
                    }
                    .image-thumb {
                        width: 60px;
                        height: 60px;
                    }
                }
                @media (max-width: 820px) {
                    .image-preview {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1px;
                    }
                    .image-thumb {
                        width: 60px;
                        height: 60px;
                    }
                }                    
            `}</style>
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <MarketPlaceSidebar />
                        <div className="col-xl-9 col-lg-8">
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" />Edit Product</h6>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="form-container">
                                                <h6 className="mb-3">Product Detail</h6><hr></hr>
                                                <label>Product Name <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    name="name"
                                                    placeholder="Enter Product Name"
                                                    value={productData.name}
                                                    onChange={handleInputChange}
                                                />
                                                <label>Product Category <span className="required">*</span></label>
                                                <Select
                                                    className="mb-2"
                                                    name="category"
                                                    options={categoryOptions}
                                                    onChange={handleCategoryChange}
                                                    defaultValue={categoryOptions[0]}
                                                    value={categoryOptions.find(option => option.value === productData.category)}
                                                    isDisabled={true}
                                                />
                                                <label>Product Format</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    name="formate"
                                                    placeholder="Enter Product Format"
                                                    value={productData.formate}
                                                    onChange={handleInputChange}
                                                />
                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    placeholder="Enter Product Description"
                                                    value={productData.description}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                {productData.category && productData.category != "images" && productData.category != "virtual goods in games" && (
                                                    <div className="form-container">
                                                        <h6 className="mb-3">Product Specification</h6><hr></hr>
                                                        {productData.category === "e-books" && (
                                                            <>
                                                                <label>Publisher</label>
                                                                <input type="text" className="form-control mb-3" name="publisher" onChange={handleInputChange} value={productData.publisher} placeholder="Enter Publisher" />
                                                                <label>Published Date</label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control mb-3"
                                                                    name="publishedDate"
                                                                    onChange={handleInputChange}
                                                                    value={productData.publishedDate ? productData.publishedDate.split("T")[0] : ""}
                                                                    placeholder="Select Date"
                                                                />
                                                                <label>Language</label>
                                                                <Select className="mb-3"
                                                                    name="language"
                                                                    options={languageOptions}
                                                                    onChange={handleLanguageChange}
                                                                    value={languageOptions.find(option => option.value === productData.language)}

                                                                />
                                                                <label>Print Length</label>
                                                                <input type="text" className="form-control mb-3" name="printLength" onChange={handleInputChange} value={productData.printLength} placeholder="Enter Print Length" />
                                                            </>
                                                        )}
                                                        {productData.category === "digital arts graphics" && (
                                                            <>
                                                                <label>Size</label>
                                                                <input type="text" className="form-control mb-3" name="size" onChange={handleInputChange} value={productData.size} placeholder="Size" />
                                                                <label>Product Dimension</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" onChange={handleInputChange} value={productData.dimension} placeholder="Product Dimension" />
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" onChange={handleInputChange} value={productData.publishedDate ? productData.publishedDate.split("T")[0] : ""} />
                                                            </>
                                                        )}
                                                        {productData.category === "music audio files" && (
                                                            <>
                                                                <label>Product Dimension</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" onChange={handleInputChange} value={productData.dimension} placeholder="Product Dimension" />
                                                                <label>Item Part Number</label>
                                                                <input type="text" className="form-control mb-3" name="itemPartNumber" onChange={handleInputChange} value={productData.itemPartNumber} placeholder="Item Part Number" />
                                                                <label>Country Of Origin</label>
                                                                <Select className="mb-3"
                                                                    name="countryOfOrigin"
                                                                    options={countryOptions}
                                                                    onChange={handleCountryChange}
                                                                    value={countryOptions.find(option => option.value === productData.countryOfOrigin)}
                                                                />
                                                            </>
                                                        )}
                                                        {productData.category === "videos" && (
                                                            <>
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" value={productData.publishedDate ? productData.publishedDate.split("T")[0] : ""} onChange={handleInputChange} />
                                                                <label>Frame Rate</label>
                                                                <input type="text" className="form-control mb-3" name="frameRate" value={productData.frameRate} onChange={handleInputChange} placeholder="Enter Frame Rate" />
                                                                <label>Resolution</label>
                                                                <input type="text" className="form-control mb-3" name="resolution" value={productData.resolution} onChange={handleInputChange} placeholder="Enter Resolution" />
                                                                <label>Tags</label>
                                                                <input ref={inputRef} className="form-control mb-3" defaultValue={tags.join(",")} />
                                                            </>
                                                        )}
                                                        {productData.category === "fonts" && (
                                                            <>
                                                                <label>Font For</label>
                                                                <input type="text" className="form-control mb-3" name="fontFor" value={productData.fontFor} onChange={handleInputChange} placeholder="Font For" />
                                                            </>
                                                        )}
                                                        {productData.category === "website theme plugins" && (
                                                            <>
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" value={productData.publishedDate ? productData.publishedDate.split("T")[0] : ""} onChange={handleInputChange} placeholder="Published Date" />
                                                                <label>Layout</label>
                                                                <input type="text" className="form-control mb-3" name="layout" value={productData.layout} onChange={handleInputChange} placeholder="Layout" />
                                                                <label>Compatible Browsers</label>
                                                                <input type="text" className="form-control mb-3" name="compatibleBrowsers" value={productData.compatibleBrowsers} onChange={handleInputChange} placeholder="Compatible Browsers" />
                                                                <label>Tags</label>
                                                                <input ref={inputRef} className="form-control mb-3" defaultValue={tags.join(",")} />
                                                            </>
                                                        )}
                                                        {productData.category === "digital templates" && (
                                                            <>
                                                                <label>File Size</label>
                                                                <input type="text" className="form-control mb-3" name="size" value={productData.size} onChange={handleInputChange} placeholder="File Size" />
                                                                <label>Dimensions</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" value={productData.dimension} onChange={handleInputChange} placeholder="Enter Dimensions" />
                                                            </>
                                                        )}
                                                        {productData.category === "educational courses" && (
                                                            <>
                                                                <label>Language</label>
                                                                <Select className="mb-3"
                                                                    name="language"
                                                                    options={languageOptions}
                                                                    onChange={handleLanguageChange}
                                                                    value={languageOptions.find(option => option.value === productData.language)}
                                                                />
                                                                <label>No. Of Exercises</label>
                                                                <input type="text" className="form-control mb-3" name="noOfExercises" value={productData.noOfExercises} onChange={handleInputChange} placeholder="No. Of Exercises" />
                                                                <label>No. Of Articles</label>
                                                                <input type="text" className="form-control mb-3" name="noOfArticles" value={productData.noOfArticles} onChange={handleInputChange} placeholder="No. Of Articles" />
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-container">
                                                            <h6 className="mb-3">Price Detail</h6><hr></hr>
                                                            <label>Price * <span className="span">(Total amount the client will see on your proposal)</span></label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                name="price"
                                                                value={productData.price}
                                                                onChange={handlePriceChange}
                                                                placeholder="Enter Price"
                                                            />

                                                            <label>25% Activatree Service Fee</label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={productData.platformFee}
                                                                placeholder="%0.00"
                                                                disabled
                                                            />

                                                            <label>You’ll Receive <span className="span">(The estimated amount you’ll receive after service fee)</span></label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                name="sellerReceive"
                                                                value={productData.sellerReceive}
                                                                placeholder="$0.00"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {productData.category === "videos" && (
                                            <>
                                                <div className="col-md-5">
                                                    <div className="form-container">
                                                        <h6 className="mb-3">Display Upload Video</h6><hr></hr>
                                                        <label className="video-upload">
                                                            <input
                                                                type="file"
                                                                accept="video/mp4, video/avi, video/mov"
                                                                multiple
                                                                onChange={handleVideoUpload}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="upload-box">
                                                                <i className="bi bi-cloud-upload"></i>
                                                                <p>Drop your videos here, or click to browse</p>
                                                                <span className="upload-note">Only MP4, AVI, MOV Files are allowed</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="form-container">
                                                        <h6 className="mb-3">Orignal Upload Video</h6><hr></hr>
                                                        <label className="video-upload">
                                                            <input
                                                                type="file"
                                                                accept="video/mp4, video/avi, video/mov"
                                                                multiple
                                                                onChange={handleVideoUpload}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="upload-box">
                                                                <i className="bi bi-cloud-upload"></i>
                                                                <p>Drop your videos here, or click to browse</p>
                                                                <span className="upload-note">Only MP4, AVI, MOV Files are allowed</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="form-container">
                                                        <h6 className="mb-3">Author Detail</h6><hr />
                                                        <label className="image-upload">
                                                            <input
                                                                type="file"
                                                                accept="image/png, image/jpeg, image/jpg"
                                                                name="profilePicture"
                                                                onChange={handleAuthorProfileUpload}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="upload-box">
                                                                <i className="bi bi-cloud-upload"></i>
                                                                <p>Drop images here, or click to browse</p>
                                                                <span className="upload-note">PNG, JPG, JPEG Files are allowed</span>
                                                            </div>
                                                        </label>
                                                        <label>Author Name</label>
                                                        <input type="text" className="form-control mb-3" name="authorName" value={productData.authorName} onChange={handleInputChange} placeholder="Enter Author Name" />
                                                        <label>About Author</label>
                                                        <textarea className="form-control" name="authorAbout" value={productData.authorAbout} onChange={handleInputChange} placeholder="Enter About Author"></textarea>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {(productData.category === "e-books" ||
                                            productData.category === "images" ||
                                            productData.category === "digital arts graphics" ||
                                            productData.category === "music audio files" ||
                                            productData.category === "fonts" ||
                                            productData.category === "website theme plugins" ||
                                            productData.category === "digital templates" ||
                                            productData.category === "virtual goods in games" ||
                                            productData.category === "educational courses") && (
                                                <>
                                                    <div className="col-md-5">
                                                        <div className="form-container">
                                                            <h6 className="mb-3">Display Upload Images</h6><hr></hr>
                                                            <label className="image-upload">
                                                                <input
                                                                    type="file"
                                                                    multiple
                                                                    accept="image/png, image/jpeg, image/jpg"
                                                                    onChange={handleDisplayImageUpload}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="upload-box">
                                                                    <img
                                                                        src={displayImages.length > 0 ? displayImages[0] : "https://via.placeholder.com/100"}
                                                                        alt="Upload Preview"
                                                                        className="upload-preview"
                                                                    />
                                                                </div>
                                                            </label>
                                                            <div className="image-preview">
                                                                {displayImages.slice(0, 4).map((img, index) => (
                                                                    <div key={index} className="image-thumb">
                                                                        <img src={img} alt={`Preview ${index + 1}`} className="thumbnail-image" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="form-container">
                                                            <h6 className="mb-3">Original Upload Images</h6><hr></hr>
                                                            <label className="image-upload">
                                                                <input
                                                                    type="file"
                                                                    multiple
                                                                    accept="image/png, image/jpeg, image/jpg"
                                                                    onChange={handleOriginalImageUpload}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="upload-box">
                                                                    <img
                                                                        src={orignalImages.length > 0 ? orignalImages[0] : "https://via.placeholder.com/100"}
                                                                        alt="Upload Preview"
                                                                        className="upload-preview"
                                                                    />
                                                                </div>
                                                            </label>
                                                            <div className="image-preview">
                                                                {orignalImages.slice(0, 4).map((img, index) => (
                                                                    <div key={index} className="image-thumb">
                                                                        <img src={img} alt={`Preview ${index + 1}`} className="thumbnail-image" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {(productData.category === "e-books" || productData.category === "music audio files") && (
                                                            <>
                                                                <div className="form-container">
                                                                    <h6 className="mb-3">
                                                                        {productData.category === "e-books" ? "Upload E-Book File" : "Upload Audio File"}
                                                                    </h6>
                                                                    <hr />
                                                                    <label className={productData.category
                                                                        === "e-books" ? "book-upload" : "audio-upload"}>
                                                                        <input
                                                                            type="file"
                                                                            multiple
                                                                            accept={getFormateType[productData.category]}
                                                                            onChange={productData.category === "e-books" ? handleBookUpload : handleAudioUpload}
                                                                            style={{ display: "none" }}
                                                                        />
                                                                        <div className="upload-box">
                                                                            <i className="bi bi-cloud-upload"></i>
                                                                            <p>
                                                                                {productData.category === "e-books"
                                                                                    ? "Drop E-Book here, or click to browse"
                                                                                    : "Drop Audio here, or click to browse"}
                                                                            </p>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                                <div className="form-container">
                                                                    <h6 className="mb-3">Author Detail</h6><hr></hr>
                                                                    <label className="image-upload">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/png, image/jpeg, image/jpg"
                                                                            name="profilePicture"
                                                                            onChange={handleAuthorProfileUpload}
                                                                            style={{ display: "none" }}
                                                                        />
                                                                        <div className="upload-box">
                                                                            <i className="bi bi-cloud-upload"></i>
                                                                            <p>Drop images here, or click to browse</p>
                                                                            <span className="upload-note">PNG, JPG, JPEG Files are allowed</span>
                                                                        </div>
                                                                    </label>

                                                                    <label>Name</label>
                                                                    <input type="text" className="form-control mb-3" name="authorName" value={productData.authorName} onChange={handleInputChange} placeholder="Enter Name" />

                                                                    <label>About Author</label>
                                                                    <textarea className="form-control" name="authorAbout" value={productData.authorAbout} onChange={handleInputChange} placeholder="Enter Author Description"></textarea>
                                                                </div>
                                                            </>
                                                        )}
                                                        {(
                                                            productData.category === "digital arts graphics" ||
                                                            productData.category === "videos" ||
                                                            productData.category === "fonts" ||
                                                            productData.category === "website theme plugins" ||
                                                            productData.category === "digital templates" ||
                                                            productData.category === "virtual goods in games" ||
                                                            productData.category === "educational courses") && (
                                                                <>
                                                                    <div className="form-container">
                                                                        <h6 className="mb-3">Author Detail</h6><hr />
                                                                        <label className="image-upload">
                                                                            <input
                                                                                type="file"
                                                                                accept="image/png, image/jpeg, image/jpg"
                                                                                name="profilePicture"
                                                                                onChange={handleAuthorProfileUpload}
                                                                                style={{ display: "none" }}
                                                                            />
                                                                            <div className="upload-box">
                                                                                <i className="bi bi-cloud-upload"></i>
                                                                                <p>Drop images here, or click to browse</p>
                                                                                <span className="upload-note">PNG, JPG, JPEG Files are allowed</span>
                                                                            </div>
                                                                        </label>
                                                                        <label>Author Name</label>
                                                                        <input type="text" className="form-control mb-3" name="authorName" value={productData.authorName} onChange={handleInputChange} placeholder="Enter Author Name" />
                                                                        <label>About Author</label>
                                                                        <textarea className="form-control" name="authorAbout" value={productData.authorAbout} onChange={handleInputChange} placeholder="Enter About Author"></textarea>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                </div>
                                <button className="submit-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
