var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '207.244.239.47',
  user: 'root',
  password: '',
  database: 'gtav_rp2',
  port: 3306
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from characters', function (error, results, fields){
    if (error) {
      console.log(error);
    }
    else {
      console.log(results[0]);
    }
  });

  res.render('index', { title: 'Express' });
});


module.exports = router;
