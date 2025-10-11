"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ScannerMockPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  function onUpload(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setTimeout(() => toast.success("Ticket valid", { description: `Scanned ${f.name}` }), 400);
  }
  return (
    <main>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">QR Scanner (Mock)</h1>
        <p className="text-muted-foreground">Upload a QR image to simulate validation</p>
        <Card className="mt-6 p-6">
          <input id="qr" type="file" accept="image/*" className="hidden" onChange={onUpload} />
          <div className="flex items-center gap-3">
            <Button onClick={() => document.getElementById("qr")?.click()}>Upload QR</Button>
            <span className="text-sm text-muted-foreground">{fileName ?? "No file selected"}</span>
          </div>
        </Card>
      </div>
    </main>
  );
}


