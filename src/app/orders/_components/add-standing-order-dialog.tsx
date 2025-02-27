"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Plus } from "lucide-react";
import { addStandingOrderClient } from "~/lib/api/standing-orders";
import { Tag } from "~/server/db/schema";
import { Label } from "~/components/ui/label";

export function AddStandingOrderDialog({ tags }: { tags: Tag[] }) {
  const [amount, setAmount] = useState("");
  const [tagId, setTagId] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<"incoming" | "outgoing">(
    "incoming",
  );
  const [intervalAmount, setIntervalAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !intervalAmount || !startDate || !endDate || !description)
      return;

    try {
      await addStandingOrderClient(
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("selectedUserId="))
          ?.split("=")[1] ?? "c3b9cd23-1298-41a1-889c-8f7639aff150",
        parseInt(amount),
        tagId,
        new Date(startDate),
        new Date(endDate),
        1, // daily interval
        parseInt(intervalAmount),
        orderType,
        description,
      );
      setOpen(false);
      // Optionally refresh the page or standing orders list
      window.location.reload();
    } catch (error) {
      console.error("Failed to add standing order:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Standing Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Standing Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (€)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={orderType}
              onValueChange={(v: "incoming" | "outgoing") => setOrderType(v)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Category</Label>
            <Select value={tagId || ""} onValueChange={setTagId}>
              <SelectTrigger id="tag">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Repeat every X days</Label>
            <Input
              id="interval"
              type="number"
              placeholder="Enter number of days"
              value={intervalAmount}
              onChange={(e) => setIntervalAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Standing Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
