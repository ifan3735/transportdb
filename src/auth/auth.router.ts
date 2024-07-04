import { loginController, registerController } from "./auth.controller";
import { Hono } from "hono";

export const authRouter = new Hono();

authRouter.post("/register", registerController) // register

authRouter.post("/login", loginController) // login

