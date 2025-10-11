"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { events } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { EventCard } from "@/components/events/EventCard";
import { ChevronRight, Share2, Calendar, MapPin, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const event = useMemo(() => events.find((e) => e.id === id), [id]);
  const [open, setOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!event) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-lg border p-10 text-center">
          <h1 className="text-2xl font-semibold mb-2">Event not found</h1>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </main>
    );
  }

  const remaining = event.capacity - event.ticketsIssued;
  const relatedEvents = events
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
    toast.success("Calendar event created!");
  };

  const claimTicket = () => {
    setClaimed(true);
    setOpen(false);
    toast.success("Ticket claimed successfully!");
  };

  return (
    <main className="min-h-[100dvh]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">{event.title}</h1>
                  <p className="text-muted-foreground mt-2">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={shareEvent}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={addToCalendar}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Date & Time</span>
                  </div>
                  <div>{new Date(event.date).toLocaleDateString()} at {event.time}</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">Location</span>
                  </div>
                  <div>{event.location}</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">Organization</span>
                  </div>
                  <div>{event.organization}</div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">Category</span>
                  </div>
                  <div>{event.category}</div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">Event Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">{event.organization.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{event.organization}</div>
                    <div className="text-sm text-muted-foreground">Verified Organizer</div>
                  </div>
                </div>
              </Card>

              {/* Related Events */}
              {relatedEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight mb-4 relative">
                    Related Events
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 w-16 bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedEvents.map((relatedEvent) => (
                      <EventCard key={relatedEvent.id} {...relatedEvent} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <Card className="p-4 space-y-3">
              <div className="text-sm text-muted-foreground">Remaining capacity</div>
              <div className="text-3xl font-semibold text-primary">{remaining}</div>
              <Button className="w-full" disabled={remaining === 0} onClick={() => setOpen(true)}>
                {remaining === 0 ? "Sold out" : "Claim ticket"}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/events")}>Back</Button>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Claim Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to claim a ticket for <strong>{event.title}</strong>?</p>
            <div className="flex gap-2">
              <Button onClick={claimTicket} className="flex-1">
                Yes, claim ticket
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}