"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRoleAuth = exports.driverRoleAuth = exports.bothMiddleware = exports.userRoleAuth = exports.adminRoleAuth = exports.bothRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
// declare module "hono" {
//     interface HonoRequest {
//         user?: any;
//     }
// }
//AUTHENTICATION MIDDLEWARE
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//AUTHORIZATION MIDDLEWARE
const authMiddleware = async (c, next, requiredRole) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "Token not provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decoded)
        return c.json({ error: "Invalid token" }, 401);
    if (decoded.role !== requiredRole)
        return c.json({ error: "Unauthorized" }, 401);
    // if (requiredRole === "both") {
    //     if (decoded.role === "user" || decoded.role === "admin") {
    //         c.req.user = decoded;
    //         await next();
    //     }
    // }
    return next();
};
exports.authMiddleware = authMiddleware;
const bothRoleAuth = async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "Token not provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decoded)
        return c.json({ error: "Invalid token" }, 401);
    return next();
};
exports.bothRoleAuth = bothRoleAuth;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
const bothMiddleware = async (c, next) => await (0, exports.bothRoleAuth)(c, next);
exports.bothMiddleware = bothMiddleware;
const driverRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "driver");
exports.driverRoleAuth = driverRoleAuth;
const restaurantRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "restaurant");
exports.restaurantRoleAuth = restaurantRoleAuth;
