const crypto = require('crypto');
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;
const API_KEY = 'ff65e1e206a6754a5641ce1fb13c628c772b51d6';

//klucz API: sUdwM2xbtu
function checkAPIKey(key) {
  const hashKey = crypto.createHash('sha1').update(key).digest('hex');
  return API_KEY === hashKey ? 0 : 1;
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://hassioustka.duckdns.org:3354');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const connection = mysql.createConnection({
  host: '192.168.0.137',
  user: 'root',
  password: 'root',
  database: 'hotel-finder',
  port: 33075
});
  
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());

//dodawanie komantarza dla danego hotelu
app.get('/addcomment/:apiKey/:hotelid/:author/:comment', (req, res) => {
  const apiKey = req.params.apiKey;

  const hotelid = req.params.hotelid;
  const author = req.params.author;
  const comment = req.params.comment;


  if (!checkAPIKey(apiKey)) {
    const query = `INSERT INTO comments (hotel_id, author, comment) VALUES ('${hotelid}','${author}', '${comment}')`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error executing MySQL query: ' + error.message });
      } else {
        res.json(0);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//zmiana dostępności pokoju
app.get('/changeavailable/:apiKey/:roomid/:value', (req, res) => {
  const apiKey = req.params.apiKey;

  const roomid = req.params.roomid;
  const value = req.params.value;

  if (!checkAPIKey(apiKey)) {
    const query = `UPDATE rooms SET available = ${value} WHERE id = ${roomid}`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error executing MySQL query: ' + error.message });
      } else {
        res.json(0);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//dodawanie rezerwacji
app.get('/addReservation/:apiKey/:firstName/:lastName/:email/:address/:address2/:city/:zip/:payment/:hotel_id/:room_id/:price/:arrival_date/:departue_date/:reservation_date/', (req, res) => {
  const apiKey = req.params.apiKey;

  const firstName = req.params.firstName;
  const lastName = req.params.lastName;
  const email = req.params.email;
  const address = req.params.address;
  const address2 = req.params.address2;
  const city = req.params.city;
  const zip = req.params.zip;
  const payment = req.params.payment;
  const hotel_id = req.params.hotel_id;
  const room_id = req.params.room_id;
  const price = req.params.price;
  const arrival_date = req.params.arrival_date;
  const departue_date = req.params.departue_date;
  const reservation_date = req.params.reservation_date;


  if (!checkAPIKey(apiKey)) {
    const query = `INSERT INTO reservations VALUES (NULL, '${firstName}', '${lastName}', '${email}', '${address}', '${address2}', '${city}', '${zip}', '${payment}', ${hotel_id}, ${room_id}, ${price}, '${arrival_date}', '${departue_date}', '${reservation_date}')`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error executing MySQL query: ' + error.message });
      } else {
        res.json(0);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie komentarzy dla danego hotelu
app.get('/comments/:apiKey/:id', (req, res) => {
  const commentId = req.params.id;
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = 'SELECT * FROM comments WHERE hotel_id = ?';

    connection.query(query, [commentId], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie informacji o wszystkich hotelach
app.get('/gethotels/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT * FROM hotels`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie wszystkich pokoi
app.get('/getrooms/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT * FROM rooms`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie informacji o pokojach w hotelu o id=hotel_id
app.get('/getrooms/:apiKey/:hotel_id', (req, res) => {
  const apiKey = req.params.apiKey;
  const hotel_id = req.params.hotel_id;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT r.* FROM rooms r JOIN hotels h ON r.hotel_id = h.id WHERE h.hotel_id = "${hotel_id}"`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }

});

//pobieranie informacji o hotelu o id=hotel_id
app.get('/gethotel/:apiKey/:hotel_id', (req, res) => {
  const apiKey = req.params.apiKey;
  const hotel_id = req.params.hotel_id;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT * FROM hotels WHERE hotel_id = "${hotel_id}"`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie informacji o pokoju
app.get('/getroom/:apiKey/:room_id', (req, res) => {
  const apiKey = req.params.apiKey;
  const room_id = req.params.room_id;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT * FROM rooms WHERE id = "${room_id}"`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie miast
app.get('/getcities/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT DISTINCT city FROM hotels`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie kodów promocyjnych
app.get('/getpromocodes/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT code, value, quantity FROM promo_codes`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        res.json(results);
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie atrakcji które mają przypisany hotel o id=hotel_id
app.get('/getattractions/:apiKey/:hotel_id', (req, res) => {
  const apiKey = req.params.apiKey;
  const hotel_id = req.params.hotel_id;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT h.hotel_id, a.id, a.name, a.image, a.quantity, a.price, a.price_type FROM hotels h JOIN hotel_attraction_mapping ham ON h.id = ham.hotel_id JOIN attractions a ON ham.attraction_id = a.id WHERE h.hotel_id = "${hotel_id}"`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        if (results.length === 0) {
          res.status(403).send('invalid hotel id');
        }else{
          res.json(results);
        }
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

//pobieranie wszystkich rezerwacji
app.get('/getreservations/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!checkAPIKey(apiKey)) {
    const query = `SELECT * FROM reservations`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data from database' });
      } else {
        if (results.length === 0) {
          res.status(403).send('invalid hotel id');
        }else{
          res.json(results);
        }
      }
    });
  }else{
    res.status(403).send('invalid api key');
  }
});

app.post;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
