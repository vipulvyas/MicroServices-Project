"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
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
