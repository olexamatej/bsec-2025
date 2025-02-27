import { getStandingOrdersByUserId } from "~/server/queries/standing-orders";
import { getTags } from "~/server/queries/tags";
import { StandingOrderList } from "./_components/standing-order-list";
import { AddStandingOrderDialog } from "./_components/add-standing-order-dialog";
import { getUserId } from "~/lib/get-user-id";

export default async function OrdersPage() {
  const userId = await getUserId();
  const standingOrders = await getStandingOrdersByUserId(userId);
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
