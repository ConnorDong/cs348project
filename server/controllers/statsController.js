var StatsSql = require("../sql/statsSql")

exports.getData = async function(req, res, connectionPromise) {
  const connection = await connectionPromise;
  // get the stats data
  const [moviesPerYear, fields1] = await connection.execute(StatsSql.moviesPerYear, []);

  const [moviesByGenre, fields2] = await connection.execute(StatsSql.moviesByGenre, []);
  // filter out nulls from moviesByGenre
  const filteredMoviesByGenre = moviesByGenre.filter((row) => row.genre != null);

  const [actorsByMovieCount, fields3] = await connection.execute(StatsSql.actorsByMovieCount, []);

  const [movieRuntimeLengths, fields4] = await connection.execute(StatsSql.movieRuntimeLengths, []);
  // filter out nulls from movieRuntimeLengths
  const filteredMovieRuntimeLengths = movieRuntimeLengths.filter((row) => row.runtime_range != null);
  // sort by runtime length
  filteredMovieRuntimeLengths.sort((a, b) => {
    // a.runtime_range is of the form "0-10"
    // remove + as well for 180+
    const aRuntimeNum = a.runtime_range.split("-")[0].replace("+", "");
    const bRuntimeNum = b.runtime_range.split("-")[0].replace("+", "")
    return aRuntimeNum - bRuntimeNum;
  })

  const [ratingsByYear, fields5] = await connection.execute(StatsSql.ratingsByYear, []);
  // filter out nulls from ratingsByYear
  const filteredRatingsByYear = ratingsByYear.filter((row) => row.startYear != null);

  const [socialNetworkNodes, fields6] = await connection.execute(StatsSql.getUsernames, []);
  const [socialNetworkEdges, fields7] = await connection.execute(StatsSql.getFollowers, []);

  // create a map between userId and userName
  const userIdToName = new Map();
  socialNetworkNodes.forEach((row) => {
    userIdToName.set(row.userId, row.username);
  });

  const nodes = socialNetworkNodes.map((row) => {
    return {
      id: userIdToName.get(row.userId)
    }
  });


  // replace the userIds with the usernames in edges
  const edgesWithNames = socialNetworkEdges.map((row) => {
    return {
      source: userIdToName.get(row.userId),
      target: userIdToName.get(row.followsUserId),
    }
  });

  const result = JSON.stringify({
    "message": "Successfully retrieved stats",
    "data": {
      "moviesPerYear": moviesPerYear,
      "moviesByGenre": filteredMoviesByGenre,
      "actorsByMovieCount": actorsByMovieCount,
      "movieRuntimeLengths": filteredMovieRuntimeLengths,
      "ratingsByYear": filteredRatingsByYear,
      "socialNetwork": {
        "nodes": nodes,
        "links": edgesWithNames,
      },
    }
  })
  console.log("Res is: " + result);

  res.send(
    result
  );
}