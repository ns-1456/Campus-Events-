"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  children: React.ReactNode;
  requiredRole?: "student" | "organizer" | "admin";
  fallback?: React.ReactNode;
};

export function ProtectedRoute({ children, requiredRole, fallback }: Props) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    if (requiredRole === "admin" && user.role !== "admin") {
      router.push("/events");
      return;
    }

    if (requiredRole === "organizer" && !["organizer", "admin"].includes(user.role)) {
      router.push("/events");
      return;
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Authentication Required</h1>
          <p className="text-muted-foreground">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole === "admin" && user.role !== "admin") {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">Admin privileges required.</p>
        </div>
      </div>
    );
  }

  if (requiredRole === "organizer" && !["organizer", "admin"].includes(user.role)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">Organizer privileges required.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
