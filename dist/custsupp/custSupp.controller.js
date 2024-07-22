"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicket = exports.updateOneCustomerSupportTicket = exports.createOneCustomerSupportTicket = exports.getCustomerSupportTicket = exports.listCustomerSupportTickets = void 0;
const custSupp_service_1 = require("./custSupp.service");
const listCustomerSupportTickets = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, custSupp_service_1.customerSupportTicketsService)(limit);
        if (data == null || data.length == 0) {
            return c.json('No customer support tickets found');
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: error?.message });
    }
};
exports.listCustomerSupportTickets = listCustomerSupportTickets;
const getCustomerSupportTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.json("Invalid ID", 400);
    const customerSupportTicket = await (0, custSupp_service_1.getCustomerSupportTicketService)(id);
    if (customerSupportTicket == undefined) {
        return c.json("Customer Support Ticket not found", 404);
    }
    return c.json(customerSupportTicket, 200);
};
exports.getCustomerSupportTicket = getCustomerSupportTicket;
const createOneCustomerSupportTicket = async (c) => {
    try {
        const customerSupportTicket = await c.req.json();
        await (0, custSupp_service_1.createCustomerSupportTicket)(customerSupportTicket);
        return c.json("Customer Support Ticket created successfully", 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOneCustomerSupportTicket = createOneCustomerSupportTicket;
const updateOneCustomerSupportTicket = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.json("Invalid ID", 400);
        const customerSupportTicket = await c.req.json();
        await (0, custSupp_service_1.updateCustomerSupportTicket)(id, customerSupportTicket);
        return c.json("Customer Support Ticket updated successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOneCustomerSupportTicket = updateOneCustomerSupportTicket;
const deleteCustomerSupportTicket = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.json("Invalid ID", 400);
        await (0, custSupp_service_1.deleteOneCustomerSupportTicket)(id);
        return c.json("Customer Support Ticket deleted successfully", 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCustomerSupportTicket = deleteCustomerSupportTicket;
