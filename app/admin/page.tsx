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
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Download,
  Settings,
  Activity,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminDashboard() {
  const totalEvents = events.length;
  const totalTickets = events.reduce((sum, e) => sum + e.ticketsIssued, 0);
  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const attendanceRate = Math.round((totalTickets / totalCapacity) * 100);
  
  // Mock data for admin features
  const pendingApprovals = [
    { id: "1", type: "event", title: "Spring Music Festival", organizer: "Music Club", submitted: "2 hours ago" },
    { id: "2", type: "organization", title: "Environmental Society", organizer: "Sarah Chen", submitted: "5 hours ago" },
    { id: "3", type: "event", title: "Tech Workshop Series", organizer: "CS Department", submitted: "1 day ago" },
  ];

  const recentActivity = [
    { id: "1", action: "Event approved", target: "Hackathon 2025", user: "Admin", time: "10 minutes ago" },
    { id: "2", action: "Organization verified", target: "Drama Society", user: "Admin", time: "1 hour ago" },
    { id: "3", action: "Event flagged", target: "Comedy Night", user: "Student", time: "2 hours ago" },
    { id: "4", action: "User reported", target: "Inappropriate content", user: "Student", time: "3 hours ago" },
  ];

  const platformStats = {
    totalUsers: 1250,
    activeOrganizations: 45,
    eventsThisMonth: 28,
    ticketsSoldToday: 156,
    avgAttendanceRate: 78,
    flaggedContent: 3,
  };

  const handleExportData = () => {
    toast.success("Platform data exported successfully");
  };

  const handleApprove = (_id: string) => {
    toast.success("Item approved successfully");
  };

  const handleReject = (_id: string) => {
    toast.error("Item rejected");
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <SiteHeader showBackButton={true} backHref="/" backLabel="Home" />
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">Platform oversight and management</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
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
                label="Total Users" 
                value={platformStats.totalUsers.toLocaleString()} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard 
                label="Active Organizations" 
                value={platformStats.activeOrganizations.toString()} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard 
                label="Events This Month" 
                value={platformStats.eventsThisMonth.toString()} 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard 
                label="Tickets Sold Today" 
                value={platformStats.ticketsSoldToday.toString()} 
              />
            </motion.div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Platform Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Platform Health
                    </CardTitle>
                    <CardDescription>Current system status and metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Status</span>
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Database</span>
                      <Badge variant="default" className="bg-green-500">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CDN</span>
                      <Badge variant="default" className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm text-muted-foreground">45ms</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Recent Alerts
                    </CardTitle>
                    <CardDescription>System notifications and warnings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-yellow-50 dark:bg-yellow-900/20">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">High traffic detected</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-green-50 dark:bg-green-900/20">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Backup completed</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-blue-50 dark:bg-blue-900/20">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Scheduled maintenance</p>
                        <p className="text-xs text-muted-foreground">Tomorrow 2:00 AM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Event Statistics
                  </CardTitle>
                  <CardDescription>Comprehensive event analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{totalEvents}</div>
                      <div className="text-sm text-muted-foreground">Total Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{totalTickets.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Tickets Issued</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{attendanceRate}%</div>
                      <div className="text-sm text-muted-foreground">Avg Attendance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approvals Tab */}
            <TabsContent value="approvals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Items waiting for admin review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Submitted by {item.organizer} • {item.submitted}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => handleApprove(item.id)}>
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleReject(item.id)}>
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Platform user statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">New Users (30 days)</span>
                        <span className="font-medium">+156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Users (7 days)</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">User Retention Rate</span>
                        <span className="font-medium">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Performance</CardTitle>
                    <CardDescription>Event success metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg Event Attendance</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Most Popular Category</span>
                        <span className="font-medium">Music</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Peak Event Time</span>
                        <span className="font-medium">7:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Platform activity log</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.target} • {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Configure platform behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-approve events</p>
                        <p className="text-sm text-muted-foreground">Automatically approve events from verified organizers</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Content moderation</p>
                        <p className="text-sm text-muted-foreground">AI-powered content filtering</p>
                      </div>
                      <Button variant="outline" size="sm">Settings</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Maintenance</CardTitle>
                    <CardDescription>Platform maintenance tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Backup Database
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Activity className="mr-2 h-4 w-4" />
                      System Diagnostics
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