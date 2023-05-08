var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'capstone_2023_health',
    password        : 'cs46xhealth',
    database        : 'capstone_2023_healt'
});


// Export it for use in our applicaiton
module.exports.pool = pool;