import { pgTable, timestamp, integer, text, serial, decimal, boolean, varchar, date, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";
import { features } from 'process';
export const roleEnum = pgEnum("role", ["admin", "user"]);
export const availabilityEnum = pgEnum("availability", ["available", "booked"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "approved", "rejected"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid"]);
export const paymentMethodEnum = pgEnum("payment_method", ["credit_card", "debit_card", "paypal"]);
export const statusEnum = pgEnum("status", ["open", "closed", "active", "inactive"]);

//users table`
export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 20 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    contact_phone: varchar("contact_phone", { length: 20 }),
    address: varchar("address", { length: 100 }),
    role: roleEnum("role").default("user"),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type UserSelect = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;


//authentications table
export const authTable = pgTable("auth", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type AuthenticationSelect = typeof authTable.$inferSelect;

//vehicle specifications table
export const vehicleSpecsTable = pgTable("vehicle_specs", {
    id: serial("id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 100 }).notNull(),
    model: varchar("model", { length: 100 }).notNull(),
    year: integer("year").notNull(),
    fuel_type: varchar("fuel_type", { length: 100 }).notNull(),
    engine_capacity: integer("engine_capacity").notNull(),
    transmission: varchar("transmission", { length: 100 }).notNull(),
    seating_capacity: integer("seating_capacity").notNull(),
    color: varchar("color", { length: 100 }).notNull(),
    features: text("features").notNull(),
    owner_image: text("owner_image"),
    date: date("date").default("now()"),
    owner_name: varchar("owner_name", { length: 100 }),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type VehicleSpecsSelect = typeof vehicleSpecsTable.$inferSelect;

//vehicle table
export const vehiclesTable = pgTable("vehicles", {
    id: serial("id").primaryKey(),
    vehicle_spec_id: integer("vehicle_spec_id").references(() => vehicleSpecsTable.id, { onDelete: 'cascade' }).notNull(),
    rental_rate: decimal("rental_rate", { precision: 10, scale: 2 }),
    availability: availabilityEnum("availability").default("available"),
    image: text("image").default("https://via.placeholder.com/150"),
    image2: text("image2"),
    image3: text("image3"),
    image4: text("image4"),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type VehicleSelect = typeof vehiclesTable.$inferSelect;

//bookings table
export const bookingsTable = pgTable("bookings", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.id, { onDelete: 'cascade' }).notNull(),
    location_id: integer("location_id").references(() => locationsTable.id, { onDelete: 'cascade' }).notNull(),
    booking_date: date("booking_date").notNull().default("now()"),
    return_date: date("return_date").notNull().default("now()"),
    total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    booking_status: varchar("booking_status", {length: 100}).default("pending"),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type BookingSelect = typeof bookingsTable.$inferSelect;

//payments table
export const paymentsTable = pgTable("payments", {
    id: serial("id").primaryKey(),
    booking_id: integer("booking_id").references(() => bookingsTable.id, { onDelete: 'cascade' }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    payment_status: varchar("payment_status", { length: 100 }).default("pending"),
    payment_date: date("payment_date").notNull().default("now()"),
    payment_method: varchar("payment_method", { length: 100 }).default("credit_card"),
    transaction_id: varchar("transaction_id", { length: 100 }).notNull(),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type PaymentSelect = typeof paymentsTable.$inferSelect;

//customer support tickets table
export const customerSupportTicketsTable = pgTable("customer_support_tickets", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
    subject: varchar("subject", { length: 100 }).notNull(),
    description: text("description").notNull(),
    status: statusEnum("status").default("open"),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type CustomerSupportTicketSelect = typeof customerSupportTicketsTable.$inferSelect;

//locations table
export const locationsTable = pgTable("locations", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    address: varchar("address", { length: 100 }).notNull(),
    contact_phone: varchar("contact_phone", { length: 20 }).notNull(),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type LocationSelect = typeof locationsTable.$inferSelect;

//fleet management table
export const fleetManagementTable = pgTable("fleet_management", {
    id: serial("id").primaryKey(),
    vehicle_id: integer("vehicle_id").references(() => vehiclesTable.id, { onDelete: 'cascade' }).notNull(),
    acquisition_date: date("acquisition_date").notNull(),
    depreciation_rate: decimal("depreciation_rate", { precision: 10, scale: 2 }).notNull(),
    current_value: decimal("current_value", { precision: 10, scale: 2 }).notNull(),
    maintenance_cost: decimal("maintenance_cost", { precision: 10, scale: 2 }).notNull(),
   status: statusEnum("status").default("active"),
    created_at: date("created_at").notNull().default("now()"),
    updated_at: date("updated_at").notNull().default("now()")
});

export type FleetManagementSelect = typeof fleetManagementTable.$inferSelect;

//relations
export const userRelation = relations(usersTable, ({ many, one }) => ({
    auth: one(authTable),
    bookings: many(bookingsTable),
    customer_support_tickets: many(customerSupportTicketsTable)
}));

export const authRelation = relations(authTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [authTable.user_id],
        references: [usersTable.id]
    })
}));

export const vehicleSpecsRelation = relations(vehicleSpecsTable, ({ one }) => ({
    vehicles: one(vehiclesTable)
}));

export const vehicleRelation = relations(vehiclesTable, ({ one, many }) => ({
    bookings: many(bookingsTable),
    vehicle_specs: one(vehicleSpecsTable, {
        fields: [vehiclesTable.vehicle_spec_id],
        references: [vehicleSpecsTable.id]
    }),
    fleet_management: many(fleetManagementTable)
}));

export const bookingRelation = relations(bookingsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [bookingsTable.user_id],
        references: [usersTable.id]
    }),
    vehicle: one(vehiclesTable, {
        fields: [bookingsTable.vehicle_id],
        references: [vehiclesTable.id]
    
    }),
    location: one(locationsTable, {
        fields: [bookingsTable.location_id],
        references: [locationsTable.id]
    
    }),
    payments: many(paymentsTable)
}));

export const paymentRelation = relations(paymentsTable, ({ one }) => ({
    booking: one(bookingsTable, {
        fields: [paymentsTable.booking_id],
        references: [bookingsTable.id]
    })
}));

export const customerSupportTicketRelation = relations(customerSupportTicketsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [customerSupportTicketsTable.user_id],
        references: [usersTable.id]
    })
}));

export const locationRelation = relations(locationsTable, ({ many }) => ({
    bookings: many(bookingsTable)
}));

export const fleetManagementRelation = relations(fleetManagementTable, ({ one }) => ({
    vehicle: one(vehiclesTable, {
        fields: [fleetManagementTable.vehicle_id],
        references: [vehiclesTable.id]
    })
}));