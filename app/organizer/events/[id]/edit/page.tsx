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
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Edit event</h1>
        <p className="text-muted-foreground">Update details and save</p>
        <div className="mt-6 rounded-xl border p-6">
          <EventForm
            initial={{
              title: event.title,
              description: event.description,
              date: event.date,
              time: event.time,
              location: event.location,
              category: event.category,
              organization: event.organization,
              capacity: event.capacity,
              ticketType: "free",
            }}
            onSuccess={() => router.push("/organizer")}
          />
        </div>
      </div>
    </main>
  );
}


