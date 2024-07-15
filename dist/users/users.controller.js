"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateOneUser = exports.createOneUser = exports.getUser = exports.listUsers = void 0;
const users_service_1 = require("./users.service");
const listUsers = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, users_service_1.usersService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No users found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listUsers = listUsers;
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, users_service_1.getUserService)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
const createOneUser = async (c) => {
    try {
        const user = await c.req.json();
        await (0, users_service_1.createUser)(user);
        return c.text("User created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneUser = createOneUser;
const updateOneUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const user = await c.req.json();
        await (0, users_service_1.updateUser)(id, user);
        return c.text("User updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneUser = updateOneUser;
const deleteUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const response = await (0, users_service_1.deleteOneUser)(id);
        return c.json({ msg: response }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
