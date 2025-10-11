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
          <p className="mb-4 text-lg font-medium">Event not found</p>
          <Button variant="outline" onClick={() => router.push("/events")}>Back to events</Button>
        </div>
      </main>
    );
  }

  const remaining = Math.max(0, event.capacity - event.ticketsIssued);
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
      } catch (_err) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Campus Events//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Calendar event downloaded!");
  };

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/events" className="hover:text-foreground">Events</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{event.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              {event.image ? (
                <Image src={event.image} alt="" fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>
            
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

                {/* Enhanced Organizer Card */}
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
                        className="absolute -bottom-2 left-0 h-1 w-16 gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {relatedEvents.map((e) => (
                        <EventCard key={e.id} {...e} />
                      ))}
                    </div>
                  </div>
                )}
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
            <DialogTitle>Claim ticket</DialogTitle>
          </DialogHeader>
          {!claimed ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Confirm to generate a digital ticket. This is a mock flow for the prototype.</p>
              <Button onClick={() => { setClaimed(true); }}>Confirm</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Success! Your ticket has been issued.</p>
              <Button onClick={() => router.push(`/tickets/${event.id}`)}>View ticket</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}


