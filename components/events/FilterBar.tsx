"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCcw } from "lucide-react";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  category?: string;
  onCategory: (v?: string) => void;
  organization?: string;
  onOrganization: (v?: string) => void;
  date?: string; // YYYY-MM-DD
  onDate: (v?: string) => void;
  categories: string[];
  organizations: string[];
};

export function FilterBar(props: Props) {
  const { search, onSearch, category, onCategory, organization, onOrganization, date, onDate, categories, organizations } = props;
  return (
    <div className="sticky top-0 z-30 -mx-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-5">
          <Input
            placeholder="Search events, organizations, locations..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="glass backdrop-blur-sm border-primary/20 focus:border-primary/40 focus:shadow-glow-sm"
          />
        </div>
        <div className="md:col-span-3">
          <Select value={category ?? "all"} onValueChange={(v) => onCategory(v === "all" ? undefined : v)}>
            <SelectTrigger className="glass backdrop-blur-sm border-primary/20 focus:border-primary/40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3">
          <Select value={organization ?? "all"} onValueChange={(v) => onOrganization(v === "all" ? undefined : v)}>
            <SelectTrigger className="glass backdrop-blur-sm border-primary/20 focus:border-primary/40">
              <SelectValue placeholder="Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All organizations</SelectItem>
              {organizations.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <label htmlFor="date" className="sr-only">Date</label>
            <div className="relative w-full">
              <Input 
                id="date" 
                type="date" 
                value={date ?? ""} 
                onChange={(e) => onDate(e.target.value || undefined)} 
                className="pl-9 glass backdrop-blur-sm border-primary/20 focus:border-primary/40" 
              />
              <Calendar className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="md:col-span-12 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { onSearch(""); onCategory(undefined); onOrganization(undefined); onDate(undefined); }}
            className="glass backdrop-blur-sm hover:shadow-glow-sm"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />Reset
          </Button>
        </div>
      </div>
    </div>
  );
}


