var bodyParser = require('body-parser')
const express = require("express");
require("dotenv").config();
var cors = require("cors");

var ReviewController = require("./controllers/userReviewController")
var UserController = require("./controllers/userController")
var FollowController = require("./controllers/userFollowsController")
var TitleController = require("./controllers/titleController")
var GenresController = require("./controllers/genresController")
var TitlesSql = require("./sql/titlesSql")

const PORT = 5000;

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var conf = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "db",
  multipleStatements: true
}

var mysql = require("mysql2");
var connection = mysql.createConnection(conf);
connection.connect();

// Create async connection for controllers that require running multiple consecutive queries
// All controllers that wish to use the connectionPromise will need to do `const connection = await connectionPromise`
const mysqlAsync = require('mysql2/promise');
var connectionPromise = mysqlAsync.createConnection(conf);

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


// Titles ---------------------------------------------------------------------
// Get detailed information about a title
app.get('/titles/get/:tconst', (req, res) => {
  TitleController.getInfo(req, res, connectionPromise)
})

// List highest rated titles
app.get('/titles/getHighestRated', (req, res) => {
  TitleController.getAllHighestRated(req, res, connection)
})


// Genres ---------------------------------------------------------------------
// List genres
app.get('/genres', (req, res) => {
  GenresController.listGenres(req, res, connection)
})

// Group genres by average rating
app.get('/genres/topRated', (req, res) => {
  GenresController.listGenresByRating(req, res, connection)
})

// Group genres by number of titles
app.get('/genres/topCount', (req, res) => {
  GenresController.listGenresByCount(req, res, connection)
})

// Users ----------------------------------------------------------------------
// Create user
app.post('/register', (req, res) => {
  UserController.register(req, res, connection)
})

// Login
app.post('/login', (req, res) => {
  UserController.login(req, res, connection)
})

// Reviews --------------------------------------------------------------------
// Create review
app.post("/review", (req, res) => {
  ReviewController.createReview(req, res, connection)
})

// Followers ------------------------------------------------------------------
// follow a user
app.post("/followers/follow", (req, res) => {
  FollowController.createFollower(req, res, connection)
})

// unfollow a user
app.post("/followers/unfollow", (req, res) => {
  FollowController.deleteFollower(req, res, connection)
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
