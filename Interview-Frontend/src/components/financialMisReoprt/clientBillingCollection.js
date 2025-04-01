import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarNavigation from "../SidebarNavigation";
import Navbar from "../Navbar";

const ClientBillingCollection = () => {
  const [billingCollections, setBillingCollections] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBillingCollections = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clientCollection/clientCollection", {
          params: {
            search,
            startDate,
            endDate,
            page: currentPage,
          },
        });
        setBillingCollections(response.data.billingCollections || []); // Ensure it's always an array
        setTotalPages(response.data.totalPages || 1); // Handle totalPages in case it's undefined
      } catch (error) {
        console.error("Error fetching billing collections", error);
      }
    };
    fetchBillingCollections();
  }, [search, startDate, endDate, currentPage]);
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SidebarNavigation />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div style={{ padding: "16px", backgroundColor: "#e6f7ff", overflowY: "auto" }}>
          <h2 style={{ color: "#003366", textAlign: "center", marginBottom: "20px" }}>
            Client Billing Collection
          </h2>

          {/* Filters */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Client/Patient Name"
              value={search}
              onChange={handleSearchChange}
              style={{ padding: "8px", fontSize: "16px", width: "250px" }}
            />
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={handleStartDateChange}
              style={{ padding: "8px", fontSize: "16px" }}
            />
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={handleEndDateChange}
              style={{ padding: "8px", fontSize: "16px" }}
            />
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(1)}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              Search
            </button>
          </div>

          {/* Export Buttons */}
          <div style={{ marginBottom: "16px" }}>
            <button onClick={() => window.open("/api/client-billing/export?format=excel", "_blank")} className="btn btn-success" style={{ marginRight: "8px" }}>
              Export to Excel
            </button>
            <button onClick={() => window.open("/api/client-billing/export?format=pdf", "_blank")} className="btn btn-danger">
              Export to PDF
            </button>
          </div>

          {/* Billing Collection Table */}
          <table className="table table-bordered" style={{ backgroundColor: "white", borderRadius: "8px" }}>
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Visit Date</th>
                <th>Visit ID</th>
                <th>Client Name</th>
                <th>Test Name</th>
                <th>MRP</th>
                <th>Discount Amount</th>
                <th>Net Amount</th>
                <th>Collected Amount</th>
                <th>Due Amount</th>
                <th>B2B</th>
                <th>Difference Amount</th>
                <th>B2B PL Name</th>
              </tr>
            </thead>
            <tbody>
              {billingCollections.length > 0 ? (
                billingCollections.map((bill, index) => (
                  <tr key={bill._id}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{bill.patientName}</td>
                    <td>{bill.patientId}</td>
                    <td>{new Date(bill.visitDate).toLocaleDateString()}</td>
                    <td>{bill.visitId}</td>
                    <td>{bill.clientName}</td>
                    <td>{bill.testName}</td>
                    <td>{bill.mrp}</td>
                    <td>{bill.discountAmount}</td>
                    <td>{bill.netAmount}</td>
                    <td>{bill.collectedAmount}</td>
                    <td>{bill.dueAmount}</td>
                    <td>{bill.b2b}</td>
                    <td>{bill.differenceAmount}</td>
                    <td>{bill.b2bPlName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" style={{ textAlign: "center", padding: "20px", color: "#666666" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBillingCollection;
