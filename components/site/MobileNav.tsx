"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">Toggle navigation</span>
        <div className="h-4 w-4">
          <div className="h-[2px] w-4 bg-foreground mb-[3px]" />
          <div className="h-[2px] w-4 bg-foreground mb-[3px]" />
          <div className="h-[2px] w-4 bg-foreground" />
        </div>
      </Button>
      {open ? (
        <nav id="mobile-menu" className="mt-2 grid gap-1 rounded-md border p-2 text-sm">
          <Link href="/events" className="rounded px-2 py-2 hover:bg-muted">Events</Link>
          <Link href="/organizer" className="rounded px-2 py-2 hover:bg-muted">Organizer</Link>
          <Link href="/admin" className="rounded px-2 py-2 hover:bg-muted">Admin</Link>
          <Link href="/account/tickets" className="rounded px-2 py-2 hover:bg-muted">My Tickets</Link>
        </nav>
      ) : null}
    </div>
  );
}


