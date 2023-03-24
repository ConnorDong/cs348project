var GenresSql = require("../sql/genresSql")

exports.listGenres = function(req, res, connection) {
  connection.query(GenresSql.allGenres, function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": "Successfully retrieved genres",
      "data": results
    }));
  });
}

exports.listGenresByRating = function(req, res, connection) {
  connection.query(GenresSql.genresByPopularity, function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": "Successfully retrieved genres",
      "data": results
    }));
  });
}

exports.listGenresByCount = function(req, res, connection) {
  connection.query(GenresSql.genresByCount, function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": "Successfully retrieved genres",
      "data": results
    }));
  });
}

