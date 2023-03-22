UserFollowSql = require("../sql/userFollowsSql");
WatchListSql = require("../sql/watchListSql");

exports.createWatchList = function (req, res, connection) {
  let data = req.body;
  connection.query(
    WatchListSql.createWatchList,
    [data.userId, data.listName],
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }

      res.send(
        JSON.stringify({
          message: `empty watchlist created for user ${data.userId}`,
          data: {
            listId: results[2][0].listId
          },
        })
      );
    }
  );
};

exports.addWatchListItem = function (req, res, connection) {
  let data = req.body;
  console.log("Data is " + JSON.stringify(data));
  connection.query(
    WatchListSql.createWatchListItem,
    [data.listId, data.tconst],
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }

      res.send(
        JSON.stringify({
          message: `inserted ${data.tconst} into watchlist ${data.listId}`,
          data: {},
        })
      );
    }
  );
};

exports.removeWatchListItem = function (req, res, connection) {
  let data = req.body;
  connection.query(
    WatchListSql.deleteWatchListItem,
    [data.listId, data.tconst],
    function (error, results, fields) {
      if (error) {
        res.status(400);
      }
      res.send(
        JSON.stringify({
          message: `removed ${data.tconst} from watchlist ${data.listId}`,
          data: {},
        })
      );
    }
  );
};


exports.getWatchLists = function (req, res, connection) {
  let data = req.body;
  connection.query(
    WatchListSql.getWatchLists,
    [],
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }
      res.send(
        JSON.stringify({
          message: `Successfully retrieved watchlists`,
          data: {
            watchLists: results[0],
          }
        })
      );
    }
  );
};
