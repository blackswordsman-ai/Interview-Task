import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarNavigation from '../SidebarNavigation';  
import Navbar from '../Navbar';  

const BillingStatements = () => {
  const [billingStatements, setBillingStatements] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);  // Set number of items per page

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/billing/getBill")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBillingStatements(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching billing statements", error));
  }, []);

  // Filter the table based on the date range and client name
  const filterTable = () => {
    let filteredData = [...billingStatements];

    if (fromDate) {
      filteredData = filteredData.filter(statement => new Date(statement.fromDate) >= new Date(fromDate));
    }

    if (toDate) {
      filteredData = filteredData.filter(statement => new Date(statement.toDate) <= new Date(toDate));
    }

    if (clientName) {
      filteredData = filteredData.filter(statement => statement.clientName.toLowerCase().includes(clientName.toLowerCase()));
    }

    setBillingStatements(filteredData);
  };

  // Handle Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = billingStatements.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExportExcel = () => {
    window.open("http://localhost:3000/api/billing-statements/export/excel", "_blank");
  };

  const handleExportPDF = () => {
    window.open("http://localhost:3000/api/billing-statements/export/pdf", "_blank");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarNavigation />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ padding: "16px", backgroundColor: "#e6f7ff", overflowY: "auto" }}>
          <h2 style={{ color: "#003366", textAlign: "center", marginBottom: "20px" }}>
            Billing Statements
          </h2>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ padding: "8px", fontSize: "16px", width: "150px" }}
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ padding: "8px", fontSize: "16px", width: "150px" }}
            />
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              style={{ padding: "8px", fontSize: "16px", width: "200px" }}
            />
            <button onClick={filterTable} className="btn btn-primary">
              Search
            </button>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <button onClick={handleExportExcel} className="btn btn-success" style={{ marginRight: "8px" }}>
              Export to Excel
            </button>
            <button onClick={handleExportPDF} className="btn btn-danger">
              Export to PDF
            </button>
          </div>

          {/* Billing Statements Table */}
          <table className="table table-bordered" style={{ backgroundColor: "white" }}>
            <thead className="table-dark" style={{ backgroundColor: 'blue' }}>
              <tr>
                <th style={{ padding: "12px", textAlign: "center", color: 'white' }}>S.No</th>
                <th style={{ padding: "12px", textAlign: "center", color: 'white' }}>From Date</th>
                <th style={{ padding: "12px", textAlign: "center", color: 'white' }}>To Date</th>
                <th style={{ padding: "12px", textAlign: "center", color: 'white' }}>Client Name</th>
                <th style={{ padding: "12px", textAlign: "center", color: 'white' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((statement, index) => (
                  <tr key={statement._id}>
                    <td style={{ textAlign: "center", padding: "10px" }}>{index + 1}</td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {new Date(statement.fromDate).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {new Date(statement.toDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "10px" }}>{statement.clientName}</td>
                    <td style={{ textAlign: "right", padding: "10px" }}>
                      {statement.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#666666" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * itemsPerPage >= billingStatements.length}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingStatements;
