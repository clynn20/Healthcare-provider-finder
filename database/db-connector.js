var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '',
    user            : '',
    password        : '',
    database        : ''
});


// Export it for use in our applicaiton
module.exports.pool = pool;