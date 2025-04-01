import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MISReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/misReport/getallMis");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  const filterReports = () => {
    return reports.filter(report => {
      const matchesPatient = patientFilter === "" || report.patientName === patientFilter;
      const matchesSearch = search === "" || report.barcodeNo.includes(search);
      const matchesDate = fromDate === "" || toDate === "" || 
        (new Date(report.sampleCollectedDate) >= new Date(fromDate) && new Date(report.sampleCollectedDate) <= new Date(toDate));
      return matchesPatient && matchesSearch && matchesDate;
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">MIS Reports</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-control" value={patientFilter} onChange={e => setPatientFilter(e.target.value)}>
            <option value="">All Patients</option>
            {[...new Set(reports.map(report => report.patientName))].map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Visit ID</th>
            <th>Service Name</th>
            <th>Sample</th>
            <th>Barcode No</th>
            <th>Status</th>
            <th>Sample Collected Date</th>
            <th>Sample Accepted Date</th>
          </tr>
        </thead>
        <tbody>
          {filterReports().map((report, index) => (
            <tr key={report._id}>
              <td>{index + 1}</td>
              <td>{report.patientId}</td>
              <td>{report.patientName}</td>
              <td>{report.visitId}</td>
              <td>{report.serviceName}</td>
              <td>{report.sample}</td>
              <td>{report.barcodeNo}</td>
              <td>{report.status}</td>
              <td>{new Date(report.sampleCollectedDate).toLocaleDateString()}</td>
              <td>{report.sampleAcceptedDate ? new Date(report.sampleAcceptedDate).toLocaleDateString() : "Not Accepted"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MISReports;
