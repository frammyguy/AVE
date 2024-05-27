const express = require("express");
const { createConnection } = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8800, () => {});
const db = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
});

function htmlEntities(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "˂")
        .replace(/>/g, "˃")
        .replace(/"/g, "ʺ")
        .replace(/\n/g, " ̿");
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "DELETE,GET,HEAD,OPTIONS,POST,PUT"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.post("/login", (req, res) => {
    const { login, password } = req.body;
    db.query(
        `SELECT password FROM users WHERE login='${htmlEntities(login)}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (!data.length) return res.json({ user: 0 });
            if (data[0].password == htmlEntities(password))
                return res.json({ user: 1, password: 1 });
            else return res.json({ user: 1, password: 0 });
        }
    );
});

app.post("/register", (req, res) => {
    const { login, password } = req.body;
    db.query(
        `INSERT INTO users (login, password) VALUES ('${htmlEntities(
            login
        )}', '${htmlEntities(password)}')`,
        (err, data) => {
            if (err) return console.log(err);
            return res.json(data);
        }
    );
});

app.post("/setSession", (req, res) => {
    const { sessionID, name } = req.body;
    db.query(
        `INSERT INTO sessions(sessionID, name) VALUES ('${sessionID}', '${htmlEntities(
            name
        )}')`,
        (err, data) => {
            if (err) return console.log(err);
            return res.json(data);
        }
    );
});

app.post("/getSession", (req, res) => {
    const sessionID = req.body.sessionID;
    db.query(
        `SELECT name FROM sessions WHERE sessionID='${sessionID}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (!data.length) return res.json({ user: 0 });
            else {
                db.query(
                    `SELECT progress FROM users WHERE login='${data[0].name}'`,
                    (err, data2) => {
                        if (err) return console.log(err);
                        return res.json({
                            user: data[0].name,
                            progress: data2[0].progress,
                        });
                    }
                );
            }
        }
    );
});

app.post("/changeProgress", (req, res) => {
    const { progress, name } = req.body;
    db.query(
        `UPDATE users SET progress=${progress} WHERE login='${htmlEntities(
            name
        )}'`,
        (err, data) => {
            if (err) return console.log(err);
            return res.json(data);
        }
    );
});
