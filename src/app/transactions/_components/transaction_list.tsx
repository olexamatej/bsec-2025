"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Trash2, Search, ArrowUpDown } from "lucide-react";
import { Transaction } from "~/server/db/schema";
import { useIsMounted } from "~/lib/utils";

export function TransactionList(transactions: { transactions: Transaction[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const isMounted = useIsMounted();

  // Filter transactions based on search term and type
  const filteredTransactions = transactions.transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    },
  );

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as any)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={toggleSortOrder}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {sortedTransactions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b pb-2 font-medium">
              <div>Description</div>
              <div>Category</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Date</div>
            </div>

            {sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 rounded-lg border p-3"
              >
                <div className="font-medium">{transaction.description}</div>

                <div className={"text-right text-green-600"}>
                  {"+"}${transaction.amount.toFixed(2)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isMounted
                      ? transaction.createdAt.toLocaleDateString()
                      : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={
                      // () => deleteTransaction(transaction.id)
                      () => {}
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
