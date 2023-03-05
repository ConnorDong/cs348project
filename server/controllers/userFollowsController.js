UserFollowSql = require("../sql/userFollowsSql")

/* Register user with username, email and password
Example request:
{
  "userId": "625f1823-bb7d-11ed-bcfe-04d4c4ab8f25",
  "userFollowsId": "625f1823-0000-11ed-bcfe-04d4c4ab8f25"
}

Expected response:
200: Follow succeeded
400: Follow failed
*/
exports.createFollower = function(req, res, connection) {
  let data = req.body;
  connection.query(UserFollowSql.createFollower, 
        [data.userId, data.userFollowsId], 
    function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": `User ${data.userId} successfully followed ${data.userFollowsId}`,
      "data": {}
    }));
  });
}

/*
Unfollow a user
Request and response same as following a user
*/
exports.deleteFollower = function(req, res, connection) {
  let data = req.body;
  connection.query(UserFollowSql.deleteFollower, 
        [data.userId, data.userFollowsId], 
    function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }

    res.send(JSON.stringify({
      "message": `User ${data.userId} successfully unfollowed ${data.userFollowsId}`,
      "data": {}
    }));
  });

}

/*
Returns a list of followers and their usernames
Example request:
{
    "userId": "625f1823-bb7d-11ed-bcfe-04d4c4ab8f25"
}

Example response:
{
    "message": "Got follower list for f0584f44-bba4-11ed-bcfe-04d4c4ab8f25",
    "data": {
        "count": 2,
        "followers": [
            {
                "userId": "e5214e37-bba4-11ed-bcfe-04d4c4ab8f25",
                "username": "user5"
            },
            {
                "userId": "f0584f44-bba4-11ed-bcfe-04d4c4ab8f25",
                "username": "user5"
            }
        ]
    }
}
*/
exports.getFollowerList = function(req, res, connection) {
  let data = req.body;
  let userId = req.params.userId
  console.log(`userID is ${userId}`)

  connection.query(UserFollowSql.getFollowerList, 
        [userId], 
    function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;
    }
    console.log(results)

    res.send(JSON.stringify({
      "message": `Got follower list for ${data.userId}`,
      "data": {
        "count": results.length,
        "followers": results
      }
    }));
  });
}