"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { FilterBar } from "@/components/events/FilterBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { events } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, Calendar, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [organization, setOrganization] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "capacity">("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const organizations = useMemo(
    () => Array.from(new Set(events.map((e) => e.organization))).sort(),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = [e.title, e.description, e.location, e.organization]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = !category || e.category === category;
      const matchesOrg = !organization || e.organization === organization;
      const matchesDate = !date || e.date === date;
      return matchesSearch && matchesCategory && matchesOrg && matchesDate;
    });
  }, [search, category, organization, date]);

  const sorted = useMemo(() => {
    const sorted = [...filtered];
    switch (sortBy) {
      case "date":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "popularity":
        return sorted.sort((a, b) => b.ticketsIssued - a.ticketsIssued);
      case "capacity":
        return sorted.sort((a, b) => b.capacity - a.capacity);
      default:
        return sorted;
    }
  }, [filtered, sortBy]);

  const clearAllFilters = () => {
    setSearch("");
    setCategory(undefined);
    setOrganization(undefined);
    setDate(undefined);
  };

  return (
    <main>
      <SiteHeader showBackButton={true} backHref="/" backLabel="Home" />
      
      <div className="mx-auto max-w-6xl px-4 py-6">
        <motion.div 
          className="flex items-center justify-between mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight relative">
              All events
              <motion.div
                className="absolute -bottom-1 left-0 h-1 w-16 gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h1>
            <p className="text-muted-foreground">
              {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: "date" | "popularity" | "capacity") => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </div>
                </SelectItem>
                <SelectItem value="popularity">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Popularity
                  </div>
                </SelectItem>
                <SelectItem value="capacity">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacity
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md glass backdrop-blur-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        organization={organization}
        onOrganization={setOrganization}
        date={date}
        onDate={setDate}
        categories={categories}
        organizations={organizations}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {(search || category || organization || date) && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Filters applied:</span>
              {search && <span className="px-2 py-1 bg-primary/10 rounded">Search: &ldquo;{search}&rdquo;</span>}
              {category && <span className="px-2 py-1 bg-primary/10 rounded">Category: {category}</span>}
              {organization && <span className="px-2 py-1 bg-primary/10 rounded">Org: {organization}</span>}
              {date && <span className="px-2 py-1 bg-primary/10 rounded">Date: {date}</span>}
            </div>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        )}

        {sorted.length === 0 ? (
          <div className="rounded-lg border p-10 text-center text-muted-foreground">
            No events match your filters.
          </div>
        ) : (
          <motion.div
            className={viewMode === "grid" 
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
            }
            layout
          >
            {sorted.map((e, index) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <EventCard {...e} className={viewMode === "list" ? "flex-row" : ""} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}


