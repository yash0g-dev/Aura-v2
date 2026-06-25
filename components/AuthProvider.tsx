"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { PageLoader } from "@/components/PageLoader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return <>{children}</>;
}
