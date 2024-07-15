// services/users.service.ts

import { db } from "../drizzle/db";
import { usersTable, UserSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const usersService = async (limit?: number) => {
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit,
            with: {
                bookings: true,
                customer_support_tickets: true,
            },
        });
    }
    return await db.query.usersTable.findMany(
        {
            with: {
                bookings: true,
                customer_support_tickets: true,
            },
        },
    );
};

export const getUserService = async (id: number) => {
    return await db.query.usersTable.findFirst({
        with: {
            bookings: true,
            customer_support_tickets: true,
        },
        where: eq(usersTable.id, id),
    });
};

export const createUser = async (user: UserSelect) => {
    await db.insert(usersTable).values(user);
    return 'User created successfully';
};

export const updateUser = async (id: number, user: UserSelect) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id));
    return 'User updated successfully';
};

export const deleteOneUser = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return 'User deleted successfully';
};
