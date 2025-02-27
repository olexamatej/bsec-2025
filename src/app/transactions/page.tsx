import { getTransactionsByUserId } from "~/server/queries/transactions";
import { TransactionList } from "./_components/transaction_list";

export default async function TransactionsPage() {
  const transactions = await getTransactionsByUserId("");

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">All Transactions</h1>
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}
