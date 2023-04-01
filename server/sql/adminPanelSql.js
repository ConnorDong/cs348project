exports.uptime = `
SELECT VARIABLE_VALUE AS 'Uptime (in seconds)'
FROM INFORMATION_SCHEMA.GLOBAL_STATUS
WHERE VARIABLE_NAME = 'Uptime';
`

exports.globalStatus = `
SHOW GLOBAL STATUS
`

exports.averageQueryTime = `
SELECT (SUM(TIMER_WAIT) / COUNT(*)) AS 'Average Query Length (in picoseconds)'
FROM performance_schema.events_statements_summary_by_digest;
`