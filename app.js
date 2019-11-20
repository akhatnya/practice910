const { Pool } = require('pg');

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kek',
    password: 'postgres',
    port: 5432,
});

connection.query("select * from todosasd", 
    (err, res) => {

        if (err) {
            console.error(err);
        } else {
            console.log(res.rows);
        }

        connection.end();
    });