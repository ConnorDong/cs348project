exports.retrieveMovies = `
select TitleBasics.tconst as titleId,
TitleBasics.primaryTitle as title,
TitleBasics.startYear as year,
TitleBasics.isAdult as adult,
TitleRatings.averageRating as ratings,
TitleRatings.numVotes as voteCount,
(Select GROUP_CONCAT(genre SEPARATOR ', ') from Genres
 where Genres.tconst = titleId
 group by tconst
 ) as genre
 from TitleBasics
natural inner join TitleRatings
`