"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./routes/index");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post('/api/auth/register', index_1.register);
app.post('/api/auth/login', index_1.login);
app.post('/api/auth/validatetoken', index_1.validateToken);
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
