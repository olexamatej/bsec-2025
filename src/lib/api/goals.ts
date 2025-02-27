import type { goals } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getGoalsClient(id: string) {
    const data = apiRequest<typeof goals.$inferSelect[]>(`/api/goals?user_id=${id}`, {
        method: "GET",
    });

    return data;
}

export async function addGoalClient(goal: {
    user_id: string;
    name: string;
    description: string;
    amount: number;
    target: number;
    target_date?: Date;
}) {
    const data = await apiRequest<typeof goals.$inferSelect>(`/api/goals`, {
        method: "POST",
        body: JSON.stringify(goal),
    });

    return data;
}

export function deleteGoalClient(id: string) {
    const data = apiRequest<typeof goals.$inferSelect>(`/api/goals?goal_id=${id}`, {
        method: "DELETE",
    });

    return data;
}

export function addGoalCheckpointClient(goal_id: string, interval_amount: number, interval: number, interval_start: Date) {
    const data = apiRequest<typeof goals.$inferSelect>(`/api/goals/checkpoints`, {
        method: "POST",
        body: JSON.stringify({ goal_id, interval_amount, interval, interval_start }),
    });

    return data;
}

