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
import { addGoalClient, addGoalCheckpointClient } from "~/lib/api/goals";
import { time_intervals } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function AddGoalDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [intervalAmount, setIntervalAmount] = useState("");
  const [selectedInterval, setSelectedInterval] = useState(
    time_intervals[0]?.value.toString() ?? "",
  );
  const [periodCount, setPeriodCount] = useState("1");
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

      console.log(response);

      await addGoalCheckpointClient(
        response.id,
        parseFloat(intervalAmount),
        parseInt(selectedInterval),
        new Date(),
      );

      // Reset form and close dialog
      setAmount("");
      setGoalName("");
      setTarget("");
      setTargetDate("");
      setIntervalAmount("");
      setPeriodCount("1");
      setSelectedInterval(time_intervals[0]?.value.toString() ?? "");
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
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
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
            <div className="flex-1 space-y-2">
              <label
                htmlFor="target"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Target amount
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

          <div className="space-y-2">
            <a className="text-sm font-medium">Up for a challenge? 🏆</a>
            <p className="text-sm text-muted-foreground">
              Add how much and how often you want to save to reach your goal
            </p>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="intervalAmount"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Save Amount
                </label>
                <Input
                  id="intervalAmount"
                  type="number"
                  step="0.01"
                  placeholder="Enter amount to save"
                  value={intervalAmount}
                  onChange={(e) => setIntervalAmount(e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="periodCount"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Every
                </label>
                <div className="flex gap-2">
                  <Input
                    id="periodCount"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={periodCount}
                    onChange={(e) => setPeriodCount(e.target.value)}
                    className="w-20"
                  />
                  <Select
                    value={selectedInterval}
                    onValueChange={setSelectedInterval}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {time_intervals.map((interval) => (
                        <SelectItem
                          key={interval.value}
                          value={interval.value.toString()}
                        >
                          {interval.name}s
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
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
