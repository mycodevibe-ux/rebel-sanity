"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  X,
  Send,
  CheckCircle2,
  Clock,
  MessageCircle,
  Headphones,
  Loader2,
  Phone,
} from "lucide-react";

interface ExpertConsultationModalProps {
  packageName: string;
  location?: string;
  price?: string;
  duration?: string;
}

export function ExpertConsultationModal({
  packageName,
  location,
  price,
  duration,
}: ExpertConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    callTime: "As soon as possible (Within 15 mins)",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || "callback-request@rebelrover.com",
          phone: formData.phone,
          subject: `🎧 Expert Callback Request: ${packageName}`,
          message: `Requested Callback for ${packageName} (${location || "Tour"}). Preferred Time: ${formData.callTime}. Notes: ${formData.notes || "None"}`,
        }),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          callTime: "As soon as possible (Within 15 mins)",
          notes: "",
        });
      }, 5000);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Rebel Rover! I am interested in the "${packageName}" tour package. Please share itinerary details and available dates.`
  );

  return (
    <>
      {/* Trigger Button inside sidebar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3.5 btn-slide btn-shine text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 text-center transition-transform active:scale-95"
      >
        <PhoneCall className="w-4 h-4" />
        <span>Talk to Destination Expert</span>
      </button>

      {/* Modal Popup Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-poppins">
          {/* Click outside backdrop layer */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card Content */}
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Specialist Icon */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500 block">
                  Free Travel Consultation
                </span>
                <h3 className="font-bold text-xl sm:text-2xl text-black leading-snug">
                  Speak with a Specialist
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Get personalized advice, customized itineraries, and best group deals for{" "}
                  <strong className="text-black">{packageName}</strong>.
                </p>
              </div>
            </div>

            {/* Instant Contact Options (Hotline & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href="tel:+6269436956"
                className="p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-3 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Direct Hotline
                  </span>
                  <span className="text-xs font-bold text-black truncate block">
                    +62 6943 6956
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/6269436956?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 flex items-center gap-3 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                    WhatsApp Chat
                  </span>
                  <span className="text-xs font-bold text-emerald-950 truncate block">
                    Chat with Expert
                  </span>
                </div>
              </a>
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center mb-5">
              <div className="flex-grow border-t border-gray-100" />
              <span className="flex-shrink mx-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Or Request a Free Callback
              </span>
              <div className="flex-grow border-t border-gray-100" />
            </div>

            {/* Callback Form or Success State */}
            {submitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-950 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-emerald-950">
                  Callback Request Confirmed!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Our destination expert will call you at <strong>{formData.phone}</strong> around{" "}
                  <strong>{formData.callTime}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Callback Time
                  </label>
                  <select
                    value={formData.callTime}
                    onChange={(e) => setFormData({ ...formData, callTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins"
                  >
                    <option value="As soon as possible (Within 15 mins)">
                      ⚡ As soon as possible (Within 15 mins)
                    </option>
                    <option value="Morning (9:00 AM - 12:00 PM)">
                      🌅 Morning (9:00 AM - 12:00 PM)
                    </option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">
                      ☀️ Afternoon (2:00 PM - 5:00 PM)
                    </option>
                    <option value="Evening (6:00 PM - 9:00 PM)">
                      🌙 Evening (6:00 PM - 9:00 PM)
                    </option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 btn-slide btn-shine text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Instant Callback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
