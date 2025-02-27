"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Plus } from "lucide-react";
import { addTransactionClient } from "~/lib/api/transactions";

export function AddGoalDialog() {
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addTransactionClient({
        amount: parseFloat(amount),
        timestamp: new Date(),
        user_id: "c3b9cd23-1298-41a1-889c-8f7639aff150",
        transaction_type: "outgoing",
        description: "Transakce",
        id: "",
        tag_id: null,
      });

      // Reset form and close dialog
      setAmount("");
      setGoal("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
          <DialogDescription>Add a new goal to your account.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="goal"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Goal
            </label>
            <Input
              id="goal"
              placeholder="Enter goal ID"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
