"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRelation = exports.locationRelation = exports.customerSupportTicketRelation = exports.paymentRelation = exports.bookingRelation = exports.vehicleRelation = exports.vehicleSpecsRelation = exports.authRelation = exports.userRelation = exports.fleetManagementTable = exports.locationsTable = exports.customerSupportTicketsTable = exports.paymentsTable = exports.bookingsTable = exports.vehiclesTable = exports.vehicleSpecsTable = exports.authTable = exports.usersTable = exports.statusEnum = exports.paymentMethodEnum = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.availabilityEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user"]);
exports.availabilityEnum = (0, pg_core_1.pgEnum)("availability", ["available", "booked"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", ["pending", "approved", "rejected"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", ["pending", "paid"]);
exports.paymentMethodEnum = (0, pg_core_1.pgEnum)("payment_method", ["credit_card", "debit_card", "paypal"]);
exports.statusEnum = (0, pg_core_1.pgEnum)("status", ["open", "closed", "active", "inactive"]);
//users table
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 20 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).notNull().unique(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 100 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//authentications table
exports.authTable = (0, pg_core_1.pgTable)("auth", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.id, { onDelete: 'cascade' }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 100 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//vehicle specifications table
exports.vehicleSpecsTable = (0, pg_core_1.pgTable)("vehicle_specs", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 100 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 100 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuel_type: (0, pg_core_1.varchar)("fuel_type", { length: 100 }).notNull(),
    engine_capacity: (0, pg_core_1.integer)("engine_capacity").notNull(),
    transmission: (0, pg_core_1.varchar)("transmission", { length: 100 }).notNull(),
    seating_capacity: (0, pg_core_1.integer)("seating_capacity").notNull(),
    color: (0, pg_core_1.varchar)("color", { length: 100 }).notNull(),
    features: (0, pg_core_1.text)("features").notNull(),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//vehicle table
exports.vehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    vehicle_spec_id: (0, pg_core_1.integer)("vehicle_spec_id").references(() => exports.vehicleSpecsTable.id, { onDelete: 'cascade' }).notNull(),
    availability: (0, exports.availabilityEnum)("availability").default("available"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//bookings table
exports.bookingsTable = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.id, { onDelete: 'cascade' }).notNull(),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").references(() => exports.vehiclesTable.id, { onDelete: 'cascade' }).notNull(),
    location_id: (0, pg_core_1.integer)("location_id").references(() => exports.locationsTable.id, { onDelete: 'cascade' }).notNull(),
    booking_date: (0, pg_core_1.date)("booking_date").notNull(),
    return_date: (0, pg_core_1.date)("return_date").notNull(),
    total_amount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }).notNull(),
    booking_status: (0, exports.bookingStatusEnum)("booking_status").default("pending"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//payments table
exports.paymentsTable = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    booking_id: (0, pg_core_1.integer)("booking_id").references(() => exports.bookingsTable.id, { onDelete: 'cascade' }).notNull(),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }).notNull(),
    payment_status: (0, exports.paymentStatusEnum)("payment_status").default("pending"),
    payment_date: (0, pg_core_1.date)("payment_date").notNull(),
    payment_method: (0, exports.paymentMethodEnum)("payment_method").default("credit_card"),
    transaction_id: (0, pg_core_1.varchar)("transaction_id", { length: 100 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//customer support tickets table
exports.customerSupportTicketsTable = (0, pg_core_1.pgTable)("customer_support_tickets", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.id, { onDelete: 'cascade' }).notNull(),
    subject: (0, pg_core_1.varchar)("subject", { length: 100 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, exports.statusEnum)("status").default("open"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//locations table
exports.locationsTable = (0, pg_core_1.pgTable)("locations", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 100 }).notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }).notNull(),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//fleet management table
exports.fleetManagementTable = (0, pg_core_1.pgTable)("fleet_management", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    vehicle_id: (0, pg_core_1.integer)("vehicle_id").references(() => exports.vehiclesTable.id, { onDelete: 'cascade' }).notNull(),
    acquisition_date: (0, pg_core_1.date)("acquisition_date").notNull(),
    depreciation_rate: (0, pg_core_1.decimal)("depreciation_rate", { precision: 10, scale: 2 }).notNull(),
    current_value: (0, pg_core_1.decimal)("current_value", { precision: 10, scale: 2 }).notNull(),
    maintenance_cost: (0, pg_core_1.decimal)("maintenance_cost", { precision: 10, scale: 2 }).notNull(),
    status: (0, exports.statusEnum)("status").default("active"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default("now()"),
    updated_at: (0, pg_core_1.date)("updated_at").notNull().default("now()")
});
//relations
exports.userRelation = (0, drizzle_orm_1.relations)(exports.usersTable, ({ many, one }) => ({
    auth: one(exports.authTable),
    bookings: many(exports.bookingsTable),
    customer_support_tickets: many(exports.customerSupportTicketsTable)
}));
exports.authRelation = (0, drizzle_orm_1.relations)(exports.authTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.authTable.user_id],
        references: [exports.usersTable.id]
    })
}));
exports.vehicleSpecsRelation = (0, drizzle_orm_1.relations)(exports.vehicleSpecsTable, ({ one }) => ({
    vehicles: one(exports.vehiclesTable)
}));
exports.vehicleRelation = (0, drizzle_orm_1.relations)(exports.vehiclesTable, ({ one, many }) => ({
    bookings: many(exports.bookingsTable),
    vehicle_specs: one(exports.vehicleSpecsTable, {
        fields: [exports.vehiclesTable.vehicle_spec_id],
        references: [exports.vehicleSpecsTable.id]
    }),
    fleet_management: many(exports.fleetManagementTable)
}));
exports.bookingRelation = (0, drizzle_orm_1.relations)(exports.bookingsTable, ({ one, many }) => ({
    user: one(exports.usersTable, {
        fields: [exports.bookingsTable.user_id],
        references: [exports.usersTable.id]
    }),
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.bookingsTable.vehicle_id],
        references: [exports.vehiclesTable.id]
    }),
    location: one(exports.locationsTable, {
        fields: [exports.bookingsTable.location_id],
        references: [exports.locationsTable.id]
    }),
    payments: many(exports.paymentsTable)
}));
exports.paymentRelation = (0, drizzle_orm_1.relations)(exports.paymentsTable, ({ one }) => ({
    booking: one(exports.bookingsTable, {
        fields: [exports.paymentsTable.booking_id],
        references: [exports.bookingsTable.id]
    })
}));
exports.customerSupportTicketRelation = (0, drizzle_orm_1.relations)(exports.customerSupportTicketsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.customerSupportTicketsTable.user_id],
        references: [exports.usersTable.id]
    })
}));
exports.locationRelation = (0, drizzle_orm_1.relations)(exports.locationsTable, ({ many }) => ({
    bookings: many(exports.bookingsTable)
}));
exports.fleetManagementRelation = (0, drizzle_orm_1.relations)(exports.fleetManagementTable, ({ one }) => ({
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.fleetManagementTable.vehicle_id],
        references: [exports.vehiclesTable.id]
    })
}));
