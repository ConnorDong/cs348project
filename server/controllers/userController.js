var UserSql = require("../sql/userSql");
var UserFollowsSql = require("../sql/userFollowsSql");
var UserReview = require("../sql/userReviewSql");
var WatchListSql = require("../sql/watchListSql");

/* Register user with username and password
Example request:
{
  "username": "myuser",
  "password": "mypass"
}

Expected response:
200: User was created successfully
400: User already exists
*/
exports.register = function (req, res, connection) {
  let data = req.body;
  let [username, password] = [data.username, data.password];

  connection.query(
    UserSql.register,
    [username, password],
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }

      // The sql query has 4 statements
      // we are interested in the first result of the third line executed
      console.log("New user: ", results[2][0]);

      res.send(
        JSON.stringify({
          message: "Successfully registered user " + username,
          data: {
            userId: results[2][0].userId,
            username: username,
          },
        })
      );
    }
  );
};

/* Login user with username and password
Example request:
{
  "username": "myuser",
  "password": "mypass"
}

Expected response:
200: User was created successfully
400: User already exists
*/
exports.login = function (req, res, connection) {
  let data = req.body;
  let [username, password] = [data.username, data.password];
  connection.query(
    UserSql.login,
    [username, password, username],
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }
      if (results[0].loginSucceeded == 0) {
        res.send(
          JSON.stringify({
            message: `Failed login for user ${username}: Incorrect username or password.`,
            data: {
              userId: results[0].userId,
              username: username,
            },
          })
        );
      } else {
        res.send(
          JSON.stringify({
            message: "Successful login from user " + username,
            data: {
              userId: results[0].userId,
              username: username,
            },
          })
        );
      }
    }
  );
};

/* Get a list of users in the database */
exports.getAll = function (req, res, connection) {
  connection.query(UserSql.getAll, function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send(JSON.stringify(error));
      return;
    }

    res.send(
      JSON.stringify({
        message: "Successfully retrieved users",
        data: results,
      })
    );
  });
}

/* 
Info page for a user
Expected request format: /users/:userId
Expected response:
{
    "message": "Successfully retrieved user info",
    "data": {
        "user": [
            {
                "userId": "601876bb-8b8b-4558-8a79-e9d70ff76b46",
                "username": "mjane"
            }
        ],
        "followers": [
            {
                "userId": "bcab1d5d-e34d-487f-bc67-493335499b07",
                "username": "jsmith"
            }
        ],
        "following": [
            {
                "userId": "601876bb-8b8b-4558-8a79-e9d70ff76b46",
                "username": "mjane"
            }
        ],
        "reviews": [
            {
                "reviewId": "e135899c-075b-4471-b8d4-11c72d9abf24",
                "userId": "601876bb-8b8b-4558-8a79-e9d70ff76b46",
                "tconst": "tt0000002",
                "rating": 8.5,
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt suscipit turpis ut ullamcorper. Pellentesque dictum a quam a eleifend. Donec rutrum leo sapien, eget mollis nisl bibendum vitae. Nam rhoncus scelerisque sem, a consequat nibh eleifend vel. Pellentesque posuere pulvinar ipsum id euismod. Suspendisse potenti. In quis justo dignissim, molestie lacus eget, varius felis. Mauris quam ex, finibus eu nulla nec, congue pellentesque purus. Nam gravida scelerisque tristique. Fusce at urna ut arcu sagittis."
            }
        ],
        "watchlists": [
            {
                "watchListId": "f7e3c1b9-7d9b-4c5e-9d1c-0a7b6d8e1c0a",
                "name": "mjane's favorites",
                "titles": [
                    {
                        "tconst": "tt0000003",
                        "primaryTitle": "Pauvre Pierrot"
                    },
                    {
                        "tconst": "tt0000004",
                        "primaryTitle": "Un bon bock"
                    }
                ]
            }
        ]
    }
}
*/
exports.getUserInfo = async function (req, res, connectionPromise) {
  // Get the userId from the request
  let userId = req.params.userId;
  // Get list of users that follow this user
  const connection = await connectionPromise;

  console.log("User id:" + userId);

  const [user, fields0] = await connection.execute(UserSql.getByUserId, [userId]);

  // Get all followers of a user
  const [followers, fields1] = await connection.execute(UserFollowsSql.getFollowerList, [userId]);

  // Get all users that this user follows
  const [following, fields2] = await connection.execute(UserFollowsSql.getFollowingList, [userId]);

  // Get all reviews by this user
  const [reviews, fields3] = await connection.execute(UserReview.getByUserId, [userId]);

  // Get all watchlists by this user
  const [rows4, fields4] = await connection.execute(WatchListSql.getByUserId, [userId]);
  const watchLists = []
  console.log("Watchlists: " + rows4)
  // for each watchlist, fetch the titles of the list
  for (let i = 0; i < rows4.length; i++) {
    const watchListId = rows4[i].listId;
    const name = rows4[i].listName;
    console.log("Watchlist id: " + watchListId, "name: " + name)
    const [rows5, fields5] = await connection.execute(WatchListSql.getWatchListItems, [watchListId]);
    watchLists.push(
      {
        watchListId: watchListId,
        name: name,
        titles: rows5
      }
    );
  }

  const result = {
    user: user,
    followers: followers,
    following: following,
    reviews: reviews,
    watchlists: watchLists,
  };

  res.send(
    JSON.stringify({
      message: "Successfully retrieved user info",
      data: result,
    })
  );
}