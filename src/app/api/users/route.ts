import { getUserById, getUsers } from "~/server/queries/user";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("user_id");

    if (!id) {
        const allUsers = await getUsers();

        return new Response(JSON.stringify(allUsers), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const users = await getUserById(id);

    return new Response(JSON.stringify(users), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}
