exports.getByUserId = `
select * from WatchList
    where userId=?
`
// Get watch list items joined with title name
exports.getWatchListItems = `
    select tconst, primaryTitle from WatchListItem
    natural inner join TitleBasics as tb
    where listId=?
`


exports.createWatchList = `
START TRANSACTION;
    insert into WatchList
    values (uuid(), ?, ?);
    select @last_uuid as listId;
COMMIT;
`

exports.deleteWatchList = `
delete from WatchList
    where listId=?
`

exports.createWatchListItem = `
insert into WatchListItem
    values (?, ?)
`

exports.deleteWatchListItem = `
delete from WatchListItem
    where listId=? and tconst=?
`
