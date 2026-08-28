export interface ContactLead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  createdAt: string;
}

export interface NewsletterLead {
  id: string;
  email: string;
  createdAt: string;
}

export interface BookingLead {
  id: string;
  packageName: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  specialRequests?: string;
  createdAt: string;
}

// Global server in-memory store (persists across warm serverless invocations)
declare global {
  var __leadsStore: {
    contacts: ContactLead[];
    newsletters: NewsletterLead[];
    bookings: BookingLead[];
  } | undefined;
}

if (!global.__leadsStore) {
  global.__leadsStore = {
    contacts: [
      {
        id: "msg-1",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        subject: "Swiss Alps Package Inquiry",
        phone: "+91 98765 43210",
        message: "Hi, I am planning a 5-day trip to Switzerland next month for 2 adults. Please share the complete package itinerary and best pricing.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    newsletters: [
      {
        id: "news-1",
        email: "traveler@example.com",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    bookings: [
      {
        id: "book-1",
        packageName: "Paris - City of Lights & Romance",
        name: "Pooja Patil",
        email: "pooja.patil@example.com",
        phone: "+91 91234 56789",
        guests: "2",
        specialRequests: "Need vegetarian food options and airport pickup.",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
    ],
  };
}

export const leadsStore = global.__leadsStore;
