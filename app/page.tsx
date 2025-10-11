"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site/SiteHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { events, categories } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <SiteHeader />

      {/* Full-Screen Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/background-video.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 dark:from-pink-900 dark:via-purple-800 dark:to-blue-900"></div>
          </video>
          
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-primary/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Discover campus events
            </motion.div>
            
            <motion.h1 
              className="text-balance text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Find.
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-transparent">
                Save.
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary/60 via-primary/80 to-primary bg-clip-text text-transparent">
                Attend.
              </span>
            </motion.h1>
            
            <motion.p 
              className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A modern way for students to explore events, claim tickets, and check in with QR codes. 
              Join thousands of students discovering amazing campus experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button asChild size="lg" className="px-8 py-3 text-lg">
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-8 pt-16 md:grid-cols-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">500+</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">50+</div>
                <div className="text-sm text-muted-foreground">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="border-b bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Events</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured events</h2>
              <p className="text-muted-foreground">Hand-picked highlights this week</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/events">View all</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((e) => (
              <EventCard key={e.id} {...e} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Upcoming Highlights</h2>
            <p className="text-muted-foreground">Don&apos;t miss these exciting events</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {events.slice(0, 5).map((e) => (
              <motion.div
                key={e.id}
                className="flex-shrink-0 w-80"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-32">
                    {e.image && (
                      <Image src={e.image} alt={e.title} fill className="object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-sm font-medium">{e.title}</div>
                      <div className="text-xs opacity-90">{new Date(e.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-muted-foreground">{e.location}</div>
                    <div className="text-xs text-muted-foreground">{e.organization}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Discover</h3>
              <p className="text-muted-foreground">Explore events by category, date, or organization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Claim Tickets</h3>
              <p className="text-muted-foreground">Reserve your spot with free or paid tickets</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check-In with QR</h3>
              <p className="text-muted-foreground">Present your digital ticket for seamless entry</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Featured Organizations</h2>
            <p className="text-muted-foreground">Trusted by leading campus groups</p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[
              { name: "Student Union", logo: "🎓" },
              { name: "CompSci Society", logo: "💻" },
              { name: "Athletics Club", logo: "🏃" },
              { name: "Drama Society", logo: "🎭" },
              { name: "Film Society", logo: "🎬" },
              { name: "Environmental Club", logo: "🌱" },
              { name: "Literary Society", logo: "📚" },
              { name: "Volunteer Club", logo: "🤝" },
            ].map((org, index) => (
              <motion.div
                key={org.name}
                className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl">{org.logo}</div>
                <div className="text-sm font-medium text-center">{org.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">What Students Say</h2>
            <p className="text-muted-foreground">Real experiences from our community</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Computer Science",
                avatar: "SC",
                quote: "The platform made it so easy to discover tech talks and networking events. I've met amazing people and learned so much!"
              },
              {
                name: "Marcus Johnson",
                role: "Business",
                avatar: "MJ",
                quote: "As an organizer, the analytics dashboard helps me understand what events work best. The QR check-in is seamless!"
              },
              {
                name: "Elena Rodriguez",
                role: "Arts",
                avatar: "ER",
                quote: "I love how I can save events to my calendar and get reminders. Never missed an important event since using this platform."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="p-6 rounded-lg border bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Browse by category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button key={c} variant="outline" className="rounded-full">
                {c}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Ready to join?</h2>
            <p className="text-muted-foreground mb-8">Start discovering amazing campus events today</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/signin">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Campus Events</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}