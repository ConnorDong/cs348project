
// Get all writers of a title
exports.getWritersByTconst = `
    select * from Writers as td 
    join NameBasics as nb on td.nconst=nb.nconst
    where td.tconst=?
`

// Get all directors of a title
exports.getDirectorsByTconst = `
    select * from Directors as td 
    join NameBasics as nb on td.nconst=nb.nconst
    where td.tconst=?
`
// Get all crew of a title
exports.getCrewByTconst = `
 
`