const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'homework',
    password: 'hanif123222',
    port: 5432,
});

module.exports = pool