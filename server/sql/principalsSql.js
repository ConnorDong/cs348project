
// Get all writers of a title
exports.getPrincipalsByTconst = `
    select * from TitlePrincipals as p
    join NameBasics as nb
    on p.nconst=nb.nconst
    where tconst=?
`

// Get all characters of a title and who plays them
exports.getPortrayalsByTconst = `
    select nconst as nameId, portray as portrays, primaryName as actorName, birthYear, deathYear from Portrays as p
    left join NameBasics as nb
    using(nconst)
    where tconst=?
`