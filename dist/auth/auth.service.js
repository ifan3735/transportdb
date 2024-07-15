"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExists = exports.storePassword = exports.registerUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// register
const registerUser = async (user) => {
    try {
        return await db_1.db.insert(schema_1.usersTable).values(user).returning({ id: schema_1.usersTable.id }).execute();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.registerUser = registerUser;
// login
const storePassword = async (passwrod, id) => {
    try {
        await db_1.db.insert(schema_1.authTable).values({ password: passwrod, user_id: id });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.storePassword = storePassword;
// userExists
const userExists = async (email) => {
    return await db_1.db.query.usersTable.findFirst({
        where: ((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email)),
        with: {
            auth: {
                columns: { password: true }
            }
        }
    });
};
exports.userExists = userExists;
