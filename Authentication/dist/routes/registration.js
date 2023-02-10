"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const db_connection_1 = require("../db-connection");
require('dotenv').config();
const register = (req, res) => {
    try {
        const { username, email, password } = req.body;
        db_connection_1.connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                return res.status(500).send({ error });
            }
            return res.send({ message: 'User registered successfully' });
        });
    }
    catch (error) {
        return res.status(500).send({ message: 'Something is wrong' });
    }
};
exports.register = register;
