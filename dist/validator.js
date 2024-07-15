"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
// Define user role type
const UserRole = zod_1.z.enum(['admin', 'user']);
// Define the registration schema
exports.registerUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Full name is required"),
    role: UserRole, // Ensure the role is either 'admin' or 'user'
    contact_phone: zod_1.z.string().optional(), // Optional phone number
    email: zod_1.z.string().email("Invalid email address").optional(), // Optional email
    address: zod_1.z.string().min(1, "Address is required"),
});
// Define the login schema
exports.loginUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Username must be at least 3 characters long"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
