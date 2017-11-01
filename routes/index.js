var express = require('express');
var router = express.Router();

// Include the mysql node module
// It is not part of core, so we got it by doing: npm install mysql
//this module is NOT mysql. It is a node module that acts as a go between mysql and express/node
var mysql = require('mysql');

//set up the connection for our queries to use.
// createConnection is a method of the mysql object include above.
// it takes 1 arg:
// 1. object with properties:
	// host, user, password, database
// var dbOptions = {
// 	host:
// 	user:
// 	password:
// 	database:
// }

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'classicmodels'
});

// connection exists, run .connect()
connection.connect((error)=>{
	if(error){
		console.log(error.stack);
		return
	}else{
		console.log("Connected as ID" + connection.threadId);
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
	//Set up a string with our query inside it
	var selectQuery = "SELECT * FROM customers WHERE customerNumber > 200 limit 20;";
	//Call query() against our connection Takes 2 args;
	// 1. mysql query to run
	// 2. Callback when done with the query
			// -callback returns with: error, results, field
	connection.query(selectQuery, (error,results, fields)=>{
		console.log(error);
		// res.json(results);
		res.render('index', {results});
	});
  	// res.render('index', { title: 'Express' });
});

router.get('/employees', function(req, res, next) {
	//Set up a string with our query inside it
	var selectQueryOne = "SELECT * FROM employees;";
	//Call query() against our connection Takes 2 args;
	// 1. mysql query to run
	// 2. Callback when done with the query
			// -callback returns with: error, results, field
	connection.query(selectQueryOne, (error,results, fields)=>{
		console.log(error);
		// res.json(results);
		res.render('employees', {results});
	});
  	// res.render('index', { title: 'Express' });
});

router.get('/orderdetails', function(req, res, next) {
	//Set up a string with our query inside it
	var selectQueryTwo = "SELECT *,(priceEach * quantityOrdered) AS sum FROM orderdetails;";
	var selectQueryTwo = "INSERT *,(priceEach * quantityOrdered) AS sum FROM orderdetails;";
	//Call query() against our connection Takes 2 args;
	// 1. mysql query to run
	// 2. Callback when done with the query
			// -callback returns with: error, results, field
	connection.query(selectQueryTwo, (error,results, fields)=>{
		console.log(error);
		// res.json(results);
		res.render('orderdetails', {results});
	});
  	// res.render('index', { title: 'Express' });
});

module.exports = router;
