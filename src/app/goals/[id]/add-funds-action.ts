"use server";

import { redirect } from "next/navigation";
import { addFundToGoal } from "~/server/queries/goalTransactions";

export async function addFundsHandler(goal_id: string, formData: FormData) {
    const rawFormData = {
        amount: formData.get("amount"),
    };

    const parsedFormData = {
        amount: parseFloat(rawFormData.amount as string),
    };

    if (parsedFormData.amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    console.debug("Adding funds to goal", goal_id, parsedFormData.amount);

    try {
        await addFundToGoal(goal_id, parsedFormData.amount);
        console.debug("Funds added successfully");
    } catch (error) {
        console.error("aaa", error);
    }
}