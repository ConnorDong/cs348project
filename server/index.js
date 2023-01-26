const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const PORT = 5000;

var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "hello_world",
});
connection.connect();

app.get("/", (req, res) => {
  connection.query("SELECT * from persons", function (error, results, fields) {
    if (error) {
      connection.end();
      throw error;
    }
    console.log("The solution is: ", results[0]);

    res.send(results[0]);
  });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
