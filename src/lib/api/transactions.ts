import { Transaction } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getTransactionsClient(id: string) {
    const data = apiRequest<Transaction[]>(`/api/transactions?account_id=${id}`, {
        method: "GET",
    })

    return data;
}

export function addTransactionClient(transaction: Transaction) {
    const data = apiRequest<Transaction>(`/api/transactions`, {
        method: "POST",
        body: JSON.stringify(transaction),
    })

    return data;
}

export function deleteTransactionClient(id: string) {
    const data = apiRequest<Transaction>(`/api/transactions?transaction_id=${id}`, {
        method: "DELETE",
    })

    return data;
}

export function createPost({ transaction_id, content, user_id, goal_id }: { transaction_id: string | undefined; content: string, user_id: string, goal_id: string | undefined }) {
    return apiRequest(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ transaction_id, content, user_id, goal_id }),
    });
}