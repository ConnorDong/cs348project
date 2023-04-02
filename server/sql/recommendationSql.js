
exports.recommendationByUser = `
WITH watch_list_join as (
	SELECT wl.listId, userId, tconst from
    WatchList wl
    JOIN WatchListItem wli
    on wl.listId = wli.listId
),
co_occurrence_matrix AS (
    SELECT a.tconst AS movieA, b.tconst AS movieB, COUNT(*) AS co_occurrence
    FROM WatchListItem a, WatchListItem b
    WHERE a.listId = b.listId and a.tconst != b.tconst
    GROUP BY a.tconst, b.tconst
),
cosine_similarity AS (
    SELECT movieA, movieB,
           co_occurrence / SQRT(SUM(co_occurrence) OVER (PARTITION BY movieA) *
                                SUM(co_occurrence) OVER (PARTITION BY movieB)) AS similarity
    FROM co_occurrence_matrix
),
user_unwatched_movies AS (
    SELECT distinct wlj.userId, wlj2.tconst
    FROM watch_list_join wlj, watch_list_join wlj2 
    WHERE (wlj.userId, wlj2.tconst) not in (select wlj3.userId, wlj3.tconst from watch_list_join wlj3)
    order by wlj.userId
    
),
user_movie_similarity AS (
    SELECT uu.userId, cs.movieB, SUM(cs.similarity) AS total_similarity
    FROM user_unwatched_movies uu
    JOIN watch_list_join wlj ON uu.userId = wlj.userId
    JOIN cosine_similarity cs ON wlj.tconst = cs.movieA AND uu.tconst = cs.movieB
    GROUP BY uu.userId, cs.movieB
)
SELECT userId, movieB AS recommended_movie, total_similarity as score, primaryTitle
FROM user_movie_similarity
JOIN TitleBasics tb on tb.tconst = user_movie_similarity.movieB
WHERE userId = ?
ORDER BY total_similarity DESC
LIMIT 5;
`