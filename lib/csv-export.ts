export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; header: string }[]
) {
  if (data.length === 0) {
    throw new Error("No data to export");
  }

  // Determine columns
  const cols =
    columns ||
    Object.keys(data[0]).map((key) => ({
      key: key as keyof T,
      header: key,
    }));

  // Create CSV header
  const headers = cols.map((col) => col.header).join(",");

  // Create CSV rows
  const rows = data.map((row) =>
    cols
      .map((col) => {
        const value = row[col.key];
        // Escape commas and quotes in values
        const stringValue = String(value ?? "");
        if (stringValue.includes(",") || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",")
  );

  // Combine header and rows
  const csv = [headers, ...rows].join("\n");

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

