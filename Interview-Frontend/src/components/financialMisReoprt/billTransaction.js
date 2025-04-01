import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarNavigation from "../SidebarNavigation";
import Navbar from "../Navbar";

const BillTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [referralTypes] = useState(["Type 1", "Type 2", "Type 3"]);
  const [branches] = useState(["Branch 1", "Branch 2", "Branch 3"]);
  const [filters, setFilters] = useState({
    clientName: "",
    referralType: "",
    branch: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch transactions on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/billTransaction/allTransaction")
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => console.error("Error fetching transactions", error));
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
  };

  // Export functions
  const handleExportExcel = () => {
    window.open("http://localhost:3000/api/billTransaction/export/excel", "_blank");
  };

  const handleExportPDF = () => {
    window.open("http://localhost:3000/api/billTransaction/export/pdf", "_blank");
  };

  // Filter transactions based on the selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filters.clientName === "" ||
        transaction.clientName.toLowerCase().includes(filters.clientName)) &&
      (filters.referralType === "" ||
        transaction.referralType.toLowerCase().includes(filters.referralType)) &&
      (filters.branch === "" || transaction.branch.toLowerCase().includes(filters.branch))
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

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
            Bill Transaction Report
          </h2>

          {/* Filters */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <select name="referralType" onChange={handleFilterChange} style={{ padding: "8px", fontSize: "16px" }}>
              <option value="">Select Referral Type</option>
              {referralTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select name="branch" onChange={handleFilterChange} style={{ padding: "8px", fontSize: "16px" }}>
              <option value="">Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="clientName"
              placeholder="Enter client name"
              onChange={handleFilterChange}
              style={{ padding: "8px", fontSize: "16px", width: "250px" }}
            />
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

          {/* Transactions Table */}
          <table className="table table-bordered" style={{ backgroundColor: "white", borderRadius: "8px" }}>
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Receipt Number</th>
                <th>Patient Name</th>
                <th>Client Name</th>
                <th>Visit Date</th>
                <th>Visit ID</th>
                <th>Gross Amount</th>
                <th>Discount</th>
                <th>Net Amount</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.receiptNumber}</td>
                    <td>{transaction.patientName}</td>
                    <td>{transaction.clientName}</td>
                    <td>{new Date(transaction.visitDate).toLocaleDateString()}</td>
                    <td>{transaction.visitId}</td>
                    <td>{transaction.grossAmount.toFixed(2)}</td>
                    <td>{transaction.discount.toFixed(2)}</td>
                    <td>{transaction.netAmount.toFixed(2)}</td>
                    <td>{transaction.paidAmount.toFixed(2)}</td>
                    <td>{(transaction.netAmount - transaction.paidAmount).toFixed(2)}</td>
                    <td>{transaction.paymentMode}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center", padding: "20px", color: "#666666" }}>
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
              Page {currentPage} of {Math.ceil(filteredTransactions.length / itemsPerPage)}
            </span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillTransactions;
