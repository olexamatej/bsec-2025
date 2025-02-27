import {
  addTransaction,
  deleteTransaction,
  getTransactionsByUserId,
} from "~/server/queries/transactions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("user_id");

  const transactions = await getTransactionsByUserId(id ?? "");

  return new Response(JSON.stringify(transactions), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { user_id, amount, tag_id, timestamp, transaction_type, description } =
    body;

  try {
    await addTransaction(
      user_id,
      amount,
      tag_id ?? null,
      timestamp,
      description,
      transaction_type,
    );
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("transaction_id");

  const transactions = await deleteTransaction(id ?? "");

  if (!transactions) {
    return new Response(
      JSON.stringify({ error: "Failed to delete transaction" }),
      {
        status: 500,
      },
    );
  }

  return new Response(JSON.stringify("OK"), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
