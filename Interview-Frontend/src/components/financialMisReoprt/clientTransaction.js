import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarNavigation from "../SidebarNavigation";
import Navbar from "../Navbar";

const ClientTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clientTransaction/clientTransaction");
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterTransactions(value, selectedDate);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    filterTransactions(search, value);
  };

  const filterTransactions = (searchValue, dateValue) => {
    const filtered = transactions.filter((transaction) => {
      const customerName = transaction.customerListName.toLowerCase();
      const transactionDate = transaction.encounterDttm.split("T")[0];
      return customerName.includes(searchValue) && (dateValue === "" || transactionDate === dateValue);
    });
    setFilteredTransactions(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {showSidebar && <SidebarNavigation />}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
        <div style={{ padding: "16px", backgroundColor: "#e6f7ff", overflowY: "auto" }}>
          <h2 style={{ color: "#003366", textAlign: "center", marginBottom: "20px" }}>Client Transactions</h2>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search by Customer Name"
              value={search}
              onChange={handleSearchChange}
              style={{ padding: "8px", fontSize: "16px", width: "250px" }}
            />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ padding: "8px", fontSize: "16px" }}
            />
          </div>
          <table className="table table-bordered" style={{ backgroundColor: "white", borderRadius: "8px" }}>
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Encounter Date</th>
                <th>Bill Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{transaction.customerListName}</td>
                    <td>{new Date(transaction.encounterDttm).toISOString().split("T")[0]}</td>
                    <td>₹{transaction.billAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#666666" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {Math.ceil(filteredTransactions.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTransactions;