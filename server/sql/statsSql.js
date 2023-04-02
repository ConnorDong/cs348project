exports.moviesPerYear = `
    SELECT startYear, COUNT(*) as num_movies
    FROM TitleBasics
    GROUP BY startYear
    ORDER BY startYear;
`

exports.moviesByGenre = `
    SELECT genre, COUNT(*) as num_movies
    FROM Genres
    JOIN TitleBasics ON Genres.tconst = TitleBasics.tconst
    GROUP BY genre
    ORDER BY num_movies DESC
    LIMIT 10;
`

exports.actorsByMovieCount = `
    SELECT primaryName as name, COUNT(*) as num_movies
    FROM Portrays
    JOIN NameBasics ON Portrays.nconst = NameBasics.nconst
    GROUP BY primaryName
    ORDER BY num_movies DESC
    LIMIT 50;
`

exports.actorsByPopularity = `
SELECT
  nb.nconst,
  nb.primaryName as name,
  SUM(tr.numVotes) AS total_num_votes
FROM NameBasics nb
JOIN Portrays p ON nb.nconst = p.nconst
JOIN TitleBasics tb ON p.tconst = tb.tconst
JOIN TitleRatings tr ON tb.tconst = tr.tconst
GROUP BY nb.nconst, nb.primaryName
ORDER BY total_num_votes DESC
LIMIT 50;
`


exports.movieRuntimeLengths = `
SELECT
    CASE
    WHEN runtimeMinutes < 15 THEN '0-15'
    WHEN runtimeMinutes < 30 THEN '15-30'
    WHEN runtimeMinutes < 45 THEN '30-45'
    WHEN runtimeMinutes < 60 THEN '45-60'
    WHEN runtimeMinutes < 75 THEN '60-75'
    WHEN runtimeMinutes < 90 THEN '75-90'
    WHEN runtimeMinutes < 105 THEN '90-105'
    WHEN runtimeMinutes < 120 THEN '105-120'
    WHEN runtimeMinutes < 135 THEN '120-135'
    WHEN runtimeMinutes < 150 THEN '135-150'
    WHEN runtimeMinutes < 165 THEN '150-165'
    WHEN runtimeMinutes < 180 THEN '165-180'
    WHEN runtimeMinutes > 180 THEN  '180+'
    END as runtime_range,
    COUNT(*) as num_movies
FROM TitleBasics
GROUP BY runtime_range
ORDER BY runtime_range;
`

exports.ratingsByYear = `
WITH yearly_avg_ratings AS (
    SELECT
      startYear,
      AVG(tr.averageRating) AS avg_rating
    FROM TitleBasics tb
    JOIN TitleRatings tr ON tb.tconst = tr.tconst
    GROUP BY startYear
  )
  SELECT
    startYear,
    AVG(avg_rating) OVER (ORDER BY startYear ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_average
  FROM yearly_avg_ratings
  ORDER BY startYear;
`

exports.getUsernames = `
SELECT username, userId
FROM Users
`

exports.getFollowers = `
SELECT *
FROM UserFollows
`
