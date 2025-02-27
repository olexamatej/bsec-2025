// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bsec-2025_${name}`);

export const accounts = createTable(
  "account",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    balance: integer("balance").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);

export type Account = typeof accounts.$inferSelect;
export type AccountInsert = typeof accounts.$inferInsert;

export const transactions = createTable(
  "transaction",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    accountId: integer("account_id").notNull().references(() => accounts.id),
    description: varchar("description", { length: 256 }).notNull().default(""),
    category: varchar("category", { length: 256 }).notNull().default(""),
    amount: integer("amount").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export type Transaction = typeof transactions.$inferSelect;
export type TransactionInsert = typeof transactions.$inferInsert;