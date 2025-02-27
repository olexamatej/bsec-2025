import { getTransactionsByUserId } from "~/server/queries/transactions";
import { getStandingOrdersByUserId } from "~/server/queries/standing-orders";
import { getTags } from "~/server/queries/tags";
import { TransactionList } from "~/app/transactions/_components/transaction_list";
import { StandingOrderList } from "./_components/standing-order-list";
import { AddStandingOrderDialog } from "./_components/add-standing-order-dialog";
import { cookies } from "next/headers";

export default async function OrdersPage() {
  const cookieList = await cookies();
  const userId = cookieList.get("selectedUserId")?.value;
  const standingOrders = await getStandingOrdersByUserId(
    userId ?? "c3b9cd23-1298-41a1-889c-8f7639aff150",
  );
  const tags = await getTags();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Transactions</h1>
        </div>
        <div className="space-y-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Standing Orders</h2>
              <AddStandingOrderDialog tags={tags} />
            </div>
            <StandingOrderList standingOrders={standingOrders} />
          </div>
        </div>
      </main>
    </div>
  );
}
