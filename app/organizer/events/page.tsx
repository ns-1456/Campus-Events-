import React from "react";
import Link from "next/link";
import { events } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OrganizerEventsList() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Your events</h1>
            <p className="text-muted-foreground">Manage and edit your events</p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/new">Create event</Link>
          </Button>
        </div>

        <Card>
          <div className="grid grid-cols-5 text-sm">
            <div className="border-b px-4 py-2 font-medium">Title</div>
            <div className="border-b px-4 py-2 font-medium">Date</div>
            <div className="border-b px-4 py-2 font-medium">Tickets</div>
            <div className="border-b px-4 py-2 font-medium">Capacity</div>
            <div className="border-b px-4 py-2 font-medium">Actions</div>
            {events.map((e) => (
              <React.Fragment key={e.id}>
                <div className="px-4 py-3">{e.title}</div>
                <div className="px-4 py-3">{new Date(e.date).toLocaleDateString()} {e.time}</div>
                <div className="px-4 py-3">{e.ticketsIssued}</div>
                <div className="px-4 py-3">{e.capacity}</div>
                <div className="px-4 py-3">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/organizer/events/${e.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}


