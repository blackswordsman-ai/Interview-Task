var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./database/db')



var trasactionRoutes = require('./routes/transactionRoutes');
var billTransactionRoutes = require('./routes/billTransactionRoutes');
var billingStatementRoutes = require('./routes/billingStatementRoutes');
var ClientAdvanceRoutes = require('./routes/clientAdvanceRoutes');
var clientCollectionRoutes = require('./routes/clientBillingCollectionRoutes');
var misReportRoutes = require('./routes/misReportRoutes');
var clientTransactionRoutes = require('./routes/clientTransactionRoutes');


var app = express();



connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/transactions',trasactionRoutes);
app.use('/api/billTransaction',billTransactionRoutes);
app.use('/api/billing',billingStatementRoutes);
app.use('/api/client-advancePymnt',ClientAdvanceRoutes);
app.use('/api/clientCollection',clientCollectionRoutes);
app.use('/api/misReport',misReportRoutes);
app.use('/api/clientTransaction',clientTransactionRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
