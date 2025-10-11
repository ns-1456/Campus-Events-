"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { events } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

function QRCode({ value }: { value: string }) {
  return (
    <div className="p-4 rounded-xl border bg-background">
      <QRCodeSVG value={value} size={192} level="H" />
    </div>
  );
}

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const event = useMemo(() => events.find((e) => e.id === id), [id]);
  if (!event) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-lg border p-10 text-center">
          <p className="mb-4 text-lg font-medium">Ticket not found</p>
          <Button variant="outline" onClick={() => router.push("/events")}>Browse events</Button>
        </div>
      </main>
    );
  }
  
  // Generate unique ticket ID for QR code
  const ticketData = JSON.stringify({
    eventId: event.id,
    eventTitle: event.title,
    ticketId: `TICKET-${event.id}-${Date.now()}`,
    validUntil: event.date,
  });
  
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Your ticket</h1>
            <p className="text-muted-foreground">Present this QR at the entrance.</p>
            <Card className="mt-4 flex items-center gap-6 p-6">
              <QRCode value={ticketData} />
              <div>
                <div className="text-sm text-muted-foreground">Event</div>
                <div className="text-lg font-medium">{event.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()} {event.time} • {event.location}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => window.print()}>Print</Button>
                  <Button size="sm" variant="outline" onClick={() => navigator.share?.({ title: event.title, url: window.location.href })}>Share</Button>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-4 text-sm text-muted-foreground">
              Your ticket is valid for one entry. Keep the QR code visible.
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}


