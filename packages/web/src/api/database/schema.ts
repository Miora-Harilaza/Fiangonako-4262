import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export * from "./auth-schema";
export const events = sqliteTable("church_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  demo: integer("demo", { mode: "boolean" }).notNull().default(false),
});
export const members = sqliteTable("church_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  group: text("group_name").notNull().default(""),
});
export const administrators = sqliteTable("church_administrators", {
  userId: text("user_id").primaryKey(),
});
