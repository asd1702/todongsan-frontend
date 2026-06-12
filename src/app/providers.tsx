import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/shared/ui/sonner";
import { queryClient } from "./queryClient";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { configureHttpClientAuth } from "@/shared/api/httpClient";

// Initialize API client authentication callbacks
configureHttpClientAuth({
  getAccessToken: () => useAuthStore.getState().accessToken,
  clearAuth: () => useAuthStore.getState().logout(),
});

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
