"use client";

import { Card } from "@/components/ui/card";
import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";

type Row = { org: string; members: number; roles: string };

const rows: Row[] = [
  { org: "Student Union", members: 24, roles: "admin, editor" },
  { org: "CompSci Society", members: 18, roles: "editor" },
  { org: "Athletics Club", members: 12, roles: "editor" },
];

const columns: Column<Row>[] = [
  { key: "org", header: "Organization", sortable: true },
  { key: "members", header: "Members", sortable: true },
  { key: "roles", header: "Roles" },
  { key: "actions", header: "Actions", cell: () => <Button size="sm" variant="outline">Manage</Button> },
];

export default function AdminOrgs() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Organizations</h1>
        <p className="text-muted-foreground">Manage organizations and roles</p>
        <Card className="mt-6 p-0">
          <DataTable rows={rows} columns={columns} />
        </Card>
      </div>
    </main>
  );
}


