import { User, Transaction } from "~/server/db/schema";
import { apiRequest } from "./api_client";

export function getUserClient(id: string) {
    const data = apiRequest<User>(`/api/users?user_id=${id}`, {
        method: "GET",
    })

    return data;
}