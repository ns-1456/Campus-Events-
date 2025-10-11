# Campus Events & Ticketing Web Application

A modern, full-featured web application for managing campus events and ticketing, built with Next.js, React, and TypeScript.

## 🎯 Project Overview

This project is part of **SOEN 341 Software Process Team Project** (Fall 2025). It's a comprehensive campus events platform that enables students to discover, organize, and attend events on campus with features like QR code ticketing, event management, and analytics.

## ✨ Features

### 👨‍🎓 Student Features
- **Event Discovery**: Browse and search events with advanced filters
- **Event Management**: Save events to personal calendar
- **Digital Ticketing**: Claim tickets and receive QR codes
- **User Profile**: Comprehensive dashboard with personal calendar
- **Event History**: Track attended and saved events

### 🎪 Organizer Features
- **Event Creation**: Create and manage events with detailed information
- **Analytics Dashboard**: Track attendance rates and performance metrics
- **QR Scanner**: Validate tickets at events
- **CSV Export**: Export attendee data and analytics
- **Event Management**: Edit, update, and monitor events

### ⚙️ Administrator Features
- **Platform Oversight**: Approve organizer accounts and moderate content
- **Global Analytics**: View platform-wide statistics and trends
- **Content Moderation**: Manage organizations and user roles
- **System Management**: Platform health monitoring and maintenance tools

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Authentication**: Custom role-based auth system
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
campus-frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── events/            # Event listing and details
│   ├── organizer/         # Organizer dashboard and tools
│   ├── admin/             # Admin dashboard and management
│   └── account/           # User profile and settings
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── events/           # Event-related components
│   ├── dashboard/        # Dashboard components
│   └── site/             # Site-wide components
├── lib/                  # Utility functions and contexts
│   ├── auth-context.tsx  # Authentication context
│   ├── mock-data.ts      # Sample data for development
│   └── csv-export.ts     # CSV export utilities
└── public/               # Static assets
    └── videos/           # Background videos
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design inspired by modern web applications
- **Responsive Design**: Mobile-first approach with full mobile support
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Accessibility**: ARIA attributes, skip links, and keyboard navigation
- **Animations**: Smooth micro-interactions and page transitions
- **Video Background**: Cinematic hero section with custom video support

## 🔐 Authentication System

The application includes a comprehensive role-based authentication system:

- **Student**: Browse events, claim tickets, manage profile
- **Organizer**: Create events, manage analytics, scan tickets
- **Administrator**: Platform oversight, content moderation, system management

## 📱 Key Pages

- **Landing Page**: Full-screen video hero with animated background
- **Events Page**: Advanced filtering, sorting, and view options
- **Event Details**: Rich event information with sharing and calendar integration
- **User Profile**: Comprehensive dashboard with calendar and statistics
- **Organizer Dashboard**: Event management and analytics tools
- **Admin Dashboard**: Platform oversight and management tools

## 🎬 Video Background

The hero section features a custom video background. To add your own video:

1. Place your video file in `public/videos/background-video.mp4`
2. Ensure the video is optimized for web (MP4 format recommended)
3. The video will automatically loop and play muted for autoplay compliance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📊 Mock Data

The application includes comprehensive mock data for development and demonstration:
- 12 diverse events across 8 categories
- Multiple organizations and user roles
- Realistic analytics and statistics
- Sample user profiles and activity

## 🤝 Contributing

This is a team project for SOEN 341. Please follow the established coding standards and commit conventions.

## 📄 License

This project is created for educational purposes as part of SOEN 341 Software Process Team Project.

## 🎓 Team Project Information

- **Course**: SOEN 341 Software Process Team Project
- **Semester**: Fall 2025
- **Duration**: 10 weeks (4 sprints)
- **Methodology**: Agile Scrum
- **Deliverable**: Middle-fidelity prototype

---

**Built with ❤️ for the campus community**