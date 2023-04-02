var RecommendationSql = require("../sql/recommendationSql")

exports.getRecommendationForUser = function(req, res, connection) {
  const userId = req.params.userId;
  console.log("userId is " + userId)
  connection.query(RecommendationSql.recommendationByUser, [userId], function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": "Successfully retrieved recommendations",
      "data": results
    }));
  });

}