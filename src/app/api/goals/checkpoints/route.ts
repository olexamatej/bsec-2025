import { NextResponse } from "next/server";
import { addGoalCheckpoint } from "~/server/queries/goals";

export async function POST(req: Request) {
    const { goal_id, interval_amount, interval, interval_start } = await req.json();
    const checkpoint = await addGoalCheckpoint(goal_id, interval_amount, interval);
    return NextResponse.json(checkpoint);
}


