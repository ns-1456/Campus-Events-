"use client";

import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Column<Row> = {
  key: keyof Row | string;
  header: string;
  width?: string;
  cell?: (row: Row) => React.ReactNode;
  sortable?: boolean;
};

type Props<Row> = {
  rows: Row[];
  columns: Column<Row>[];
  initialSortKey?: string;
  pageSize?: number;
};

export function DataTable<Row extends Record<string, unknown>>({ rows, columns, initialSortKey, pageSize = 8 }: Props<Row>) {
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const getCellValue = useCallback((row: Row, key: string): unknown => {
    const r = row as Record<string, unknown>;
    return r[key];
  }, []);

  const compareValues = useCallback((a: unknown, b: unknown): number => {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === "number" && typeof b === "number") return a - b;
    const as = String(a).toLowerCase();
    const bs = String(b).toLowerCase();
    if (as > bs) return 1;
    if (as < bs) return -1;
    return 0;
  }, []);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const copy = [...rows];
    copy.sort((a, b) => compareValues(getCellValue(a, sortKey), getCellValue(b, sortKey)));
    return sortAsc ? copy : copy.reverse();
  }, [rows, sortKey, sortAsc, getCellValue, compareValues]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  function onSort(col: Column<Row>) {
    if (!col.sortable) return;
    const key = String(col.key);
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="text-sm text-muted-foreground">{rows.length} items</div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Density</span>
          <Button size="sm" variant={density === "comfortable" ? "default" : "outline"} onClick={() => setDensity("comfortable")}>Comfortable</Button>
          <Button size="sm" variant={density === "compact" ? "default" : "outline"} onClick={() => setDensity("compact")}>Compact</Button>
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: columns.map((c) => c.width ?? "1fr").join(" ") }}>
        {columns.map((c) => (
          <div
            key={String(c.key)}
            role="columnheader"
            aria-sort={sortKey === String(c.key) ? (sortAsc ? "ascending" : "descending") : "none"}
            className={cn(
              "border-b px-4 py-2 text-left text-sm font-medium",
              c.sortable ? "cursor-pointer hover:bg-muted/50" : "cursor-default"
            )}
            onClick={() => onSort(c)}
          >
            {c.header}
          </div>
        ))}
        {pageRows.map((row, idx) => (
          <RowView key={idx} row={row} columns={columns} density={density} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
          <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
        </div>
      </div>
    </div>
  );
}

function RowView<Row extends Record<string, unknown>>({ row, columns, density }: { row: Row; columns: Column<Row>[]; density: "comfortable" | "compact" }) {
  return (
    <>
      {columns.map((c) => {
        const value = c.cell ? c.cell(row) : String((row as Record<string, unknown>)[String(c.key)] ?? "");
        return (
          <div key={String(c.key)} className={cn("px-4", density === "compact" ? "py-2" : "py-3", "text-sm border-b")}>{value}</div>
        );
      })}
    </>
  );
}


