"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportTicketRouter = void 0;
const hono_1 = require("hono");
const custSupp_controller_1 = require("./custSupp.controller");
exports.customerSupportTicketRouter = new hono_1.Hono();
//get all customer support tickets      api/customerSupportTickets
exports.customerSupportTicketRouter.get("/customerSupportTickets", custSupp_controller_1.listCustomerSupportTickets);
//get a single customer support ticket    api/customerSupportTickets/1
exports.customerSupportTicketRouter.get("/customerSupportTickets/:id", custSupp_controller_1.getCustomerSupportTicket);
exports.customerSupportTicketRouter.post("/customerSupportTickets", custSupp_controller_1.createOneCustomerSupportTicket);
exports.customerSupportTicketRouter.put("/customerSupportTickets/:id", custSupp_controller_1.updateOneCustomerSupportTicket);
exports.customerSupportTicketRouter.delete("/customerSupportTickets/:id", custSupp_controller_1.deleteCustomerSupportTicket);
