"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneCustomerSupportTicket = exports.updateCustomerSupportTicket = exports.createCustomerSupportTicket = exports.getCustomerSupportTicketService = exports.customerSupportTicketsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const customerSupportTicketsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.customerSupportTicketsTable.findMany({
            limit: limit,
        });
    }
    return await db_1.db.query.customerSupportTicketsTable.findMany();
};
exports.customerSupportTicketsService = customerSupportTicketsService;
const getCustomerSupportTicketService = async (id) => {
    return await db_1.db.query.customerSupportTicketsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.id, id),
    });
};
exports.getCustomerSupportTicketService = getCustomerSupportTicketService;
const createCustomerSupportTicket = async (customerSupportTicket) => {
    await db_1.db.insert(schema_1.customerSupportTicketsTable).values(customerSupportTicket);
    return 'Customer Support Ticket created successfully';
};
exports.createCustomerSupportTicket = createCustomerSupportTicket;
const updateCustomerSupportTicket = async (id, customerSupportTicket) => {
    await db_1.db.update(schema_1.customerSupportTicketsTable).set(customerSupportTicket).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.id, id));
    return 'Customer Support Ticket updated successfully';
};
exports.updateCustomerSupportTicket = updateCustomerSupportTicket;
const deleteOneCustomerSupportTicket = async (id) => {
    await db_1.db.delete(schema_1.customerSupportTicketsTable).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketsTable.id, id));
    return 'Customer Support Ticket deleted successfully';
};
exports.deleteOneCustomerSupportTicket = deleteOneCustomerSupportTicket;
