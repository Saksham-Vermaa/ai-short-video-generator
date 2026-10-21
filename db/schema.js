import { pgTable, serial, varchar, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

// ---------- USERS TABLE ----------
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  imageUrl: text("image_url"),
  credits: integer("credits").notNull().default(5),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- VIDEOS TABLE ----------
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  topic: text("topic").notNull(),
  style: varchar("style", { length: 100 }),
  scenes: jsonb("scenes"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});