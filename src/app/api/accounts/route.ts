import { getAccountById } from "~/server/queries/account";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("account_id");

    const transactions = await getAccountById(+(id || 1));

    return new Response(JSON.stringify(transactions), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}
