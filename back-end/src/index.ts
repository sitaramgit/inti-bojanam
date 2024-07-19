import express from 'express';

import connection from './config/db.config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import auth from './controller/auth';



const app = express();
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use('/auth', auth)

app.get('/', (req, res) => {
    // res.json({ message: 'Welcome to my Node.js project with Express.js and MySQL' });
    connection.query('SELECT * FROM posts;', function (error, results, fields) {
      if (error) console.log('there was an error', error);
      // connected, query complete, no errors
      console.log('the results object is:', results);
    })
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        res.send(results);
      });
})

app.listen(3000, () => {
  
    console.log('The application is listeninsg fon port 3000!');
})