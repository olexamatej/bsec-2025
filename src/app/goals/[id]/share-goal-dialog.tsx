"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Share } from "lucide-react";
import { addFundsHandler } from "./add-funds-action";
import { useState } from "react";
import { createPost } from "~/lib/api/transactions";
import { useUserId } from "~/app/_components/user-provider";
import router from "next/router";

export function ShareGoalDialog({ goal_id }: { goal_id: string }) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useUserId();

  const handlePostCreation = async () => {
    if (message) {
      // Call API to create a post
      await createPost({
        user_id: userId,
        goal_id: goal_id,
        content: message,
        transaction_id: undefined,
      });
      setIsModalOpen(false);
      setMessage("");
      router.push("/feed");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Share goal
        </Button>
      </DialogTrigger>
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
  );
}
