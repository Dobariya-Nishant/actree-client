import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarketPlaceSidebar from "./MarketPlaceSidebar";
import { ArrowBack } from "@mui/icons-material";
import Select from 'react-select';
import API_ENDPOINTS from "../api/apiConfig";
import { networkRequest } from "../utils/networkRequest";
import Tagify from '@yaireo/tagify';
import "@yaireo/tagify/dist/tagify.css";

export default function AddProduct() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
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
    //const [language, setLanguage] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [price, setPrice] = useState("");
    const [platformFee, setPlatformFee] = useState("$0.00");
    const [sellerReceive, setSellerReceive] = useState("$0.00");
    const inputRef = useRef(null);
    const tagifyRef = useRef(null);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (category === "videos" || category === "website theme plugins" && inputRef.current) {
            tagifyRef.current = new Tagify(inputRef.current, {
                whitelist: ["React", "JavaScript", "Node.js", "Vue.js"],
                maxTags: 10,
                enforceWhitelist: false,
                placeholder: "Add tags...",
            });
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
    }, [category]);


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

    // const languageOptions = [
    //     { value: "", label: "Select Language" },
    //     { value: "english", label: "English" },
    //     { value: "frence", label: "Frence" },
    //     { value: "japanese", label: "Japanese" },
    // ];
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

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //     setErrors({ ...errors, [e.target.name]: "" });
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "compatibleBrowsers"
                ? value.split(",").map(item => item.trim())
                : value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption?.value || "");
        setFormData({ ...formData, category: selectedOption?.value || "" });
        setErrors({ ...errors, category: "" });
    };

    // const handleLanguageChange = (selectedOption) => {
    //     setLanguage(selectedOption?.value || "");
    // };
    const handleCountryChange = (selectedOption) => {
        setCountryOfOrigin(selectedOption?.value || "");
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
    const handleOriginalImageUpload11 = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
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
    const handleAudioUpload11 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                orignalMedia: file,
            }));
        }
    };
    const handleBookUpload11 = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                //orignalMedia: files,
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
    const handleBookUpload22 = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                orignalMedia: [...(prevData.orignalMedia || []), ...files]
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
            setPrice("");
            setPlatformFee("$0.00");
            setSellerReceive("$0.00");
            return;
        }
        setPrice(enteredPrice);
        let fee = (enteredPrice * 25) / 100;
        let finalAmount = enteredPrice - fee;
        setPlatformFee(`${fee.toFixed(2)}%`);
        setSellerReceive(`$${finalAmount.toFixed(2)}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product Name is required";
        if (!formData.category) newErrors.category = "Product Category is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const uploadData = new FormData();
        uploadData.append("name", formData.name);
        uploadData.append("category", formData.category);
        uploadData.append("formate", formData.formate);
        uploadData.append("description", formData.description);
        if (formData.authorName.trim()) {
            uploadData.append("authorName", formData.authorName);
        }
        if (formData.authorAbout.trim()) {
            uploadData.append("authorAbout", formData.authorAbout);
        }
        uploadData.append("price", price);
        formData.displayMedia.forEach((media, index) => {
            uploadData.append(`displayMedia`, media.file);
        });
        formData.orignalMedia.forEach((media, index) => {
            uploadData.append("orignalMedia", media.file);
        });
        if (formData.category === "e-books") {
            uploadData.publisher = formData.publisher;
            uploadData.publishedDate = formData.publishedDate;
            uploadData.language = formData.language;
            uploadData.printLength = formData.printLength;
        } else if (formData.category === "digital arts graphics") {
            uploadData.size = formData.size;
            uploadData.dimension = formData.dimension;
            uploadData.publishedDate = formData.publishedDate;
        } else if (category === "music audio files") {
            uploadData.dimension = formData.dimension;
            uploadData.itemPartNumber = formData.itemPartNumber;
            uploadData.countryOfOrigin = countryOfOrigin;
        } else if (formData.category === "videos") {
            uploadData.publishedDate = formData.publishedDate;
            uploadData.frameRate = formData.frameRate;
            uploadData.resolution = formData.resolution;
            (formData.tags || []).forEach((tag) => {
                uploadData.append("tags", tag);
            });
        } else if (formData.category === "fonts") {
            uploadData.fontFor = formData.fontFor;
        } else if (formData.category === "website theme plugins") {
            uploadData.publishedDate = formData.publishedDate;
            uploadData.layout = formData.layout;
            formData.compatibleBrowsers.forEach((browser) => {
                uploadData.append("compatibleBrowsers", browser);
            });
            (formData.tags || []).forEach((tag) => {
                uploadData.append("tags", tag);
            });
        } else if (formData.category === "digital templates") {
            uploadData.dimension = formData.dimension;
            //}
            // else if (formData.category === "virtual goods in games") {
            //     uploadData.digitalFileType = formData.digitalFileType;
            //     uploadData.fileSizeinPixels = formData.fileSizeinPixels;
        } else if (formData.category === "educational courses") {
            uploadData.language = formData.language;
            uploadData.noOfExercises = formData.noOfExercises;
            uploadData.noOfArticles = formData.noOfArticles;
        }
        Object.keys(uploadData).forEach((key) => {
            uploadData.append(key, uploadData[key]);
        });
        console.log("Submitting Data: ", uploadData);
        try {
            const response = await networkRequest("POST", API_ENDPOINTS.POST_PRODUCT, uploadData);
            if (response.statusCode === 200) {
                console.log("Product created successFully!");
                navigate("/ProductSellerList");
            } else {
                console.error("Failed to create product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
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
                            <h6 className="mb-3" onClick={handleBack}><ArrowBack className="me-2" /> Add Product</h6>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="form-container">
                                                <h6 className="mb-3">Product Detail</h6><hr></hr>
                                                <label>Product Name <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className={`form-control mb-2 ${errors.name ? "is-invalid" : ""}`}
                                                    name="name"
                                                    placeholder="Enter Product Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                                <label>Product Category <span className="required">*</span></label>
                                                <Select
                                                    className={`mb-2 ${errors.category ? "is-invalid" : ""}`}
                                                    name="category"
                                                    options={categoryOptions}
                                                    onChange={handleCategoryChange}
                                                    defaultValue={categoryOptions[0]}
                                                    value={categoryOptions.find(option => option.value === formData.category)}
                                                />
                                                {errors.category && <div className="text-danger">{errors.category}</div>}
                                                <label>Product Format</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    name="formate"
                                                    placeholder="Enter Product Format"
                                                    value={formData.formate}
                                                    onChange={handleChange}
                                                />
                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    placeholder="Enter Product Description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    cols="10"
                                                    rows="3"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                {category && category != "images" && category != "virtual goods in games" && (
                                                    <div className="form-container">
                                                        <h6 className="mb-3">Product Specification</h6><hr></hr>
                                                        {category === "e-books" && (
                                                            <>
                                                                <label>Publisher</label>
                                                                <input type="text" className="form-control mb-3" name="publisher" onChange={handleChange} placeholder="Enter Publisher" />
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" onChange={handleChange} placeholder="Select Date" />
                                                                <label>Language</label>
                                                                <input type="text" className="form-control mb-3" name="language" onChange={handleChange} placeholder="Enter Language" />
                                                                {/* <Select className="mb-3"
                                                                    name="language"
                                                                    options={languageOptions}
                                                                    onChange={handleLanguageChange}
                                                                /> */}
                                                                <label>Print Length</label>
                                                                <input type="text" className="form-control mb-3" name="printLength" onChange={handleChange} placeholder="Enter Print Length" />
                                                            </>
                                                        )}
                                                        {category === "digital arts graphics" && (
                                                            <>
                                                                <label>Size</label>
                                                                <input type="text" className="form-control mb-3" name="size" onChange={handleChange} placeholder="Size" />
                                                                <label>Product Dimension</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" onChange={handleChange} placeholder="Product Dimension" />
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" onChange={handleChange} />
                                                            </>
                                                        )}
                                                        {category === "music audio files" && (
                                                            <>
                                                                <label>Product Dimension</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" onChange={handleChange} placeholder="Product Dimension" />
                                                                <label>Item Part Number</label>
                                                                <input type="text" className="form-control mb-3" name="itemPartNumber" onChange={handleChange} placeholder="Item Part Number" />
                                                                <label>Country Of Origin</label>
                                                                <Select className="mb-3"
                                                                    name="country"
                                                                    options={countryOptions}
                                                                    onChange={handleCountryChange}
                                                                />
                                                            </>
                                                        )}
                                                        {category === "videos" && (
                                                            <>
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" onChange={handleChange} />
                                                                <label>Frame Rate</label>
                                                                <input type="text" className="form-control mb-3" name="frameRate" onChange={handleChange} placeholder="Enter Frame Rate" />
                                                                <label>Resolution</label>
                                                                <input type="text" className="form-control mb-3" name="resolution" onChange={handleChange} placeholder="Enter Resolution" />
                                                                <label>Tags</label>
                                                                <input ref={inputRef} className="form-control mb-3" defaultValue={tags.join(",")} />
                                                            </>
                                                        )}
                                                        {category === "fonts" && (
                                                            <>
                                                                <label>Font For</label>
                                                                <input type="text" className="form-control mb-3" name="fontFor" onChange={handleChange} placeholder="Font For" />
                                                            </>
                                                        )}
                                                        {category === "website theme plugins" && (
                                                            <>
                                                                <label>Published Date</label>
                                                                <input type="date" className="form-control mb-3" name="publishedDate" onChange={handleChange} placeholder="Published Date" />
                                                                <label>Layout</label>
                                                                <input type="text" className="form-control mb-3" name="layout" onChange={handleChange} placeholder="Layout" />
                                                                <label>Compatible Browsers</label>
                                                                <input type="text" className="form-control mb-3" name="compatibleBrowsers" onChange={handleChange} placeholder="Compatible Browsers" />
                                                                <label>Tags</label>
                                                                <input ref={inputRef} className="form-control mb-3" defaultValue={tags.join(",")} />
                                                            </>
                                                        )}
                                                        {category === "digital templates" && (
                                                            <>
                                                                <label>File Size</label>
                                                                <input type="text" className="form-control mb-3" name="fileSize" onChange={handleChange} placeholder="File Size" />
                                                                <label>Dimensions</label>
                                                                <input type="text" className="form-control mb-3" name="dimension" onChange={handleChange} placeholder="Enter Dimensions" />
                                                            </>
                                                        )}
                                                        {/* {category === "virtual goods in games" && (
                                                            <>
                                                                <label>Digital File Type</label>
                                                                <input type="text" className="form-control mb-3" name="digitalFileType" onChange={handleChange} placeholder="Digital File Type" />
                                                                <label>File Size in Pixels</label>
                                                                <input type="text" className="form-control mb-3" name="fileSizeinPixels" onChange={handleChange} placeholder="File Size in Pixels" />
                                                            </>
                                                        )} */}
                                                        {category === "educational courses" && (
                                                            <>
                                                                <label>Language</label>
                                                                <input type="text" className="form-control mb-3" name="language" onChange={handleChange} placeholder="Enter Language" />
                                                                {/* <Select className="mb-3"
                                                                    name="language"
                                                                    options={languageOptions}
                                                                    onChange={handleLanguageChange}
                                                                /> */}
                                                                <label>No. Of Exercises</label>
                                                                <input type="text" className="form-control mb-3" name="noOfExercises" onChange={handleChange} placeholder="No. Of Exercises" />
                                                                <label>No. Of Articles</label>
                                                                <input type="text" className="form-control mb-3" name="noOfArticles" onChange={handleChange} placeholder="No. Of Articles" />
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
                                                                value={price}
                                                                onChange={handlePriceChange}
                                                                placeholder="Enter Price"
                                                            />
                                                            <label>25% Activatree Service Fee</label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={platformFee}
                                                                placeholder="$0.00"
                                                                disabled
                                                            />
                                                            <label>You’ll Receive <span className="span">(The estimated amount you’ll receive after service fee)</span></label>
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                name="sellerReceive"
                                                                value={sellerReceive}
                                                                placeholder="$0.00"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {category === "videos" && (
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
                                                        <input type="text" className="form-control mb-3" name="authorName" onChange={handleChange} placeholder="Enter Author Name" />
                                                        <label>About Author</label>
                                                        <textarea className="form-control" name="authorAbout" onChange={handleChange} placeholder="Enter About Author"></textarea>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {(category === "e-books" ||
                                            category === "images" ||
                                            category === "digital arts graphics" ||
                                            category === "music audio files" ||
                                            category === "fonts" ||
                                            category === "website theme plugins" ||
                                            category === "digital templates" ||
                                            category === "virtual goods in games" ||
                                            category === "educational courses") && (
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
                                                                    <i className="bi bi-cloud-upload"></i>
                                                                    <p>Drop your images here, or click to browse</p>
                                                                    <span className="upload-note">PNG, JPG Files are allowed</span>
                                                                </div>
                                                            </label>
                                                            <div className="image-preview">
                                                                {formData.displayMedia.length > 0 ? (
                                                                    formData.displayMedia.map((image, index) => (
                                                                        <div key={index} className="image-thumb">
                                                                            <img src={URL.createObjectURL(image.file)} alt="Preview" className="thumbnail-image" />
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    Array.from({ length: 4 }).map((_, index) => (
                                                                        <div key={index} className="image-thumb">
                                                                            <i className="bi bi-cloud-upload upload-icon"></i>
                                                                        </div>
                                                                    ))
                                                                )}
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
                                                                    <i className="bi bi-cloud-upload"></i>
                                                                    <p>Drop your images here, or click to browse</p>
                                                                    <span className="upload-note">PNG, JPG Files are allowed</span>
                                                                </div>
                                                            </label>
                                                            <div className="image-preview">
                                                                {formData.orignalMedia.length > 0 ? (
                                                                    formData.orignalMedia
                                                                        .filter((media) => media.type.startsWith("image/"))
                                                                        .map((image, index) => (
                                                                            <div key={index} className="image-thumb">
                                                                                <img src={URL.createObjectURL(image.file)} alt="Preview" className="thumbnail-image" />
                                                                            </div>
                                                                        ))
                                                                ) : (
                                                                    Array.from({ length: 4 }).map((_, index) => (
                                                                        <div key={index} className="image-thumb">
                                                                            <i className="bi bi-cloud-upload upload-icon"></i>
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </div>
                                                        {(category === "e-books" || category === "music audio files") && (
                                                            <>
                                                                <div className="form-container">
                                                                    <h6 className="mb-3">
                                                                        {category === "e-books" ? "Upload E-Book File" : "Upload Audio File"}
                                                                    </h6>
                                                                    <hr />
                                                                    <label className={category === "e-books" ? "book-upload" : "audio-upload"}>
                                                                        <input
                                                                            type="file"
                                                                            multiple
                                                                            accept={getFormateType[category]}
                                                                            onChange={category === "e-books" ? handleBookUpload : handleAudioUpload}
                                                                            style={{ display: "none" }}
                                                                        />
                                                                        <div className="upload-box">
                                                                            <i className="bi bi-cloud-upload"></i>
                                                                            <p>
                                                                                {category === "e-books"
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
                                                                    <input type="text" className="form-control mb-3" name="authorName" onChange={handleChange} placeholder="Enter Name" />

                                                                    <label>About Author</label>
                                                                    <textarea className="form-control" name="authorAbout" onChange={handleChange} placeholder="Enter Author Description"></textarea>
                                                                </div>
                                                            </>
                                                        )}
                                                        {(
                                                            category === "digital arts graphics" ||
                                                            category === "videos" ||
                                                            category === "fonts" ||
                                                            category === "website theme plugins" ||
                                                            category === "digital templates" ||
                                                            category === "virtual goods in games" ||
                                                            category === "educational courses") && (
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
                                                                        <input type="text" className="form-control mb-3" name="authorName" onChange={handleChange} placeholder="Enter Author Name" />
                                                                        <label>About Author</label>
                                                                        <textarea className="form-control" name="authorAbout" onChange={handleChange} placeholder="Enter About Author"></textarea>
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
