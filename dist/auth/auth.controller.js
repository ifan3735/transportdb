"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const bcrypt = __importStar(require("bcrypt"));
const auth_service_1 = require("./auth.service");
const jwt_1 = require("hono/jwt");
// login
const loginController = async (c) => {
    const userDetails = await c.req.json();
    const userExist = await (0, auth_service_1.userExists)(userDetails.email);
    if (!userExist) {
        return c.json({ "error": "User not found" }, 401);
    }
    const passwordMatch = await bcrypt.compare(userDetails.password, userExist.auth?.password);
    if (!passwordMatch) {
        return c.json({ "error": "Invalid credentials" }, 401);
    }
    console.log(userExist);
    const payload = {
        user_id: userExist.id,
        role: userExist.role,
        email: userExist.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 180)
    };
    const secret = process.env.JWT_SECRET;
    const token = await (0, jwt_1.sign)(payload, secret);
    console.log(token);
    // login return obct
    const returnData = {
        id: userExist.id,
        name: userExist.name,
        email: userExist?.email,
        role: userExist.role,
        contact_phone: userExist.contact_phone,
        token: token,
    };
    console.log(returnData);
    return c.json(returnData);
};
exports.loginController = loginController;
// register
const registerController = async (c) => {
    try {
        const newUser = await c.req.json();
        // check if user is already registered
        const userExist = await (0, auth_service_1.userExists)(newUser.email);
        if (userExist) {
            return c.json({ "error": "Email already exists" }, 400);
        }
        // hash the password.
        const password = newUser.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // delete the old password and store user details
        delete newUser.password;
        const userId = await (0, auth_service_1.registerUser)(newUser);
        if (!userId) {
            return c.json({ "error": "User registration failed" }, 400);
        }
        const storedPass = await (0, auth_service_1.storePassword)(hashedPassword.toString(), Number(userId[0]['id']));
        console.log(storedPass);
        if (storedPass) {
            return c.json({ 'username': newUser.name });
        }
        else {
            return c.json({ "error": "Password storing failed" }, 400);
        }
    }
    catch (error) {
        return c.json({ 'error': error?.message });
    }
};
exports.registerController = registerController;
