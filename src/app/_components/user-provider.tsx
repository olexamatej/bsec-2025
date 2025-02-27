"use client";

import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext<{
  userId: string;
}>({ userId: "" });

interface UserProvider {
  children: React.ReactNode;
  initialUserId: string;
}
export function UserProvider({ initialUserId, children }: UserProvider) {
  const [userId] = useState(initialUserId);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({
          userId,
        }),
        [userId],
      )}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }

  return context.userId;
}
