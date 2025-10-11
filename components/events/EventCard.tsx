"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

type Props = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organization: string;
  capacity: number;
  ticketsIssued: number;
  image?: string;
  className?: string;
};

export function EventCard(props: Props) {
  const {
    id,
    title,
    date,
    time,
    location,
    category,
    organization,
    capacity,
    ticketsIssued,
    image,
    className,
  } = props;

  const sold = Math.min(ticketsIssued, capacity);
  const pct = Math.round((sold / capacity) * 100);

  return (
    <Link href={`/events/${id}`} className={cn("group", className)}>
      <motion.div 
        whileHover={{ y: -4, scale: 1.02 }} 
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative"
      >
        <Card className="overflow-hidden shadow-card transition-all duration-300 group-hover:shadow-glow group-hover:border-primary/20">
            <div className="relative aspect-[16/10]">
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 z-5" />
              
              {/* Glassmorphism badges */}
              <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
                <Badge variant="secondary" className="glass backdrop-blur-sm bg-background/80 text-foreground">
                  {category}
                </Badge>
                <Badge className="gradient-primary text-primary-foreground shadow-glow-sm">
                  {pct}% full
                </Badge>
              </div>
              
              {/* Enhanced image with hover effect */}
              <motion.div
                className="relative h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {image ? (
                  <Image src={image} alt="" fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-subtle" />
                )}
              </motion.div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              {/* Enhanced date and organization with icons */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span>
                    {new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                    , {time}
                  </span>
                </div>
                <span className="font-medium">{organization}</span>
              </div>
              
              <h3 className="line-clamp-1 text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                {title}
              </h3>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="line-clamp-1">{location}</span>
              </div>
              
              {/* Enhanced progress bar with gradient */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tickets sold</span>
                  <span className="font-medium">{sold}/{capacity}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full gradient-primary rounded-full shadow-glow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
      </motion.div>
    </Link>
  );
}


