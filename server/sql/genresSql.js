
// Show a list of all possible genres
exports.allGenres = `
    select distinct genre from Genres
`
// Get all genres associated with a title
exports.getByTconst = `
    select distinct genre from Genres where tconst=?
`

// List the genres with the most number of titles associated with it
exports.genresByCount = `
    select genre, count(*) as cnt from Genres
    group by genre
    order by cnt desc
`

// List genres with the highest average rating
exports.genresByPopularity = `
    select * from
     (select g.genre, avg(tr.averageRating) as averageRating, sum(tr.numVotes) as numVotes
     from Genres as g
     join TitleRatings as tr
     on g.tconst = tr.tconst
     group by genre
    ) as gtr
    order by gtr.averageRating desc, gtr.numVotes desc;
`