"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const login = (req, res) => {
    try {
        const { email, password } = req.body;
        db_connection_1.connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
            if (error) {
                return res.status(500).send({ error });
            }
            if (!results.length) {
                return res.status(400).send({ message: 'Invalid credentials' });
            }
            console.log(process.env.JWT_SECRET);
            const token = jsonwebtoken_1.default.sign({ id: results[0].id, email: results[0].email }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            db_connection_1.connection.query('INSERT INTO `user-token` (`token`, `user-id`) VALUES (?, ?)', [token, results[0].id]);
            return res.send({ message: 'Login successful', user: results[0], token });
        });
    }
    catch (error) {
        return res.status(500).send({ message: 'Something is wrong' });
    }
};
exports.login = login;
const validateToken = (req, res) => {
    try {
        const { token } = req.body;
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.send({ message: 'Success' });
    }
    catch (error) {
        return res.status(400).send({ message: 'Failed' });
    }
};
exports.validateToken = validateToken;
