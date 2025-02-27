import { addStandingOrder, deleteStandingOrder, getStandingOrdersByUserId } from "~/server/queries/standing-orders";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("user_id");

    const standingOrders = await getStandingOrdersByUserId(id ?? '');

    return new Response(JSON.stringify(standingOrders), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const {
        user_id,
        amount,
        tag_id,
        interval_start,
        interval_end,
        interval,
        interval_amount,
        order_type,
        description
    } = body;

    try {
        await addStandingOrder(
            user_id,
            amount,
            tag_id ?? null,
            new Date(interval_start),
            new Date(interval_end),
            interval,
            interval_amount,
            order_type,
            description
        );
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding standing order:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add standing order" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("standing_order_id");

    const result = await deleteStandingOrder(id ?? '');

    if (!result) {
        return new Response(JSON.stringify({ error: "Failed to delete standing order" }),
            {
                status: 500,
            }
        );
    }

    return new Response(JSON.stringify("OK"), {
        headers: {
            "Content-Type": "application/json",
        },
    });
} 