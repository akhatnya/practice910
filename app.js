const express = require('express');
const app = express();

const { Pool } = require('pg');

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kek',
    password: 'postgres',
    port: 5432,
});



app.get(
    "/getSomeData",
    (request, response) => {

        connection.query("select * from todos", 
        (err, res) => {

            if (err) {
                console.error(err);
            } else {
                response.json(res.rows);
            }
        });

    }
);

app.get(
    "/deleteById/:id",
    (request, response) => {

        connection.query("delete from todos where id = $1",
        [
            request.params.id
        ],
        (err, res) => {

            if (err) {
                response.json({ msg: err });
            } else {
                response.json({ msg: "successfully deleted" });
            }
        });

    }
);

app.get("/create/:desciption", (request, response) => {

    connection.query(
        "insert into todos(desciption) values($1)",
        [ request.params.desciption ],
        (err, res) => {
            if (err) {
                response.json({ msg: err });
            } else {
                response.json({ msg: "successfully inserted !" });
            }
        }
        );

});

app.listen(8080, () => { console.log("Приложуха запустилась"); });