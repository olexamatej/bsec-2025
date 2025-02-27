import { addGoal, deleteGoal, getGoalsByUserId } from "~/server/queries/goals";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("user_id");

    const goals = await getGoalsByUserId(id ?? "");

    return new Response(JSON.stringify(goals), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { user_id, name, description, amount, target, target_date } = body;

    console.log("Creating new goal with description:", description);
    try {
        const newGoal = await addGoal(user_id, name, description, amount, target, target_date ? new Date(target_date) : undefined);
        return new Response(JSON.stringify(newGoal[0]), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding goal:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add goal" }),
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
    const id = url.searchParams.get("goal_id");

    const goals = await deleteGoal(id ?? "");

    if (!goals) {
        return new Response(
            JSON.stringify({ error: "Failed to delete goal" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    return new Response(JSON.stringify("OK"), {
        headers: {
            "Content-Type": "application/json",
        },
    });
} 