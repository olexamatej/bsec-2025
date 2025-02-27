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
import { Trash2, Search, ArrowUpDown, Share } from "lucide-react";
import { TransactionWithDeps } from "~/server/queries/transactions";
import { useIsMounted } from "~/lib/use-is-mounted";
import { deleteTransactionClient, createPost } from "~/lib/api/transactions";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "~/components/ui/dialog";
import { getUserId } from "~/lib/get-user-id";
import { useUserId } from "~/app/_components/user-provider";
import { useRouter } from "next/navigation";

export function TransactionList(data: { transactions: TransactionWithDeps[] }) {
  const userId = useUserId();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const isMounted = useIsMounted();
  const router = useRouter();

  // Filter transactions based on search term and type
  const filteredTransactions = data.transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleShareClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handlePostCreation = async () => {
    if (selectedTransactionId && message) {
      // Call API to create a post
      await createPost({
        user_id: userId,
        transaction_id: selectedTransactionId,
        content: message,
        goal_id: undefined,
      });
      setIsModalOpen(false);
      setMessage("");
      // Navigate to /feed
      router.push("/feed");
    }
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

                <Badge
                  variant={
                    transaction.transaction_type === "incoming"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {transaction.tag?.name ?? "No tag"}
                </Badge>

                <div
                  className={`text-right ${transaction.transaction_type === "incoming" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.transaction_type === "incoming" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isMounted
                      ? transaction.timestamp.toLocaleDateString()
                      : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTransactionClient(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShareClick(transaction.id)}
                  >
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share your transaction</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={handlePostCreation}>Share</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
