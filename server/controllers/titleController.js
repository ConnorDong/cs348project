var TitlesSql = require("../sql/titlesSql");
var GenresSql = require("../sql/genresSql");
var WritersDirectorsSql = require("../sql/writersDirectorsSql");
var PrincipalsSql = require("../sql/principalsSql");
var UserReviewSql = require("../sql/userReviewSql");
var Constants = require("../constants")

/* Get data for a particular movie (reviews and metadata such as: genre, year, director, actors, crew, etc.)
Example request:
{
  "tconst": "tt0000001",
}

Example response:
{
    "message": "Successfully retrieved info for title tt0000001",
    "data": {
        "tconst": "tt0000001",
        "titleType": "short",
        "primaryTitle": "Carmencita",
        "originalTitle": "Carmencita",
        "isAdult": 0,
        "startYear": "1894",
        "endYear": null,
        "runtimeMinutes": "1",
        "averageRating": 5.7,
        "numVotes": "1952",
        "genres": [
            {
                "genre": "Documentary"
            },
            {
                "genre": "Short"
            }
        ],
        "directors": [
            {
                "tconst": "tt0000001",
                "nconst": "nm0005690",
                "primaryName": "William K.L. Dickson",
                "birthYear": 1860,
                "deathYear": 1935
            }
        ],
        "writers": [],
        "portrayals": [
            {
                "tconst": "tt0000001",
                "nconst": null,
                "portray": "\"[\"\"Self\"\"]\"",
                "primaryName": null,
                "birthYear": null,
                "deathYear": null
            }
        ],
        "principals": [
            {
                "tconst": "tt0000001",
                "ordering": "2",
                "nconst": "nm0005690",
                "category": "director",
                "job": null,
                "primaryName": "William K.L. Dickson",
                "birthYear": 1860,
                "deathYear": 1935
            }
        ],
        "reviews": [
            {
                "reviewId": "e950b18e-bbdf-11ed-bcfe-04d4c4ab8f25",
                "userId": "e5101164-bbdf-11ed-bcfe-04d4c4ab8f25",
                "tconst": "tt0000001",
                "rating": 9.800000190734863,
                "description": "Great movie"
            }
        ]
    }
}
*/
exports.getInfo = async function (req, res, connectionPromise) {
  let tconst = req.params.tconst;

  const connection = await connectionPromise;

  // Get all
  const [rows1, fields1] = await connection.execute(TitlesSql.getTitleInfo, [
    tconst,
  ]);
  let titleInfo = rows1[0];
  // Get all genres associated with the title
  const [genres, fields2] = await connection.execute(GenresSql.getByTconst, [
    tconst,
  ]);
  // Get all directors associated with the title
  const [directors, fields3] = await connection.execute(
    WritersDirectorsSql.getDirectorsByTconst,
    [tconst]
  );
  // Get all writers associated with the title
  const [writers, fields4] = await connection.execute(
    WritersDirectorsSql.getWritersByTconst,
    [tconst]
  );
  // Get all principals associated with the title
  //const [principals, fields5] = await connection.execute(PrincipalsSql.getPrincipalsByTconst, [tconst]);
  // Get all characters played by actors
  const [portrayals, fields6] = await connection.execute(
    PrincipalsSql.getPortrayalsByTconst,
    [tconst]
  );
  // Get all user reviews associated with the title
  const [reviews, fields7] = await connection.execute(
    UserReviewSql.getByTconst,
    [tconst]
  );

  titleInfo["genres"] = genres;
  titleInfo["directors"] = directors;
  titleInfo["writers"] = writers;
  titleInfo["portrayals"] = portrayals;
  //titleInfo['principals'] = principals
  titleInfo["reviews"] = reviews;
  res.send(
    JSON.stringify({
      message: `Successfully retrieved info for title ${tconst}`,
      data: titleInfo,
    })
  );
};

