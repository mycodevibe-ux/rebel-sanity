"use client";

import React, { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

interface PackageBookingFormProps {
  packageName: string;
}

export function PackageBookingForm({ packageName }: PackageBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, packageName }),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", guests: "2", specialRequests: "" });
      setTimeout(() => setSubmitted(false), 9000);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 bg-emerald-50 text-emerald-950 rounded-3xl border border-emerald-200 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300 font-poppins">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-bold text-2xl text-emerald-950">
          Booking Request Received!
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
          Thank you for choosing <strong>{packageName}</strong>. Our senior travel consultant will confirm availability and send your itinerary within 2 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-bold text-emerald-700 hover:underline inline-block"
        >
          Book for another date
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-10 bg-white rounded-3xl border border-gray-200 shadow-lg space-y-6 font-poppins">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-orange-500 tracking-wider">
          Instant Reservation
        </span>
        <h3 className="font-bold text-2xl sm:text-3xl text-black">
          Book This Tour Package
        </h3>
        <p className="text-xs sm:text-sm text-[#777777]">
          Fill in your travel dates and requirements. Our senior travel consultant will confirm availability within 2 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <div>
          <label className="block text-xs font-semibold text-black mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="e.g. john@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1.5">
            Number of Guests
          </label>
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-black mb-1.5">
            Special Requests / Notes
          </label>
          <textarea
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Tell us any dietary requirements, extra nights, or custom requests..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black resize-none"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 btn-slide btn-shine text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Booking...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Booking Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
