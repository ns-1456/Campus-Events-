"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useAuth } from "@/lib/auth-context";
import { events } from "@/lib/mock-data";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Heart, 
  Settings,
  Edit,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  Save,
  X,
  Calendar as CalendarIcon,
  Users,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    bio: "Passionate student interested in technology, music, and community events.",
    location: "Montreal, QC",
    interests: ["Technology", "Music", "Sports", "Arts"],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profile: "public",
      events: "friends",
      activity: "private",
    }
  });

  // Mock data for user's events
  const savedEvents = events.slice(0, 4);
  const attendedEvents = events.slice(4, 8);
  const createdEvents = events.slice(8, 10);

  // Mock calendar data
  const calendarEvents = [
    { id: "1", title: "Hackathon 2025", date: "2025-01-15", time: "09:00", type: "attending" },
    { id: "2", title: "Comedy Night", date: "2025-01-18", time: "19:00", type: "attending" },
    { id: "3", title: "Tech Talk", date: "2025-01-22", time: "14:00", type: "saved" },
    { id: "4", title: "Music Festival", date: "2025-01-25", time: "18:00", type: "attending" },
  ];

  // Mock user stats
  const userStats = {
    eventsAttended: 24,
    eventsCreated: 3,
    ticketsClaimed: 28,
    averageRating: 4.7,
    badges: ["Early Bird", "Social Butterfly", "Tech Enthusiast"],
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes cancelled");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const addInterest = (interest: string) => {
    if (!profileData.interests.includes(interest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const availableInterests = ["Technology", "Music", "Sports", "Arts", "Science", "Literature", "Dance", "Photography", "Gaming", "Volunteering"];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <SiteHeader showBackButton={true} backHref="/" backLabel="Home" />
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end gap-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                    <AvatarFallback className="text-2xl">
                      {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-white">
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    <p className="text-lg opacity-90">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        <MapPin className="mr-1 h-3 w-3" />
                        {profileData.location}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        <Calendar className="mr-1 h-3 w-3" />
                        Joined {new Date().getFullYear()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        type="email"
                      />
                    ) : (
                      <span className="text-sm">{profileData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        type="tel"
                      />
                    ) : (
                      <span className="text-sm">{profileData.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    ) : (
                      <span className="text-sm">{profileData.location}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="cursor-pointer">
                        {interest}
                        {isEditing && (
                          <X 
                            className="ml-1 h-3 w-3 cursor-pointer" 
                            onClick={() => removeInterest(interest)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="space-y-2">
                      <Label className="text-sm">Add interests:</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableInterests
                          .filter(i => !profileData.interests.includes(i))
                          .map((interest) => (
                            <Badge 
                              key={interest} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => addInterest(interest)}
                            >
                              + {interest}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="events">My Events</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-6">
                  {/* User Stats */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{userStats.eventsAttended}</div>
                        <div className="text-sm text-muted-foreground">Events Attended</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{userStats.eventsCreated}</div>
                        <div className="text-sm text-muted-foreground">Events Created</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{userStats.ticketsClaimed}</div>
                        <div className="text-sm text-muted-foreground">Tickets Claimed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-3xl font-bold text-primary">{userStats.averageRating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Badges */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Achievements & Badges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {userStats.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Attended Hackathon 2025</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Saved Comedy Night</p>
                            <p className="text-xs text-muted-foreground">1 week ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Created Tech Workshop</p>
                            <p className="text-xs text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Calendar Tab */}
                <TabsContent value="calendar" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Personal Calendar
                      </CardTitle>
                      <CardDescription>Your upcoming events and activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {calendarEvents.map((event) => (
                          <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <CalendarIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </p>
                            </div>
                            <Badge variant={event.type === "attending" ? "default" : "secondary"}>
                              {event.type === "attending" ? "Attending" : "Saved"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* My Events Tab */}
                <TabsContent value="events" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {createdEvents.map((event, index) => (
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
                              <Badge variant="secondary">Created</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                {(Math.random() * 1.5 + 3.5).toFixed(1)}/5 rating
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Saved Events Tab */}
                <TabsContent value="saved" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {savedEvents.map((event, index) => (
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
                              <Badge variant="secondary">Saved</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
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
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {attendedEvents.map((event, index) => (
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
                              <Badge variant="default">Attended</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Your rating: {(Math.random() * 1.5 + 3.5).toFixed(1)}/5
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Choose how you want to be notified</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.notifications.email ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Get notified in real-time</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.notifications.push ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Text message alerts</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.notifications.sms ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Control your privacy and visibility</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-muted-foreground">Who can see your profile</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.privacy.profile}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Event Activity</p>
                            <p className="text-sm text-muted-foreground">Show your event participation</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.privacy.events}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Activity Feed</p>
                            <p className="text-sm text-muted-foreground">Display recent activity</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {profileData.privacy.activity}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Management</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        <LogOut className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
