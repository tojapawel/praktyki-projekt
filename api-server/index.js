const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// MySQL connection configuration
// const connection = mysql.createConnection({
//   host: '192.168.0.214',
//   user: 'root',
//   password: 'root',
//   database: 'hotel-finder',
//   port: 33075
// });

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'hotel-finder',
  port: 33075
}); //TODO: Change to 

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware for parsing JSON requests
app.use(express.json());

// GET endpoint to fetch data from the database
app.get('/data', (req, res) => {
  const query = 'SELECT hotels_json FROM hotels where id = 1';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Error retrieving data from database' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
