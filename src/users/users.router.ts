
import { Hono } from "hono";
import { listUsers, getUser, createOneUser, updateOneUser, deleteUser} from "./users.controller"
export const userRouter = new Hono();
import { userRoleAuth, adminRoleAuth, bothRoleAuth} from "../middleware/auth";

//get all users      api/users
userRouter.get("/users", listUsers);


//get a single user    api/users/1
userRouter.get("/users/:id",  getUser)

userRouter.post("/users", createOneUser)

userRouter.put("/users/:id",  updateOneUser)

userRouter.delete("/users/:id",  deleteUser)