# Billing System API

This repository is a full-stack billing system that allows managing transactions, billing statements, client advance payments, and billing collections. It is built using Express Generator for backend setup with Node.js, Express, and MongoDB Atlas, and a frontend with React.

## Table of Contents
- [Backend Setup](#backend-setup)
- [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Backend Dependencies](#backend-dependencies)
- [Frontend Dependencies](#frontend-dependencies)

## Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/Interview-Task.git
   cd Interview-Task
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     PORT=3000
     MONGO_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-secret-key
     ```

4. To run the backend:
   ```bash
   npx nodemon
   ```

The backend will run on `http://localhost:3000`.

## Database Setup (MongoDB Atlas)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster and database.
3. Get the connection string and replace `your-mongodb-atlas-connection-string` in the `.env` file.
4. Make sure to allow access from your IP in MongoDB Atlas Network settings.

## API Endpoints

### 1. Add Transaction
**Endpoint:** `POST /api/billTransaction/addTransaction`

**Request Body:**
```json
{
    "receiptNumber": "RT017",
    "patientName": "Kiran Joshi",
    "clientName": "Max Healthcare",
    "visitDate": "2025-03-21T16:10:00Z",
    "visitId": "V007",
    "grossAmount": 4800,
    "discount": 480,
    "netAmount": 4320,
    "paidAmount": 4320,
    "paymentMode": "Upi"
}
```

**Response:**
```json
{
    "message": "Transaction added successfully",
    "transaction": {
        "_id": "67eb5e58f0fc11942ad8aa43",
        "dueAmount": 0,
        "createdAt": "2025-04-01T03:32:40.795Z"
    }
}
```

### 2. Create Billing Statement
**Endpoint:** `POST /api/billing/postBill`

**Request Body:**
```json
{
    "fromDate": "2025-03-01T00:00:00Z",
    "toDate": "2025-03-10T23:59:59Z",
    "clientName": "Apollo Hospitals",
    "totalAmount": 15000
}
```

**Response:**
```json
{
    "message": "Billing statement created successfully",
    "data": {
        "_id": "67eb5fe0f0fc11942ad8aa49",
        "createdAt": "2025-04-01T03:39:12.452Z"
    }
}
```

### 3. Add Client Advance Payment
**Endpoint:** `POST /api/client-advancePymnt/advancePayments`

**Request Body:**
```json
{
    "clientName": "Apollo Hospitals",
    "clientCode": "AP001",
    "advancePaymentDate": "2025-03-05T10:30:00Z",
    "collectedUser": "Ravi Kumar",
    "remark": "Initial deposit for Q1",
    "receiptNumber": "RC001",
    "paymentMethod": "Credit Card"
}
```

**Response:**
```json
{
    "message": "Advance payment recorded successfully"
}
```

### 4. Add Billing Collection
**Endpoint:** `POST /api/clientCollection/addClientColl`

**Request Body:**
```json
{
    "patientName": "Anjali Nair",
    "patientId": "P001",
    "visitDate": "2025-03-15T10:00:00Z",
    "visitId": "V001",
    "clientName": "Kerala Health Services",
    "testName": "Blood Test",
    "mrp": 1500,
    "discountAmount": 150,
    "netAmount": 1350,
    "collectedAmount": 1350,
    "dueAmount": 0
}
```

**Response:**
```json
{
    "message": "Billing record added successfully"
}
```

## Backend Dependencies

The backend uses the following dependencies:

- `bcryptjs`: Password hashing
- `cookie-parser`: Parses cookies
- `cors`: Enables cross-origin requests
- `dotenv`: Loads environment variables
- `ejs`: Templating engine
- `exceljs`: Excel file handling
- `express`: Web framework (generated using Express Generator)
- `http-errors`: HTTP error handling
- `jsonwebtoken`: JWT authentication
- `mongodb`: MongoDB driver
- `mongoose`: ODM for MongoDB
- `morgan`: HTTP request logger
- `multer`: File uploads
- `nodemon`: Development server auto-restart
- `pdfkit`: PDF generation

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3001`.

## Frontend Dependencies

The frontend uses the following dependencies:

- `axios`: HTTP client
- `bootstrap`: UI framework
- `react`: Frontend library
- `react-dom`: React DOM functions
- `react-paginate`: Pagination component
- `react-router-dom`: Routing library
- `react-scripts`: Scripts for React setup
- `web-vitals`: Web performance metrics
- `@testing-library/react`, `@testing-library/jest-dom`, etc.: Testing utilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

