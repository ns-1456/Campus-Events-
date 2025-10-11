import { Card } from "@/components/ui/card";

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: Props) {
  return (
    <Card className="p-4 shadow-card transition hover:shadow-xl">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {hint ? <div className="text-xs text-muted-foreground">{hint}</div> : null}
    </Card>
  );
}


