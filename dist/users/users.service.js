"use strict";
// services/users.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.updateUser = exports.createUser = exports.getUserService = exports.usersService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const usersService = async (limit) => {
    if (limit) {
        return await db_1.db.query.usersTable.findMany({
            limit: limit,
        });
    }
    return await db_1.db.query.usersTable.findMany();
};
exports.usersService = usersService;
const getUserService = async (id) => {
    return await db_1.db.query.usersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.usersTable.id, id),
    });
};
exports.getUserService = getUserService;
const createUser = async (user) => {
    await db_1.db.insert(schema_1.usersTable).values(user);
    return 'User created successfully';
};
exports.createUser = createUser;
const updateUser = async (id, user) => {
    await db_1.db.update(schema_1.usersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return 'User updated successfully';
};
exports.updateUser = updateUser;
const deleteOneUser = async (id) => {
    await db_1.db.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return 'User deleted successfully';
};
exports.deleteOneUser = deleteOneUser;
