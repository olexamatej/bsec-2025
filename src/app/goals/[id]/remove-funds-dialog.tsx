"use client";

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
import { Minus } from "lucide-react";
import { removeFundsHandler } from "./remove-funds-action";

export function RemoveFundsDialog({ goal_id }: { goal_id: string }) {
  const handler = removeFundsHandler.bind(null, goal_id);

  const mlemlemr = async (b: FormData) => {
    await handler(b);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button style={{ backgroundColor: "#e3595f" }}>
          <Minus className="mr-2 h-4 w-4" />
          Remove Funds
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Funds</DialogTitle>
          <DialogDescription>Remove funds from your goal</DialogDescription>
        </DialogHeader>
        <form action={mlemlemr} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              required
            />
          </div>
          <DialogFooter>
            <Button color="danger" type="submit">
              Remove Funds
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
