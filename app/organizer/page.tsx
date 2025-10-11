"use client";

import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { events } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus,
  BarChart3,
  Download,
  QrCode,
  Settings,
  MapPin,
  Star,
  Eye,
  Share2,
  Edit,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function OrganizerDashboard() {
  const totalTickets = events.reduce((sum, e) => sum + e.ticketsIssued, 0);
  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const attendanceRate = Math.round((totalTickets / totalCapacity) * 100);
  
  // Mock data for organizer features
  const myEvents = events.slice(0, 6); // First 6 events as "my events"
  
  const recentActivity = [
    { id: "1", action: "Ticket claimed", event: "Hackathon 2025", user: "Sarah Chen", time: "5 minutes ago" },
    { id: "2", action: "Event shared", event: "Comedy Night", user: "Mike Johnson", time: "1 hour ago" },
    { id: "3", action: "New registration", event: "Tech Talk", user: "Emma Davis", time: "2 hours ago" },
    { id: "4", action: "Event updated", event: "Music Festival", user: "You", time: "3 hours ago" },
  ];

  const analytics = {
    totalViews: 1250,
    totalShares: 89,
    conversionRate: 12.5,
    avgRating: 4.7,
    peakHours: "7:00 PM",
    topCategory: "Music",
  };

  const handleExportCSV = () => {
    try {
      const exportData = myEvents.map((e) => ({
        title: e.title,
        date: e.date,
        time: e.time,
        location: e.location,
        category: e.category,
        capacity: e.capacity,
        ticketsIssued: e.ticketsIssued,
        attendanceRate: `${Math.round((e.ticketsIssued / e.capacity) * 100)}%`,
      }));

      const csvContent = [
        Object.keys(exportData[0]).join(','),
        ...exportData.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `my-events-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Events exported successfully");
    } catch {
      toast.error("Failed to export events");
    }
  };

  const handleQuickAction = (action: string) => {
    toast.success(`${action} action completed`);
  };

  return (
    <ProtectedRoute requiredRole="organizer">
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <SiteHeader showBackButton={true} backHref="/" backLabel="Home" />
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Organizer Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">Manage your events and track performance</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button asChild>
                  <Link href="/organizer/events/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard 
                label="My Events" 
                value={myEvents.length.toString()} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard 
                label="Tickets Issued" 
                value={totalTickets.toLocaleString()} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard 
                label="Attendance Rate" 
                value={`${attendanceRate}%`} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard 
                label="Avg Rating" 
                value={`${analytics.avgRating}/5`} 
              />
            </motion.div>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common organizer tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("QR Scanner")}
                >
                  <QrCode className="h-6 w-6" />
                  <span>QR Scanner</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Analytics")}
                >
                  <BarChart3 className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Promote Event")}
                >
                  <Share2 className="h-6 w-6" />
                  <span>Promote Event</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Settings")}
                >
                  <Settings className="h-6 w-6" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">My Events</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">My Events</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/organizer/events/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Event
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image 
                          src={event.image} 
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">{event.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {event.ticketsIssued}/{event.capacity} tickets
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(event.ticketsIssued / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {Math.round((event.ticketsIssued / event.capacity) * 100)}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/organizer/events/${event.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Performance</CardTitle>
                    <CardDescription>How your events are performing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Views</span>
                      <span className="font-medium">{analytics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Shares</span>
                      <span className="font-medium">{analytics.totalShares}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium">{analytics.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{analytics.avgRating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Insights</CardTitle>
                    <CardDescription>Key insights about your events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak Event Time</span>
                      <span className="font-medium">{analytics.peakHours}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most Popular Category</span>
                      <span className="font-medium">{analytics.topCategory}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Performing Event</span>
                      <span className="font-medium">Hackathon 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-medium text-green-600">+23%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Analytics Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics for each event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Event</th>
                          <th className="text-left p-2">Views</th>
                          <th className="text-left p-2">Tickets</th>
                          <th className="text-left p-2">Attendance</th>
                          <th className="text-left p-2">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myEvents.map((event) => (
                          <tr key={event.id} className="border-b">
                            <td className="p-2 font-medium">{event.title}</td>
                            <td className="p-2">{Math.floor(Math.random() * 500) + 100}</td>
                            <td className="p-2">{event.ticketsIssued}</td>
                            <td className="p-2">{Math.round((event.ticketsIssued / event.capacity) * 100)}%</td>
                            <td className="p-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest activity on your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.event} • {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Management Tools</CardTitle>
                    <CardDescription>Tools to help manage your events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code Scanner
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Attendee List
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Social Media Templates
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Detailed Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Promotion Tools</CardTitle>
                    <CardDescription>Promote your events effectively</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Email Campaigns
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar Integration
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Target Audience
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Boost Visibility
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </ProtectedRoute>
  );
}