"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
exports.userRouter = new hono_1.Hono();
//get all users      api/users
exports.userRouter.get("/users", users_controller_1.listUsers);
//get a single user    api/users/1
exports.userRouter.get("/users/:id", users_controller_1.getUser);
exports.userRouter.post("/users", users_controller_1.createOneUser);
exports.userRouter.put("/users/:id", users_controller_1.updateOneUser);
exports.userRouter.delete("/users/:id", users_controller_1.deleteUser);
