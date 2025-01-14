import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"


export const category = p.pgTable("categories", {
    id: p.uuid("category_id").primaryKey().notNull(),
    name: p.text("category_name").notNull(),
});

export const meal = p.pgTable("meals", {
    id: p.uuid("meal_id").primaryKey().notNull(),
    categoryId: p.uuid("category_id").notNull().references(() => category.id),
    name: p.text("meal_name").notNull(),
    description: p.text("meal_description").notNull(),
    image: p.text("meal_image").notNull(),
    price: p.integer("meal_price").notNull(),
    time: p.text("meal_time").notNull(), // Consider enum or separate table for time
});

export const orders = p.pgTable("orders", {
    id: p.uuid("order_id").primaryKey().notNull(),
    userId: p.text("user_id").notNull(), // Clerk user ID
    mealId: p.uuid("meal_id").notNull().references(() => meal.id),
    status: p.text("status").notNull(),
    createdAt: p.timestamp("created_at").defaultNow().notNull(),
});


// Create category-meal relations
export const mealRelations = relations(meal, ({ one }) => ({
    category: one(category, { fields: [meal.categoryId], references: [category.id] }),
}));

// Example Zod schemas for validation
export const categorySchema = createInsertSchema(category);
export const mealSchema = createInsertSchema(meal);
export const orderSchema  = createInsertSchema(orders);
