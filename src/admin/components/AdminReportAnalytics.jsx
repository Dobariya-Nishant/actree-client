import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NewReportAnalytics from "./NewReportAnalytics";
import API_ENDPOINTS from "../../api/apiConfig";
import { networkRequest } from "../../utils/networkRequest";

const AdminReportAnalytics = () => {
    const navigate = useNavigate();
    //const [reports, setReports] = useState([]);
    const [report, setReport] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const reportPerPage = 10;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    useEffect(() => {
        //getAllReports();
        getAllReport();
    }, []);

    // const getAllReports = async () => {
    //     try {
    //         const response = await networkRequest("GET", API_ENDPOINTS.REPORT_COUNT, {}, {});
    //         if (response.statusCode === 200) {
    //             console.log("Response:", response);
    //             setReports(response.data);
    //         } else {
    //             console.error("Failed to fetch report post:", response.message);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching report post:", error);
    //     }
    // };

    const getAllReport = async () => {
        try {
            const response = await networkRequest("GET", API_ENDPOINTS.REPORT, {}, {});
            if (response.statusCode === 200) {
                console.log("Response:", response);
                setReport(response.data.reportList);
            } else {
                console.error("Failed to fetch report post:", response.message);
            }
        } catch (error) {
            console.error("Error fetching report post:", error);
        }
    };

    const handleReportDelete = async (reportId) => {
        try {
            const response = await networkRequest("DELETE", API_ENDPOINTS.REPORT_DELETE, { reportId });
            if (response.statusCode === 201) {
                console.log("report deleted successfully!");
                getAllReport();
                //getAllReports();
            } else {
                console.log("Failed to delete report.");
            }
        } catch (error) {
            console.error("Error delete report:", error);
        }
    };

    // const categories = [
    //     { name: "Sexual Content", image: "SexualContent.png" },
    //     { name: "Abuse & Harassment", image: "AbuseHarassment.png" },
    //     { name: "Hate Speech", image: "HateSpeech.png" },
    //     { name: "Child safety", image: "ChildSafety.png" },
    //     { name: "Privacy", image: "Privacy.png" },
    //     { name: "Spam", image: "Spam.png" },
    //     { name: "Suicide or self-harm", image: "Suicideorselfharm.png" },
    //     { name: "Sensitive or disturbing media", image: "Sensitive.png" },
    //     { name: "Impersonation", image: "Impersonation.png" },
    //     { name: "Violent & hateful entities", image: "Violent.png" },
    //     { name: "Fake account", image: "FakeAccount.png" },
    //     { name: "Illegal goods", image: "IllegalGoods.png" },
    // ];

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedReport = [...report].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setReport(sortedReport);
    };

    const filteredReport = report.filter((item) =>
        Object.values(item).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // **Pagination Logic**
    const indexOfLastReport = currentPage * reportPerPage;
    const indexOfFirstReport = indexOfLastReport - reportPerPage;
    const currentReport = filteredReport.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReport.length / reportPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                        <NewReportAnalytics />
                        {/* <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">Report Analytics</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    {categories.map((category, index) => {
                                        const report = reports.find((r) => r._id === category.name);
                                        return (
                                            <div key={index} className="col-md-3">
                                                <div className="card mini-stats-wid">
                                                    <div className="card-body">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1">
                                                                <p className="text-muted fw-medium fw-bold">{category.name}</p>
                                                                <h4 className="mb-0 fw-bold">{report ? report.count : 0}</h4>
                                                            </div>
                                                            <div className="flex-shrink-0 align-self-center">
                                                                <img src={`../assets/admin/assets/${category.image}`} alt={category.name} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4">
                                                <h4 className="card-title mb-4">All Reported Posts </h4>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-end">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search here.."
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
                                            <table className="table align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="align-middle" onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>Date {sortConfig.key === "createdAt" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}</th>
                                                        <th className="align-middle" onClick={() => handleSort("user.userName")} style={{ cursor: "pointer" }}>Post {sortConfig.key === "user.userName" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}</th>
                                                        <th className="align-middle" onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>Report Reason {sortConfig.key === "type" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}</th>
                                                        <th className="align-middle" onClick={() => handleSort("contentType")} style={{ cursor: "pointer" }}>Content Type {sortConfig.key === "contentType" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "↑↓"}</th>
                                                        <th className="align-middle">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentReport.length > 0 ? (
                                                        currentReport.map((reportAnalytics, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    {new Date(reportAnalytics.createdAt).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        second: '2-digit',
                                                                        hour12: true
                                                                    })}</td>
                                                                <td>
                                                                    {reportAnalytics.contentType === "post" && reportAnalytics.post?.media?.length > 0 ? (
                                                                        <img
                                                                            src={reportAnalytics.post.media[0].url}
                                                                            alt=""
                                                                            className="rounded me-3"
                                                                            style={{ width: "50px", height: "50px" }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src="../assets/admin/assets/default.png"
                                                                            alt="Default"
                                                                            className="rounded me-3"
                                                                            style={{ width: "50px", height: "50px" }}
                                                                        />
                                                                    )}
                                                                    {reportAnalytics.user.userName}
                                                                </td>
                                                                <td>{reportAnalytics.type}</td>
                                                                <td>{reportAnalytics.contentType}</td>
                                                                <td>
                                                                    <div className="d-flex gap-3">
                                                                        <button
                                                                            type="button"
                                                                            className="text-danger">
                                                                            <img src="../assets/admin/assets/true.png"
                                                                                alt=""
                                                                                style={{ width: "32px", height: "32px" }}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleReportDelete(reportAnalytics._id)}
                                                                            className="text-danger">
                                                                            <img src="../assets/admin/assets/false.png"
                                                                                alt=""
                                                                                style={{ width: "32px", height: "32px" }}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="6" className="text-center">No report found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {totalPages > 0 && (
                                            <div className="row mt-3">
                                                <div className="col-sm-6 col-md-6">
                                                    <p>Showing {indexOfFirstReport + 1} to {Math.min(indexOfLastReport, filteredReport.length)} of {filteredReport.length} entries</p>
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
                                        )}
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
export default AdminReportAnalytics;