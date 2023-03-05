var bodyParser = require('body-parser')
const express = require("express");
require("dotenv").config();
var cors = require("cors");

var ReviewController = require("./controllers/userReviewController")
var UserController = require("./controllers/userController")
var FollowController = require("./controllers/userFollowsController")


var TitlesSql = require("./sql/titlesSql")

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = 5000;

var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "db",
  multipleStatements: true
});
connection.connect();

app.get("/", (req, res) => {
  connection.query(TitlesSql.getAll, function (error, results, fields) {
    if (error) {
      connection.end();
      throw error;
    }
    console.log("The solution is: ", results[0]);

    res.send(results[0]);
  });
});

// Users
// Create user
app.post('/register', (req, res) => {
  UserController.register(req, res, connection)
})

// Login
app.post('/login', (req, res) => {
  UserController.login(req, res, connection)
})

// UserReview
// Create review
app.post("/review", (req, res) => {
  ReviewController.createReview(req, res, connection)
})

// UserFollow
// follow a user
app.post("/followers/follow", (req, res) => {
  FollowController.createFollower(req, res, connection)
})

// unfollow a user
app.post("/followers/unfollow", (req, res) => {
  // FollowController.deleteFollower(req, res, connection)
})

// get follower list
app.get("/followers/get/:userId", (req, res) => {
  FollowController.getFollowerList(req, res, connection)
})

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
