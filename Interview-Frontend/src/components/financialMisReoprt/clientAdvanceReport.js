import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarNavigation from "../SidebarNavigation";
import Navbar from "../Navbar";

const ClientAdvanceReport = () => {
  const [clientAdvances, setClientAdvances] = useState([]); // Default to an empty array
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({
    clientName: "",
    dateRange: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch client advances from the server
    axios
      .get("http://localhost:3000/api/client-advancePymnt/advancePay")
      .then((response) => {
        setClientAdvances(response.data.clientAdvances);
        setClients(response.data.clients);
      })
      .catch((error) => console.error("Error fetching client advances", error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleExportExcel = () => {
    window.open("http://localhost:3000/api/client-advances/export/excel", "_blank");
  };

  const handleExportPDF = () => {
    window.open("http://localhost:3000/api/client-advances/export/pdf", "_blank");
  };

  // Filter the client advances
  const filteredClientAdvances = clientAdvances.filter((advance) => {
    return (
      (filters.clientName === "" || advance.clientName.toLowerCase().includes(filters.clientName)) &&
      (filters.dateRange === "" || advance.dateRange === filters.dateRange)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientAdvances = filteredClientAdvances.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            Client Advance Report
          </h2>

          {/* Filters */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <select
              name="clientName"
              onChange={handleFilterChange}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              <option value="">Select Client</option>
              {clients.map((client, index) => (
                <option key={index} value={client}>
                  {client}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => setFilters({ ...filters, dateRange: "today" })}>
                Today
              </button>
              <button className="btn btn-secondary" onClick={() => setFilters({ ...filters, dateRange: "this_week" })}>
                This Week
              </button>
              <button className="btn btn-secondary" onClick={() => setFilters({ ...filters, dateRange: "this_month" })}>
                This Month
              </button>
              <button className="btn btn-primary" onClick={() => setFilters({ ...filters, dateRange: "custom" })}>
                Custom
              </button>
            </div>
          </div>

          {/* Export Buttons */}
          <div style={{ marginBottom: "16px" }}>
            <button onClick={handleExportExcel} className="btn btn-success" style={{ marginRight: "8px" }}>
              Export to Excel
            </button>
            <button onClick={handleExportPDF} className="btn btn-danger">
              Export to PDF
            </button>
          </div>

          {/* Client Advances Table */}
          <table className="table table-bordered" style={{ backgroundColor: "white", borderRadius: "8px" }}>
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Client Name</th>
                <th>Client Code</th>
                <th>Advance Payment Date</th>
                <th>Collected User</th>
                <th>Remark</th>
                <th>Receipt Number</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {currentClientAdvances.length > 0 ? (
                currentClientAdvances.map((advance, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{advance.clientName}</td>
                    <td>{advance.clientCode}</td>
                    <td>{new Date(advance.advancePaymentDate).toLocaleDateString()}</td>
                    <td>{advance.collectedUser}</td>
                    <td>{advance.remark || '-'}</td>
                    <td>{advance.receiptNumber}</td>
                    <td>{advance.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "#666666" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {Math.ceil(filteredClientAdvances.length / itemsPerPage)}
            </span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredClientAdvances.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAdvanceReport;
