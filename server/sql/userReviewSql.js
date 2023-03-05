exports.getAll = `
select * from UserReview
`

// Get all reviews for a title
exports.getForTitle = `
select * from UserReview
    where userId=?
`
// Get all reviews made by a user
exports.getForUser = `
select * from UserReview
    where tconst=?    
`

exports.createReview = `
insert into UserReview
values (uuid(), ?, ?, ?, ?)
`