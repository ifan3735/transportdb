import { db } from "../drizzle/db";
import { customerSupportTicketsTable, CustomerSupportTicketSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const customerSupportTicketsService = async (limit?: number) => {
    if (limit) {
        return await db.query.customerSupportTicketsTable.findMany({
            limit: limit,
        });
    }
    return await db.query.customerSupportTicketsTable.findMany();
};

export const getCustomerSupportTicketService = async (id: number) => {
    return await db.query.customerSupportTicketsTable.findFirst({
        where: eq(customerSupportTicketsTable.id, id),
    });
};

export const createCustomerSupportTicket = async (customerSupportTicket: CustomerSupportTicketSelect) => {
    await db.insert(customerSupportTicketsTable).values(customerSupportTicket);
    return 'Customer Support Ticket created successfully';
};

export const updateCustomerSupportTicket = async (id: number, customerSupportTicket: CustomerSupportTicketSelect) => {
    await db.update(customerSupportTicketsTable).set(customerSupportTicket).where(eq(customerSupportTicketsTable.id, id));
    return 'Customer Support Ticket updated successfully';
};

export const deleteOneCustomerSupportTicket = async (id: number) => {
    await db.delete(customerSupportTicketsTable).where(eq(customerSupportTicketsTable.id, id));
    return 'Customer Support Ticket deleted successfully';
};