"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = require("mysql2");
require('dotenv').config();
exports.connection = mysql2_1.createConnection({
    host: process.env.SQL_DB_HOST,
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE
});
exports.connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
    }
    else {
        console.log('Connected to database');
    }
});
