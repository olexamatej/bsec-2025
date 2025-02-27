import { User, Transaction } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getUserClient(id: string) {
    const data = apiRequest<User>(`/api/users?user_id=${id}`, {
        method: "GET",
    })

    return data;
}

export function getUsersClient() {
    const data = apiRequest<User[]>(`/api/users`, {
        method: "GET",
    })

    return data;
}