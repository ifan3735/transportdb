"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_controller_1 = require("./auth.controller");
const hono_1 = require("hono");
exports.authRouter = new hono_1.Hono();
exports.authRouter.post("/register", auth_controller_1.registerController); // register
exports.authRouter.post("/login", auth_controller_1.loginController); // login
