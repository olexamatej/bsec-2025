"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type React from "react";

const queryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  queryCache: new QueryCache(),
};

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return new QueryClient(queryClientConfig);
  }

  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = new QueryClient(queryClientConfig);
  }

  return clientQueryClientSingleton;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
