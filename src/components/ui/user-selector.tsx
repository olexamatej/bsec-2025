"use client";

import { type User } from "~/server/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface UserSelectorProps {
  users: User[];
  selectedUserId?: string;
}

export function UserSelector({ users, selectedUserId }: UserSelectorProps) {
  const handleUserChange = (userId: string) => {
    // Set cookie with 30 day expiry
    document.cookie = `selectedUserId=${userId};path=/;max-age=2592000;SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className="px-2 pt-4">
      <Select defaultValue={selectedUserId} onValueChange={handleUserChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.display_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
