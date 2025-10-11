"use client";

import { Card } from "@/components/ui/card";
import { DataTable, Column } from "@/components/dashboard/DataTable";
import { events } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

type Row = { title: string; date: string; org: string; category: string; capacity: number; issued: number };

const rows: Row[] = events.map((e) => ({
  title: e.title,
  date: `${new Date(e.date).toLocaleDateString()} ${e.time}`,
  org: e.organization,
  category: e.category,
  capacity: e.capacity,
  issued: e.ticketsIssued,
}));

const columns: Column<Row>[] = [
  { key: "title", header: "Title", sortable: true },
  { key: "date", header: "Date" },
  { key: "org", header: "Organization", sortable: true },
  { key: "category", header: "Category", cell: (r) => <Badge variant="secondary">{r.category}</Badge> },
  { key: "issued", header: "Tickets", sortable: true },
  { key: "capacity", header: "Capacity", sortable: true },
];

export default function AdminEventsModeration() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Events moderation</h1>
        <p className="text-muted-foreground">Review and manage events</p>
        <Card className="mt-6 p-0">
          <DataTable rows={rows} columns={columns} />
        </Card>
      </div>
    </main>
  );
}


