exports.createFollower = `
    insert into UserFollows values (?, ?)
`

// Get a list of users (userId, userName) that follow a user
exports.getFollowerList = `
    select u.userId, u.username from UserFollows as uf
    join Users as u on uf.userId=u.userId
    where followsUserId=?
`

// Unfollow a user
exports.deleteFollower = `
    delete from UserFollows
    where userId=? and followsUserId=?
`
