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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Tag = {
  id: string;
  name: string;
  user_id: string;
};

export function AddTransactionDialog({ tags }: { tags: Tag[] }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("outgoing");
  const [selectedTagId, setSelectedTagId] = useState<string>("none");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addTransactionClient({
        amount: parseFloat(amount),
        timestamp: new Date(),
        user_id: "c3b9cd23-1298-41a1-889c-8f7639aff150",
        transaction_type: transactionType as "incoming" | "outgoing",
        description: description,
        id: "",
        tag_id: selectedTagId === "none" ? null : selectedTagId,
      });

      // Reset form and close dialog
      setAmount("");
      setDescription("");
      setTransactionType("outgoing");
      setSelectedTagId("none");
      // Refresh the page to show new transaction
      window.location.reload();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Transaction Type
            </label>
            <RadioGroup
              defaultValue="outgoing"
              value={transactionType}
              onValueChange={setTransactionType}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outgoing" id="outgoing" />
                <Label htmlFor="outgoing">Outgoing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incoming" id="incoming" />
                <Label htmlFor="incoming">Incoming</Label>
              </div>
            </RadioGroup>
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
              htmlFor="description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <Input
              id="description"
              step="0.01"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tag"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tag
            </label>
            <Select value={selectedTagId} onValueChange={setSelectedTagId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No tag</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
