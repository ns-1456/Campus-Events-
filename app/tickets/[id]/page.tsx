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
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg border p-10 text-center">
          <h1 className="text-2xl font-semibold mb-2">Ticket not found</h1>
          <p className="text-muted-foreground mb-4">The ticket you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/events">Back to Events</a>
          </Button>
        </div>
      </main>
    );
  }

  const ticketId = `ticket-${id}-${Date.now()}`;
  const qrValue = JSON.stringify({
    ticketId,
    eventId: id,
    eventTitle: event.title,
    timestamp: new Date().toISOString(),
  });

  const printTicket = () => {
    window.print();
  };

  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${event.title}`,
          text: `Your ticket for ${event.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Your Ticket</h1>
          <p className="text-muted-foreground">Present this QR code at the event entrance</p>
        </div>

        <Card className="p-8 max-w-md mx-auto">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-muted-foreground">{event.organization}</p>
            </div>

            <div className="flex justify-center">
              <QRCode value={qrValue} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span>{event.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{event.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket ID:</span>
                <span className="font-mono text-xs">{ticketId}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={printTicket} className="flex-1">
                Print Ticket
              </Button>
              <Button variant="outline" onClick={shareTicket} className="flex-1">
                Share
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => router.push("/events")}>
            Back to Events
          </Button>
        </div>
      </div>
    </main>
  );
}