/*
Example Response:
{
    "message": "Successfully retrieved titles",
    "data": [
        {
            "tconst": "tt0009851",
            "titleType": "movie",
            "primaryTitle": "Masked Ball",
            "originalTitle": "Álarcosbál",
            "isAdult": 0,
            "startYear": "1917",
            "endYear": null,
            "runtimeMinutes": null,
            "averageRating": 9.2,
            "numVotes": "14"
        },
        {
            "tconst": "tt0002582",
            "titleType": "short",
            "primaryTitle": "The Widow Casey's Return",
            "originalTitle": "The Widow Casey's Return",
            "isAdult": 0,
            "startYear": "1912",
            "endYear": null,
            "runtimeMinutes": null,
            "averageRating": 9.1,
            "numVotes": "18"
        },
*/
exports.getAllHighestRated = function (req, res, connection) {
  connection.query(
    TitlesSql.getHighestRatedTitles,
    function (error, results, fields) {
      if (error) {
        res.status(400);
        res.send(JSON.stringify(error));
        return;
      }

      res.send(
        JSON.stringify({
          message: "Successfully retrieved titles",
          data: results,
        })
      );
    }
  );
};

exports.getMovies = async function (req, res, connectionPromise) {
  const connection = await connectionPromise;
  var cursor = req.query.cursor;

  // If there is no cursor, set it to the first movie
  if (cursor === undefined) {
    cursor = 'tt0000000'
  }

  const [results, fields1] = await connection.execute(
    TitlesSql.retrieveMoviesPaginated,
    [cursor, Constants.PAGE_SIZE]
  );

  // Get the next cursor
  var nextCursor = '';
  if (results.length > 0) {
    nextCursor = results[results.length - 1].titleId;
  }

  const [checkHasMore, fields2] = await connection.execute(
    TitlesSql.checkHasMore,
    [nextCursor]
  );

  // If there are no more results, set the next cursor to empty
  if (checkHasMore[0].hasMore == 0) {
    nextCursor = '';
  }

  res.send(
    JSON.stringify({
      movies: results,
      nextCursor: nextCursor
    })
  );
};

exports.getMovieDetails = async function (req, res, connectionPromise) {
  let data = req.body;
  const connection = await connectionPromise;
  console.log(data.titleId);
  const [info, fields1] = await connection.execute(
    TitlesSql.getDetailedTitleInfo,
    [data.titleId]
  );
  const [portrayals, fields2] = await connection.execute(
    PrincipalsSql.getPortrayalsByTconst,
    [data.titleId]
  );
  const [reviews, fields3] = await connection.execute(
    UserReviewSql.getByTconst,
    [data.titleId]
  );
  const titleInfo = info[0];
  portrayals.forEach((portrayal) => {
    let newStr = portrayal.portrays.split('"').join("");
    portrayal.portrays = newStr.substring(1, newStr.length - 1).split(",");
    portrayal.portrays = portrayal.portrays.map((portrayal) =>
      portrayal.trim()
    );
  });

  titleInfo["portrayals"] = portrayals;
  titleInfo["reviews"] = reviews;
  titleInfo.reviews;
  res.send(JSON.stringify(titleInfo));
};

exports.getMoviesByGenre = async function (req, res, connectionPromise) {
  const connection = await connectionPromise;
  var cursor = req.query.cursor;
  var genre = req.query.genre;
  // Fetch genre info
  const [genreInfo, fields0] = await connection.execute(GenresSql.genresInfoByGenre, [genre]);

  console.log("Genre info: ", genreInfo)
  // If there is no cursor, set it to the first movie
  if (cursor === undefined) {
    cursor = 'tt0000000'
  }

  console.log("Parameters: ", cursor, Constants.PAGE_SIZE, genre)

  const [results, fields1] = await connection.execute(
    TitlesSql.retrieveMoviesByGenrePaginated,
    [cursor, genre, Constants.PAGE_SIZE]
  );

  // Get the next cursor
  var nextCursor = '';
  if (results.length > 0) {
    nextCursor = results[results.length - 1].titleId;
  }

  const [checkHasMore, fields2] = await connection.execute(
    TitlesSql.checkHasMoreByGenre,
    [nextCursor, genre]
  );

  console.log("x checkHasMore: ", checkHasMore)

  // If there are no more results, set the next cursor to empty
  if (checkHasMore[0].hasMore == 0) {
    nextCursor = '';
  }

  res.send(
    JSON.stringify({
      genreInfo: genreInfo[0],
      movies: results,
      nextCursor: nextCursor
    })
  );
};