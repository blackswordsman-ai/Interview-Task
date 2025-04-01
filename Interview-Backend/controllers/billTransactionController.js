const BillTransaction = require("../models/billTransactionModel");
const excelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new BillTransaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await BillTransaction.find();

    // Return JSON response for the React frontend
    res.status(200).json({
      transactions,
      referralTypes: ["Type 1", "Type 2", "Type 3"],
      branches: ["Branch 1", "Branch 2", "Branch 3"]
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

  
// Export transactions to Excel
exports.exportToExcel = async (req, res) => {
  try {
    const transactions = await BillTransaction.find();
    
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Transactions");

    // Add column headers
    worksheet.columns = [
      { header: "S.No", key: "sNo", width: 10 },
      { header: "Receipt Number", key: "receiptNumber", width: 20 },
      { header: "Patient Name", key: "patientName", width: 20 },
      { header: "Client Name", key: "clientName", width: 20 },
      { header: "Visit Date", key: "visitDate", width: 20 },
      { header: "Visit ID", key: "visitId", width: 20 },
      { header: "Gross Amount", key: "grossAmount", width: 15 },
      { header: "Discount", key: "discount", width: 10 },
      { header: "Net Amount", key: "netAmount", width: 15 },
      { header: "Paid Amount", key: "paidAmount", width: 15 }
    ];

    // Add rows
    transactions.forEach((transaction, index) => {
      worksheet.addRow({
        sNo: index + 1,
        ...transaction._doc
      });
    });

    // Set response headers
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=bill_transactions.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export transactions to PDF
exports.exportToPDF = async (req, res) => {
  try {
    const transactions = await BillTransaction.find();
    
    const doc = new PDFDocument();
    const filePath = "bill_transactions.pdf";
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(16).text("Bill Transaction Report", { align: "center" }).moveDown(2);
    
    transactions.forEach((transaction, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. Receipt No: ${transaction.receiptNumber}, Patient: ${transaction.patientName}, Client: ${transaction.clientName}, Visit Date: ${transaction.visitDate.toDateString()}, Gross: ${transaction.grossAmount}, Discount: ${transaction.discount}, Net: ${transaction.netAmount}, Paid: ${transaction.paidAmount}`)
        .moveDown();
    });

    doc.end();

    writeStream.on("finish", () => {
      res.download(filePath, (err) => {
        if (err) res.status(500).json({ message: "Error generating PDF" });
        fs.unlinkSync(filePath); // Clean up file after sending
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
