// src/config/db.config.ts
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  connectTimeout: 2000, // Increase the connection timeout
  debug: true, // Enable debug information
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err, err.stack);
      return;
    }
    console.log('Connected to the database.');
  });

export default connection;
