exports.ADMIN_PANEL_PERMISSION = `view_admin_panel`

exports.checkPermission = `
SELECT EXISTS (
	SELECT *
	FROM Users u
	JOIN UserRoles ur ON u.userId = ur.userId
	JOIN Roles r ON ur.roleId = r.roleId
	JOIN RolePermissions rp ON r.roleId = rp.roleId
	JOIN Permissions p ON rp.permissionId = p.permissionId
	WHERE u.userId = ? AND p.permissionName = ?)
as hasPermission;
`