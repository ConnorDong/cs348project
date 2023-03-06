var UserReviewSql = require("../sql/userReviewSql")

/*
Create a review for a given user and title
Example request
{
    "userId": "625f1823-bb7d-11ed-bcfe-04d4c4ab8f25",
    "titleId": "tt0000001",
    "rating": 9.8,
    "description": "Great movie"
}
*/

exports.createReview = function(req, res, connection) {
  let data = req.body;
  connection.query(UserReviewSql.createReview, 
        [data.userId, data.titleId, data.rating, data.description], 
    function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }
    res.send(JSON.stringify({
      "message": "Successfully created review",
      "data": {
        "reviewId": results[2][0].reviewId
      }
    }));
  });
}

exports.deleteReview = function(req, res, connection) {
  let data = req.body;
  connection.query(UserReviewSql.deleteReview, [data.reviewId], function(error, results, field) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }
    res.send();
  })
}