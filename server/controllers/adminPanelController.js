var AdminPanelSql = require('../sql/adminPanelSql');
var RbacSql = require("../sql/rbacSql")

exports.getAdminPanel = async function (req, res, connectionPromise) {
    const connection = await connectionPromise;
    // Get the user's id
    const userId = req.params.userId;
    console.log("Fetching admin data for user: " + userId)

    // Check if the user is an admin
    const [rows, fields] = await connection.execute(RbacSql.checkPermission, [userId, RbacSql.ADMIN_PANEL_PERMISSION]);

    // If the user is not an admin, return unauthorized
    if (rows[0].hasPermission == 0) {
        res.status(401);
        res.send(
            JSON.stringify({
                message: 'User is not an admin',
                data: [],
            })
        );
        return;
    }
    console.log("Got user is admin")
    
    // Get all admin data
    const [rows1, fields1] = await connection.execute(AdminPanelSql.globalStatus, []);
    console.log(rows1);

    // Map the results from [{"Variable_name": "var", "Value": "val"}, ...] to [{"name": "var", "value": "val", .."}, ...]
    // Ignore values with 0 or if length is greater than 5 characters
    const results = rows1.map((row) => {
        if (row.Value == 0 || row.Value.length > 5) {
            return null;
        }
        return {
            name: row.Variable_name,
            value: row.Value,
        };
    }).filter((row) => row != null);



    // Return the results
    res.send(
        JSON.stringify({
            message: 'Successfully retrieved admin panel',
            data: results,
        })
    );

};
