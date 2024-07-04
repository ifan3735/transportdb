import { z } from 'zod';

// Define user role type
const UserRole = z.enum(['admin', 'user']);

// Define the registration schema
export const registerUserSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    role: UserRole, // Ensure the role is either 'admin' or 'user'
    contact_phone: z.string().optional(), // Optional phone number
    email: z.string().email("Invalid email address").optional(), // Optional email
    address: z.string().min(1, "Address is required"),
});

// Define the login schema
export const loginUserSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
