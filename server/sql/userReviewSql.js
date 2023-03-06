exports.getAll = `
select * from UserReview
`

// Get all reviews for a user
exports.getByUserId = `
select * from UserReview
    where userId=?
`
// Get all reviews made by a title
exports.getByTconst = `
select * from UserReview
    where tconst=?    
`

exports.createReview = `
START TRANSACTION;
    insert into UserReview
    values (uuid(), ?, ?, ?, ?);
    select @last_uuid as reviewId;
COMMIT;
`

exports.deleteReview = `
delete from UserReview
    where reviewId=? 
`