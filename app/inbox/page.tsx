"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  Mail,
  Calendar,
  Phone,
  User,
  Users,
  Search,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Inbox,
  Send,
} from "lucide-react";

export default function AdminInboxPage() {
  const [activeTab, setActiveTab] = useState<"contacts" | "bookings" | "newsletters">("contacts");
  const [contacts, setContacts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, bRes, nRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/booking"),
        fetch("/api/newsletter"),
      ]);

      const cData = await cRes.json();
      const bData = await bRes.json();
      const nData = await nRes.json();

      if (cData.contacts) setContacts(cData.contacts);
      if (bData.bookings) setBookings(bData.bookings);
      if (nData.subscribers) setNewsletters(nData.subscribers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(
    (b) =>
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.packageName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNewsletters = newsletters.filter((n) =>
    n.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-32 pb-24 font-poppins text-black">
      <Container size="content" className="px-4 sm:px-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                href="/"
                className="text-xs text-gray-500 hover:text-black flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Site</span>
              </Link>
              <span className="text-xs bg-black text-white px-2.5 py-0.5 rounded-full font-semibold">
                Live Admin Dashboard
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Customer Leads &amp; Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              View all messages received from Contact Form, Tour Bookings, and Newsletter.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="px-5 py-2.5 bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-500" : ""}`} />
            <span>Refresh Inbox</span>
          </button>
        </div>

        {/* Tab Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-sm mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("contacts")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "contacts"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Messages</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === "contacts" ? "bg-white/20 text-white" : "bg-gray-100 text-black font-semibold"}`}>
                {contacts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "bookings"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Tour Bookings</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === "bookings" ? "bg-white/20 text-white" : "bg-gray-100 text-black font-semibold"}`}>
                {bookings.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("newsletters")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "newsletters"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Subscribers</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === "newsletters" ? "bg-white/20 text-white" : "bg-gray-100 text-black font-semibold"}`}>
                {newsletters.length}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black font-poppins"
            />
          </div>
        </div>

        {/* Content Lists */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {filteredContacts.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center space-y-2">
                <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="font-bold text-gray-700 text-base">No contact messages yet</h3>
                <p className="text-xs text-gray-400">Submissions from the /contact page will appear here instantly.</p>
              </div>
            ) : (
              filteredContacts.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {c.name ? c.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-black">{c.name}</h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span>{c.email}</span>
                          {c.phone && c.phone !== "Not provided" && (
                            <>
                              <span>•</span>
                              <span>{c.phone}</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 self-start sm:self-auto">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-orange-600 block mb-1">
                      Subject: {c.subject}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                      {c.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center space-y-2">
                <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="font-bold text-gray-700 text-base">No tour bookings yet</h3>
                <p className="text-xs text-gray-400">Bookings from /packages/[slug] will appear here.</p>
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div>
                      <span className="text-xs uppercase font-bold text-orange-500">
                        {b.packageName}
                      </span>
                      <h3 className="font-bold text-base text-black mt-0.5">{b.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                        <span>✉ {b.email}</span>
                        <span>•</span>
                        <span>📞 {b.phone}</span>
                        <span>•</span>
                        <span>👥 {b.guests} Guests</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100 self-start sm:self-auto">
                      {new Date(b.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {b.specialRequests && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-700">
                      <strong>Special Notes:</strong> {b.specialRequests}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "newsletters" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-black">Newsletter Subscriber List</h3>
              <span className="text-xs text-gray-500">{filteredNewsletters.length} Total</span>
            </div>
            {filteredNewsletters.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No subscribers yet.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNewsletters.map((n, idx) => (
                  <div key={n.id || idx} className="p-4 px-6 flex items-center justify-between text-xs hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold text-black">{n.email}</span>
                    </div>
                    <span className="text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
