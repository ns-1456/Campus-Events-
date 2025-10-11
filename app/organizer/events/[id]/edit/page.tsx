"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { events } from "@/lib/mock-data";
import { EventForm } from "@/components/organizer/EventForm";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const event = useMemo(() => events.find((e) => e.id === id), [id]);
  if (!event) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg border p-10 text-center">Event not found</div>
      </main>
    );
  }
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Edit Event</h1>
          <p className="text-muted-foreground">Update your event details</p>
        </div>
        <EventForm event={event} />
      </div>
    </main>
  );
}