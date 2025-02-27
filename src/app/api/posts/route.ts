import { createPostWithGoal, createPostWithTransaction } from "~/server/queries/posts";

export async function POST(request: Request) {
    const body = await request.json();
    const { user_id, transaction_id, goal_id, content } =
        body;

    try {
        if (transaction_id !== undefined) {
            await createPostWithTransaction(
                user_id,
                content,
                transaction_id,
            );
            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            await createPostWithGoal(
                user_id,
                content,
                goal_id,
            );
            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (error) {
        console.error("Error adding transaction:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add transaction" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }
}
