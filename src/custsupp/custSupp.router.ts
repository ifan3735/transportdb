import { Hono } from "hono";
import { listCustomerSupportTickets, getCustomerSupportTicket, createOneCustomerSupportTicket, updateOneCustomerSupportTicket, deleteCustomerSupportTicket } from "./custSupp.controller"

export const customerSupportTicketRouter = new Hono();

//get all customer support tickets      api/customerSupportTickets
customerSupportTicketRouter.get("/customerSupportTickets", listCustomerSupportTickets);

//get a single customer support ticket    api/customerSupportTickets/1
customerSupportTicketRouter.get("/customerSupportTickets/:id", getCustomerSupportTicket)

customerSupportTicketRouter.post("/customerSupportTickets", createOneCustomerSupportTicket)

customerSupportTicketRouter.put("/customerSupportTickets/:id", updateOneCustomerSupportTicket)

customerSupportTicketRouter.delete("/customerSupportTickets/:id", deleteCustomerSupportTicket)