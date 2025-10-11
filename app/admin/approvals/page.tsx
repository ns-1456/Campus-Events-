"use client";

import { Card } from "@/components/ui/card";
import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";

type Row = { id: string; org: string; contact: string; requested: string };

const rows: Row[] = [
  { id: "o1", org: "Robotics Club", contact: "alex@univ.edu", requested: "2025-09-10" },
  { id: "o2", org: "Drama Society", contact: "lia@univ.edu", requested: "2025-09-12" },
];

const columns: Column<Row>[] = [
  { key: "org", header: "Organization", sortable: true },
  { key: "contact", header: "Contact" },
  { key: "requested", header: "Requested", sortable: true },
  { key: "actions", header: "Actions", cell: () => (
    <div className="flex gap-2">
      <Button size="sm">Approve</Button>
      <Button size="sm" variant="outline">Reject</Button>
    </div>
  ) },
];

export default function AdminApprovals() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Approvals</h1>
        <p className="text-muted-foreground">Approve organizer accounts</p>
        <Card className="mt-6 p-0">
          <DataTable rows={rows} columns={columns} />
        </Card>
      </div>
    </main>
  );
}


