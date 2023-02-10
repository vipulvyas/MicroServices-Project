import { createConnection } from 'mysql2';
require('dotenv').config()


export const connection = createConnection({
    host: process.env.SQL_DB_HOST,
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
    } else {
        console.log('Connected to database');
    }
});