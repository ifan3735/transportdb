"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnePayment = exports.updatePayment = exports.createPayment = exports.getPaymentService = exports.paymentsService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const paymentsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.paymentsTable.findMany({
            with: {
                booking: true,
            },
            limit: limit,
        });
    }
    return await db_1.db.query.paymentsTable.findMany();
};
exports.paymentsService = paymentsService;
const getPaymentService = async (id) => {
    return await db_1.db.query.paymentsTable.findFirst({
        with: {
            booking: true,
        },
        where: (0, drizzle_orm_1.eq)(schema_1.paymentsTable.id, id),
    });
};
exports.getPaymentService = getPaymentService;
const createPayment = async (payment) => {
    await db_1.db.insert(schema_1.paymentsTable).values(payment);
    return 'Payment created successfully';
};
exports.createPayment = createPayment;
const updatePayment = async (id, payment) => {
    await db_1.db.update(schema_1.paymentsTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.id, id));
    return 'Payment updated successfully';
};
exports.updatePayment = updatePayment;
const deleteOnePayment = async (id) => {
    await db_1.db.delete(schema_1.paymentsTable).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.id, id));
    return 'Payment deleted successfully';
};
exports.deleteOnePayment = deleteOnePayment;
