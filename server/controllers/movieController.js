var MovieSql = require("../sql/movieSql")

exports.getMovies = function(req, res, connection) {
  connection.query(MovieSql.retrieveMovies, [], function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;

    }
    res.send(JSON.stringify({
      "movies": results
    }));
  })
}