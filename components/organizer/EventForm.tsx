"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { events } from "@/lib/mock-data";

export type EventFormValues = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location: string;
  category: string;
  organization: string;
  capacity: number;
  ticketType: "free" | "paid";
};

type Props = {
  initial?: Partial<EventFormValues>;
  onSuccess?: () => void;
};

export function EventForm({ initial, onSuccess }: Props) {
  const organizations = useMemo(
    () => Array.from(new Set(events.map((e) => e.organization))).sort(),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category))).sort(),
    []
  );

  const [values, setValues] = useState<EventFormValues>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    date: initial?.date ?? "",
    time: initial?.time ?? "",
    location: initial?.location ?? "",
    category: initial?.category ?? categories[0] ?? "",
    organization: initial?.organization ?? organizations[0] ?? "",
    capacity: initial?.capacity ?? 100,
    ticketType: (initial?.ticketType as "free" | "paid") ?? "free",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof EventFormValues>(key: K, val: EventFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.date) e.date = "Date is required";
    if (!values.time) e.time = "Time is required";
    if (!values.location.trim()) e.location = "Location is required";
    if (!values.category) e.category = "Category is required";
    if (!values.organization) e.organization = "Organization is required";
    if (!Number.isFinite(values.capacity) || values.capacity <= 0)
      e.capacity = "Capacity must be greater than 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock network
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Event saved", { description: `${values.title} scheduled on ${values.date}` });
    setSubmitting(false);
    onSuccess?.();
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={values.title} onChange={(e) => update("title", e.target.value)} aria-invalid={!!errors.title} />
        {errors.title ? <p className="text-sm text-red-600">{errors.title}</p> : null}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={values.description} onChange={(e) => update("description", e.target.value)} rows={5} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={values.date} onChange={(e) => update("date", e.target.value)} aria-invalid={!!errors.date} />
        {errors.date ? <p className="text-sm text-red-600">{errors.date}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" value={values.time} onChange={(e) => update("time", e.target.value)} aria-invalid={!!errors.time} />
        {errors.time ? <p className="text-sm text-red-600">{errors.time}</p> : null}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={values.location} onChange={(e) => update("location", e.target.value)} aria-invalid={!!errors.location} />
        {errors.location ? <p className="text-sm text-red-600">{errors.location}</p> : null}
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={values.category} onValueChange={(v) => update("category", v)}>
          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
        {errors.category ? <p className="text-sm text-red-600">{errors.category}</p> : null}
      </div>

      <div className="space-y-2">
        <Label>Organization</Label>
        <Select value={values.organization} onValueChange={(v) => update("organization", v)}>
          <SelectTrigger><SelectValue placeholder="Select organization" /></SelectTrigger>
          <SelectContent>
            {organizations.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
          </SelectContent>
        </Select>
        {errors.organization ? <p className="text-sm text-red-600">{errors.organization}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input id="capacity" type="number" min={1} value={values.capacity} onChange={(e) => update("capacity", Number(e.target.value))} aria-invalid={!!errors.capacity} />
        {errors.capacity ? <p className="text-sm text-red-600">{errors.capacity}</p> : null}
      </div>

      <div className="space-y-2">
        <Label>Ticket type</Label>
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <Switch checked={values.ticketType === "paid"} onCheckedChange={(c) => update("ticketType", c ? "paid" : "free")} />
          <span className="text-sm text-muted-foreground">{values.ticketType === "paid" ? "Paid" : "Free"}</span>
        </div>
      </div>

      <div className="md:col-span-2">
        <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save event"}</Button>
      </div>
    </form>
  );
}


