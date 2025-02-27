import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
