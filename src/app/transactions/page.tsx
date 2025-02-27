import { getTransactionsByUserId } from "~/server/queries/transactions";
import { TransactionList } from "./_components/transaction_list";
import { AddTransactionDialog } from "./_components/add-transaction-dialog";
import { getTags } from "~/server/queries/tags";
import { getUserId } from "~/lib/get-user-id";

export default async function TransactionsPage() {
  const userId = await getUserId();
  const transactions = await getTransactionsByUserId(userId);
  const tags = await getTags();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Transactions</h1>
          <AddTransactionDialog tags={tags} />
        </div>
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}
