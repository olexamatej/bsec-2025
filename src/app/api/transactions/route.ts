import { getTransactionsByUserId } from "~/server/queries/transactions";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("user_id");

    const transactions = await getTransactionsByUserId(id ?? '');

    return new Response(JSON.stringify(transactions), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}
