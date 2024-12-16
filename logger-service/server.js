const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('./logs.db');
db.run('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, message TEXT)');

app.post('/log', (req, res) => {
    const { message } = req.body;
    db.run('INSERT INTO logs (message) VALUES (?)', [message], function (err) {
        if (err) return res.status(500).send('Error en la DB');
        res.send(`Log guardado con ID ${this.lastID}`);
    });
});

app.listen(4002, () => {
    console.log('Logger-Service corriendo en puerto 4002');
});
