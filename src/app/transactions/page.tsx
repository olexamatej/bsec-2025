import { getTransactionsByUserId } from "~/server/queries/transactions";
import { TransactionList } from "./_components/transaction_list";
import { AddTransactionDialog } from "./_components/add-transaction-dialog";
import { getTags } from "~/server/queries/tags";


export default async function TransactionsPage() {
  const transactions = await getTransactionsByUserId(
    "c3b9cd23-1298-41a1-889c-8f7639aff150",
  );
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
