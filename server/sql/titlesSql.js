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