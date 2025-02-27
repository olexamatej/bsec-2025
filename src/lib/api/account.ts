import { Account, Transaction } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getAccountClient(id: number) {
    const data = apiRequest<Account>(`/api/accounts?account_id=${id}`, {
        method: "GET",
    })

    return data;
}