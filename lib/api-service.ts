// API service for connecting to ASP.NET Core backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'Student' | 'Organizer' | 'Admin';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  capacity: number;
  ticketsIssued: number;
  ticketType: 'Free' | 'Paid';
  price: number;
  category: string;
  organizerId: number;
  organizationId?: number;
  isApproved: boolean;
  createdAt: string;
  organizer?: User;
  organization?: Organization;
}

export interface Organization {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Ticket {
  id: number;
  eventId: number;
  userId: number;
  uniqueCode: string;
  qrCodeImage?: string;
  claimedAt: string;
  redeemedAt?: string;
  isRedeemed: boolean;
  event?: Event;
  user?: User;
}

export interface SavedEvent {
  userId: number;
  eventId: number;
  savedAt: string;
  user?: User;
  event?: Event;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<{ user: User; token?: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }): Promise<{ user: User; message: string }> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    return this.request('/user/current');
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    return this.request(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Event endpoints
  async getEvents(params?: {
    category?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Event[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    
    const queryString = queryParams.toString();
    return this.request(`/events${queryString ? `?${queryString}` : ''}`);
  }

  async getEvent(id: number): Promise<Event> {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'ticketsIssued'>): Promise<Event> {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id: number): Promise<void> {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Ticket endpoints
  async claimTicket(eventId: number): Promise<Ticket> {
    return this.request('/tickets/claim', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });
  }

  async getUserTickets(): Promise<Ticket[]> {
    return this.request('/tickets/my-tickets');
  }

  async validateTicket(ticketCode: string): Promise<{ valid: boolean; ticket?: Ticket }> {
    return this.request('/tickets/validate', {
      method: 'POST',
      body: JSON.stringify({ ticketCode }),
    });
  }

  async redeemTicket(ticketId: number): Promise<Ticket> {
    return this.request(`/tickets/${ticketId}/redeem`, {
      method: 'POST',
    });
  }

  // Saved events endpoints
  async getSavedEvents(): Promise<SavedEvent[]> {
    return this.request('/saved-events');
  }

  async saveEvent(eventId: number): Promise<SavedEvent> {
    return this.request('/saved-events', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });
  }

  async unsaveEvent(eventId: number): Promise<void> {
    return this.request(`/saved-events/${eventId}`, {
      method: 'DELETE',
    });
  }

  // Organization endpoints
  async getOrganizations(): Promise<Organization[]> {
    return this.request('/organizations');
  }

  async getOrganization(id: number): Promise<Organization> {
    return this.request(`/organizations/${id}`);
  }

  // Admin endpoints
  async getPendingApprovals(): Promise<User[]> {
    return this.request('/admin/pending-approvals');
  }

  async approveUser(userId: number): Promise<User> {
    return this.request(`/admin/users/${userId}/approve`, {
      method: 'POST',
    });
  }

  async rejectUser(userId: number): Promise<User> {
    return this.request(`/admin/users/${userId}/reject`, {
      method: 'POST',
    });
  }

  async getPendingEvents(): Promise<Event[]> {
    return this.request('/admin/pending-events');
  }

  async approveEvent(eventId: number): Promise<Event> {
    return this.request(`/admin/events/${eventId}/approve`, {
      method: 'POST',
    });
  }

  async rejectEvent(eventId: number): Promise<Event> {
    return this.request(`/admin/events/${eventId}/reject`, {
      method: 'POST',
    });
  }

  // Analytics endpoints
  async getEventAnalytics(eventId: number): Promise<{
    totalTickets: number;
    redeemedTickets: number;
    attendanceRate: number;
    revenue?: number;
  }> {
    return this.request(`/analytics/events/${eventId}`);
  }

  async getPlatformAnalytics(): Promise<{
    totalEvents: number;
    totalUsers: number;
    totalTickets: number;
    activeOrganizations: number;
  }> {
    return this.request('/analytics/platform');
  }

  // Export endpoints
  async exportEventAttendees(eventId: number): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/export/events/${eventId}/attendees`);
    return response.blob();
  }
}

export const apiService = new ApiService();
