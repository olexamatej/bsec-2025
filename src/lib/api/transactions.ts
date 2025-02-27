import { Transaction } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getTransactionsClient(id: number) {
    const data = apiRequest<Transaction[]>(`/api/transactions?account_id=${id}`, {
        method: "GET",
    })

    return data;
}