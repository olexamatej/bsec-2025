"use server";

import { addFundToGoal, removeFundFromGoal } from "~/server/queries/goalTransactions";

export async function removeFundsHandler(goal_id: string, formData: FormData) {
    const rawFormData = {
        amount: formData.get("amount"),
    };

    const parsedFormData = {
        amount: parseFloat(rawFormData.amount as string),
    };

    if (parsedFormData.amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    console.debug("Remove funds to goal", goal_id, parsedFormData.amount);

    try {
        await removeFundFromGoal(goal_id, parsedFormData.amount);
        console.debug("Funds removed successfully");
    } catch (error) {
        console.error("aaa", error);
    }
}