exports.getAll = `
    select * from Users;
`;

// Register a user with username and password
exports.register = `
START TRANSACTION;
    insert into Users VALUES (uuid(), ?, ?);
    select @last_uuid as userId;
COMMIT;
`;

// Login will check if there exists a user with
// username and password
// if query returns empty, login attempt failed
// otherwise we expect query to return at most 1 row
exports.login = `
    select exists( select * from Users
    where username=?
    and password=?) as loginSucceeded,
    (select userId from Users
    where username=?) as userId;
`;
