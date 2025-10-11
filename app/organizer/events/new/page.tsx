"use client";

import { EventForm } from "@/components/organizer/EventForm";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Create event</h1>
        <p className="text-muted-foreground">Fill in the details below</p>
        <div className="mt-6 rounded-xl border p-6">
          <EventForm onSuccess={() => router.push("/organizer")} />
        </div>
      </div>
    </main>
  );
}


