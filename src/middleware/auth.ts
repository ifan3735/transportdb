import "dotenv/config";
import { verify } from "hono/jwt"
import { Context, Next, HonoRequest} from "hono";

// declare module "hono" {
//     interface HonoRequest {
//         user?: any;
//     }
// }

//AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null
    }
}

//AUTHORIZATION MIDDLEWARE
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({ error: "Token not provided" }, 401);

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: "Invalid token" }, 401);

    if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);

    // if (requiredRole === "both") {
    //     if (decoded.role === "user" || decoded.role === "admin") {
    //         c.req.user = decoded;
    //         await next();
    //     }
    // }
    return next();

   
}

export const bothRoleAuth = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization");
    if (!token) return c.json({ error: "Token not provided" }, 401);
    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
    if (!decoded) return c.json({ error: "Invalid token" }, 401);
    return next();
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin")
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user")
export const bothMiddleware = async (c: Context, next: Next) => await bothRoleAuth(c, next)
export const driverRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "driver")
export const restaurantRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "restaurant")