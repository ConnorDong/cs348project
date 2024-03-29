exports.getAll = `
    select * from TitleBasics
`

exports.getHighestRatedTitles = `
    select * 
    from TitleBasics as t
    join TitleRatings as tr
    on t.tconst = tr.tconst
    order by averageRating desc, numVotes desc
`

// List titles by a specific genre
exports.getTitlesByGenre = `
    select *
    from TitleBasics as t
    join Genres as g
    on t.tconst=g.tconst
    where g.genre=?
`

// Get basic info about a title
exports.getTitleInfo = `
select * from TitleBasics as t
	join TitleRatings as tr
    on t.tconst=tr.tconst
    where tr.tconst=?;
`

exports.getDetailedTitleInfo = `
select TitleBasics.tconst as titleId,
TitleBasics.primaryTitle as title,
TitleBasics.startYear as year,
TitleBasics.isAdult as adult,
TitleRatings.averageRating as ratings,
TitleRatings.numVotes as voteCount,
(Select GROUP_CONCAT(genre SEPARATOR ', ') from Genres
 where Genres.tconst = titleId
 group by tconst
 ) as genre,
(Select GROUP_CONCAT(primaryName SEPARATOR ', ') from Directors
natural inner join NameBasics
where Directors.tconst = titleId
group by tconst
) as directors,
(Select GROUP_CONCAT(primaryName SEPARATOR ', ') from Writers
natural inner join NameBasics
where Writers.tconst = titleId
group by tconst
) as writers
from TitleBasics
natural inner join TitleRatings
where TitleBasics.tconst=?
`

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

exports.retrieveMoviesPaginated = `
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
    where TitleBasics.tconst > ?
    order by TitleBasics.tconst
    limit ?;
`

exports.retrieveMoviesByGenrePaginated = `
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
    natural inner join Genres
    where TitleBasics.tconst > ? and genre = ?
    order by TitleBasics.tconst
    limit ?;
`

exports.checkHasMore = `
select exists (select * from TitleBasics where tconst > ?) as hasMore;
`

exports.checkHasMoreByGenre = `
with genreSelect as (select TitleBasics.tconst as titleId,
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
    natural inner join Genres
    where TitleBasics.tconst > ? and genre = ?)
select exists (select * from genreSelect) as hasMore;
`