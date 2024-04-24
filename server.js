const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'none',
    database: 'test'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
    res.send("Welcome to Todo App's server")
})

// Route to handle data retrieval
app.get('/getData', (req, res) => {
    connection.query('SELECT name FROM names', (error, results) => {
        if (error) {
            console.log('Error querying database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post('/insertData', (req, res) => {
	const taskName = req.body.name
    connection.query('INSERT INTO names (name) VALUES (?)', [taskName], (error, results) => {
        if (error) {
            console.log('Error querying database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });	
});

app.post('/deleteData', (req, res) => {
    const taskName = req.body.name
    connection.query('DELETE FROM names WHERE name = ?', [taskName], (error, results) => {
        if (error) {
            console.log('Error querying database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post('/editData', (req, res) => {
    const prevTaskName = req.body.prevName
    const newTaskName = req.body.newName
    connection.query('UPDATE names SET name = ? WHERE name = ?', [newTaskName, prevTaskName], (error, results) => {
        if (error) {
            console.log('Error querying database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
