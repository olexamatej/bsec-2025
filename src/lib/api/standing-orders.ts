import { apiRequest } from "./api_client";
import { StandingOrderWithDeps } from "~/server/queries/standing-orders";

export function getStandingOrdersClient(id: string) {
    const data = apiRequest<StandingOrderWithDeps[]>(`/api/standing-orders?user_id=${id}`, {
        method: "GET",
    });
    return data;
}

export function deleteStandingOrderClient(id: string) {
    return apiRequest(`/api/standing-orders?standing_order_id=${id}`, {
        method: "DELETE",
    });
}

export function addStandingOrderClient(
    user_id: string,
    amount: number,
    tag_id: string | null,
    interval_start: Date,
    interval_end: Date,
    interval: number,
    interval_amount: number,
    order_type: "incoming" | "outgoing",
    description: string
) {
    return apiRequest("/api/standing-orders", {
        method: "POST",
        body: JSON.stringify({
            user_id,
            amount,
            tag_id,
            interval_start: interval_start.getTime(),
            interval_end: interval_end.getTime(),
            interval,
            interval_amount,
            order_type,
            description,
        }),
    });
} 