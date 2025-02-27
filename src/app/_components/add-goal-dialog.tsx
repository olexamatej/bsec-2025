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
import { addGoalClient } from "~/lib/api/goals";

export function AddGoalDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await addGoalClient({
        amount: parseFloat(amount),
        user_id:
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("selectedUserId="))
            ?.split("=")[1] ?? "c3b9cd23-1298-41a1-889c-8f7639aff150",
        name: goalName,
        target: parseFloat(target),
        target_date: targetDate ? new Date(targetDate) : undefined,
      });

      // Reset form and close dialog
      setAmount("");
      setGoalName("");
      setTarget("");
      setTargetDate("");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              htmlFor="goalName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Goal Name
            </label>
            <Input
              id="goalName"
              placeholder="Enter goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </div>
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
              htmlFor="target"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Target
            </label>
            <Input
              id="target"
              type="number"
              step="0.01"
              placeholder="Enter target amount"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="targetDate"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Target Date (Optional)
            </label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
