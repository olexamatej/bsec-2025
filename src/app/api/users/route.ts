import { getUserById } from "~/server/queries/user";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("user_id");

    const transactions = await getUserById(id ?? '');

    return new Response(JSON.stringify(transactions), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}
