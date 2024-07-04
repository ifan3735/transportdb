import { Context } from "hono"
import { customerSupportTicketsService, getCustomerSupportTicketService, createCustomerSupportTicket, updateCustomerSupportTicket, deleteOneCustomerSupportTicket } from "./custSupp.service"

export const listCustomerSupportTickets = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit')) 

        const data = await customerSupportTicketsService(limit);
        if (data == null || data.length == 0) {
            return c.text('No customer support tickets found');
        }
        return c.json(data);
    }   catch (error: any) {
        return c.json ({error: error?.message})
    }
}

export const getCustomerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const customerSupportTicket = await getCustomerSupportTicketService(id);
    if (customerSupportTicket == undefined) {
        return c.text("Customer Support Ticket not found", 404);
    }
    return c.json(customerSupportTicket, 200);
}

export const createOneCustomerSupportTicket = async (c: Context) => {
    try {
        const customerSupportTicket = await c.req.json();
        await createCustomerSupportTicket(customerSupportTicket);
        return c.text("Customer Support Ticket created successfully", 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOneCustomerSupportTicket = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const customerSupportTicket = await c.req.json();
        await updateCustomerSupportTicket(id, customerSupportTicket);
        return c.text("Customer Support Ticket updated successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCustomerSupportTicket = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        await deleteOneCustomerSupportTicket(id);
        return c.text("Customer Support Ticket deleted successfully", 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}