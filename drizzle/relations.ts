import { relations } from "drizzle-orm/relations";
import { bsec2025Users, bsec2025Transactions, bsec2025Tags, bsec2025Goals, bsec2025GoalCheckpoints, bsec2025Posts, bsec2025StandingOrders, bsec2025Comments } from "./schema";

export const bsec2025TransactionsRelations = relations(bsec2025Transactions, ({one, many}) => ({
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025Transactions.userId],
		references: [bsec2025Users.id]
	}),
	bsec2025Tag: one(bsec2025Tags, {
		fields: [bsec2025Transactions.tagId],
		references: [bsec2025Tags.id]
	}),
	bsec2025Posts: many(bsec2025Posts),
}));

export const bsec2025UsersRelations = relations(bsec2025Users, ({many}) => ({
	bsec2025Transactions: many(bsec2025Transactions),
	bsec2025Tags: many(bsec2025Tags),
	bsec2025Posts: many(bsec2025Posts),
	bsec2025Goals: many(bsec2025Goals),
	bsec2025StandingOrders: many(bsec2025StandingOrders),
	bsec2025Comments: many(bsec2025Comments),
}));

export const bsec2025TagsRelations = relations(bsec2025Tags, ({one, many}) => ({
	bsec2025Transactions: many(bsec2025Transactions),
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025Tags.userId],
		references: [bsec2025Users.id]
	}),
	bsec2025StandingOrders: many(bsec2025StandingOrders),
}));

export const bsec2025GoalCheckpointsRelations = relations(bsec2025GoalCheckpoints, ({one}) => ({
	bsec2025Goal: one(bsec2025Goals, {
		fields: [bsec2025GoalCheckpoints.goalId],
		references: [bsec2025Goals.id]
	}),
}));

export const bsec2025GoalsRelations = relations(bsec2025Goals, ({one, many}) => ({
	bsec2025GoalCheckpoints: many(bsec2025GoalCheckpoints),
	bsec2025Posts: many(bsec2025Posts),
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025Goals.userId],
		references: [bsec2025Users.id]
	}),
}));

export const bsec2025PostsRelations = relations(bsec2025Posts, ({one, many}) => ({
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025Posts.userId],
		references: [bsec2025Users.id]
	}),
	bsec2025Goal: one(bsec2025Goals, {
		fields: [bsec2025Posts.goalId],
		references: [bsec2025Goals.id]
	}),
	bsec2025Transaction: one(bsec2025Transactions, {
		fields: [bsec2025Posts.transactionId],
		references: [bsec2025Transactions.id]
	}),
	bsec2025Comments: many(bsec2025Comments),
}));

export const bsec2025StandingOrdersRelations = relations(bsec2025StandingOrders, ({one}) => ({
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025StandingOrders.userId],
		references: [bsec2025Users.id]
	}),
	bsec2025Tag: one(bsec2025Tags, {
		fields: [bsec2025StandingOrders.tagId],
		references: [bsec2025Tags.id]
	}),
}));

export const bsec2025CommentsRelations = relations(bsec2025Comments, ({one, many}) => ({
	bsec2025Comment: one(bsec2025Comments, {
		fields: [bsec2025Comments.parentId],
		references: [bsec2025Comments.id],
		relationName: "bsec2025Comments_parentId_bsec2025Comments_id"
	}),
	bsec2025Comments: many(bsec2025Comments, {
		relationName: "bsec2025Comments_parentId_bsec2025Comments_id"
	}),
	bsec2025User: one(bsec2025Users, {
		fields: [bsec2025Comments.userId],
		references: [bsec2025Users.id]
	}),
	bsec2025Post: one(bsec2025Posts, {
		fields: [bsec2025Comments.postId],
		references: [bsec2025Posts.id]
	}),
}));