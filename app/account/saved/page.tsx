"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[] | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setSavedIds(["2"]), 500); // mock load
    return () => clearTimeout(timer);
  }, []);

  const saved = (savedIds ?? []).map((id) => events.find((e) => e.id === id)).filter(Boolean);

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Saved events</h1>
        <p className="text-muted-foreground">Events you&apos;ve saved for later</p>

        {savedIds === null ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : saved.length === 0 ? (
          <div className="mt-8 rounded-lg border p-10 text-center text-muted-foreground">You haven&apos;t saved any events yet.</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((e) => (
              <EventCard key={e!.id} {...e!} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


