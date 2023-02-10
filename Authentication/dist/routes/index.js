"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = exports.register = void 0;
var registration_1 = require("./registration");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return registration_1.register; } });
var login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.login; } });
var token_validation_1 = require("./token-validation");
Object.defineProperty(exports, "validateToken", { enumerable: true, get: function () { return token_validation_1.validateToken; } });
