"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { events } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function MyTicketsPage() {
  const [ticketIds, setTicketIds] = useState<string[] | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setTicketIds(["1", "3"]), 600); // mock load
    return () => clearTimeout(timer);
  }, []);

  const myTickets = (ticketIds ?? [])
    .map((id) => events.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">My tickets</h1>
        <p className="text-muted-foreground">Access your claimed tickets</p>

        {ticketIds === null ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : myTickets.length === 0 ? (
          <div className="mt-8 rounded-lg border p-10 text-center">
            <p className="mb-4 text-muted-foreground">You don&apos;t have tickets yet.</p>
            <Button asChild>
              <Link href="/events">Browse events</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {myTickets.map((e) => (
              <div key={e!.id} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <div className="font-medium">{e!.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(e!.date).toLocaleDateString()} {e!.time}
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link href={`/tickets/${e!.id}`}>View ticket</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


