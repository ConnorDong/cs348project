var UserSql = require("../sql/userSql")

/* Register user with username, email and password
Example request:
{
  "username": "myuser",
  "email": "my@email.com"
  "password": "mypass"
}

Expected response:
200: User was created successfully
400: User already exists
*/
exports.register = function(req, res, connection) {
  let data = req.body;
  let [username, email, password] = [data.username, data.email, data.password]

  connection.query(UserSql.register, [username, email, password], function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;

    }

    // The sql query has 4 statements
    // we are interested in the first result of the third line executed
    console.log("New user: ", results[2][0]);

    res.send(JSON.stringify({
      "message": "Successfully registered user " + username,
      "data": {
        "userId": results[2][0].userId,
        "username": username
      }
    }));
  });
}


/* Login user with username and password
Example request:
{
  "username": "myuser",
  "password": "mypass"
}

Expected response:
200: User was created successfully
400: User already exists
*/
exports.login = function(req, res, connection) {
  let data = req.body;
  let [username, password] = [data.username, data.password]
  connection.query(UserSql.login, [username, password, username], function (error, results, fields) {
    if (error) {
      res.status(400)
      res.send(JSON.stringify(error))
      return;

    }
    if (results[0].loginSucceeded == 0) {

      res.send(JSON.stringify({
        "message": `Failed login for user ${username}: Incorrect username or password.`,
        "data": {
          "userId": results[0].userId,
          "username": username
        }
      }));

    } else {
      res.send(JSON.stringify({
        "message": "Successful login from user " + username,
        "data": {
          "userId": results[0].userId,
          "username": username
        }
      }));

    }

  });
}