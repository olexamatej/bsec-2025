// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bsec-2025_${name}`);

export const users = createTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_name: text("user_name").notNull(),
  display_name: text("display_name").notNull(),
  avatar_url: text("avatar_url"),
});

export type User = typeof users.$inferSelect;

export const userRelations = relations(users, ({ many }) => ({
  comments: many(comments),
  goals: many(goals),
  standingOrders: many(standingOrders),
  transactions: many(transactions),
  tags: many(tags),
}));

export const comments = createTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),

  post_id: uuid("post_id")
    .notNull()
    .references(() => posts.id),

  parent_id: uuid("parent_id").references((): AnyPgColumn => comments.id),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  content: text("content").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parent_id],
    references: [comments.id],
  }),
  post: one(posts, {
    fields: [comments.post_id],
    references: [posts.id],
  }),
}));

export const goals = createTable("goals", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  target: integer("target").notNull(),
  description: text("description").notNull().default(""),
  target_date: timestamp("target_timestamp", {
    mode: "date",
    withTimezone: true,
  }),
});

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

export const goalRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.user_id],
    references: [users.id],
  }),
  checkpoints: many(goalCheckpoints),
}));

export const goalCheckpoints = createTable("goal_checkpoints", {
  id: uuid("id").primaryKey().defaultRandom(),

  goal_id: uuid("goal_id")
    .notNull()
    .references(() => goals.id),

  interval_start: timestamp("interval_start", {
    mode: "date",
    withTimezone: true,
  }).notNull().default(sql`NOW()`),
  interval: integer("interval").notNull(),
  interval_amount: integer("interval_amount").notNull(),
});

export const goalCheckpointRelations = relations(
  goalCheckpoints,
  ({ one }) => ({
    goal: one(goals, {
      fields: [goalCheckpoints.goal_id],
      references: [goals.id],
    }),
  }),
);

export const standingOrderType = pgEnum("standing_order_type", [
  "incoming",
  "outgoing",
]);

export const standingOrders = createTable("standing_orders", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  amount: integer("amount").notNull(),
  tag_id: uuid("tag_id").references(() => tags.id),
  interval_start: timestamp("interval_start", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  interval_end: timestamp("interval_end", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  interval: integer("interval").notNull(),
  interval_amount: integer("interval_amount").notNull(),
  description: text("description").notNull().default(""),
  order_type: standingOrderType("order_type").notNull(),
});

export const standingOrderRelations = relations(standingOrders, ({ one }) => ({
  user: one(users, {
    fields: [standingOrders.user_id],
    references: [users.id],
  }),
  tag: one(tags, {
    fields: [standingOrders.tag_id],
    references: [tags.id],
  }),
}));

export const transactions = createTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  amount: integer("amount").notNull(),
  tag_id: uuid("tag_id").references(() => tags.id),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  description: text("description").notNull().default(""),

  transaction_type: standingOrderType("transaction_type").notNull(),
});

export type Transaction = typeof transactions.$inferSelect;

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.user_id],
    references: [users.id],
  }),
  tag: one(tags, {
    fields: [transactions.tag_id],
    references: [tags.id],
  }),
}));

export const tags = createTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  color: varchar("color", { length: 6 }).notNull(),

  name: text("name").notNull(),
});

export type Tag = typeof tags.$inferSelect;

export const tagRelations = relations(tags, ({ many, one }) => ({
  user: one(users, {
    fields: [tags.user_id],
    references: [users.id],
  }),
  transactions: many(transactions),
  standingOrders: many(standingOrders),
}));

export const posts = createTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  goal_id: uuid("goal_id").references(() => goals.id),
  transaction_id: uuid("transaction_id").references(() => transactions.id, {
    onDelete: "cascade",
  }),

  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  goal: one(goals, {
    fields: [posts.goal_id],
    references: [goals.id],
  }),
  transaction: one(transactions, {
    fields: [posts.transaction_id],
    references: [transactions.id],
  }),
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
  comments: many(comments),
}));
