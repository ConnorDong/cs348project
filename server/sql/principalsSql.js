
// Get all writers of a title
exports.getPrincipalsByTconst = `
    select * from TitlePrincipals as p
    join NameBasics as nb
    on p.nconst=nb.nconst
    where tconst=?
`

// Get all characters of a title and who plays them
exports.getPortrayalsByTconst = `
    select * from Portrays as p
    left join NameBasics as nb
    on p.nconst=nb.nconst
    where tconst=?
`