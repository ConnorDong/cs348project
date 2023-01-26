const express = require('express');

const app = express();
const PORT = 5000;

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'hello_world'
});

app.get('/', (req, res) => {
  connection.connect();

  connection.query('SELECT * from persons', function (error, results, fields) {
    if (error) {
      connection.end();
      throw error
    };
    console.log('The solution is: ', results[0]);

    res.send(results[0]);
  });

  connection.end();
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
