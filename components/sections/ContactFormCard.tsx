"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContactFormCardFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Check, Loader2, Send } from "lucide-react";

interface ContactFormCardProps {
  fields: ContactFormCardFields;
}

const defaultOffices = [
  {
    city: "Lhoksemawe, Aceh",
    phone: "+62 6943 6956",
    email: "contact@domain.com",
    address: "Jl. Darussalam Hagu selatan",
  },
  {
    city: "Bali Branch Office",
    phone: "+62 6943 6957",
    email: "bali@domain.com",
    address: "Jl. Sunset Road, Seminyak",
  },
  {
    city: "Jakarta Headquarters",
    phone: "+62 6943 6958",
    email: "jakarta@domain.com",
    address: "Jl. Sudirman Kav 28",
  },
  {
    city: "Singapore Liaison",
    phone: "+65 6843 6959",
    email: "singapore@domain.com",
    address: "Marina Bay Financial Centre",
  },
];

export function ContactFormCard({ fields }: ContactFormCardProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const formHeading = fields?.form_heading || "Get In Touch";
  const formSubheading =
    (fields as any)?.form_subheading ||
    "Have questions about custom itineraries, luxury stays, or group bookings? Send us a message and our team will assist you.";
  const submitLabel = fields?.submit_label || "Send Message";
  const officesList =
    (fields as any)?.offices && (fields as any).offices.length > 0
      ? (fields as any).offices
      : defaultOffices;

  return (
    <section className="py-20 sm:py-28 bg-white font-poppins">
      <Container size="content" className="px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Floating White Form Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100">
            {submitted ? (
              <div className="p-8 bg-emerald-50 text-emerald-900 rounded-2xl flex flex-col items-center text-center gap-3 border border-emerald-200 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-xl text-emerald-950">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-2 leading-relaxed">
                    Thank you for reaching out to Rebel Rover. Our travel concierge will get back to you within a few hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-emerald-700 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-5 py-3.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-5 py-3.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Subject / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiring about Swiss Alps Tour"
                    className="w-full px-5 py-3.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your vacation plan, dates, and preferred destinations..."
                    className="w-full px-5 py-3.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all font-poppins resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 btn-slide btn-shine text-white font-poppins font-bold text-sm sm:text-base rounded-full shadow-lg flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{submitLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Get In Touch & 2x2 Office Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-black mb-3 tracking-tight">
                {formHeading}
              </h2>
              <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xl font-normal">
                {formSubheading}
              </p>
            </div>

            {/* 2x2 Office Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {officesList.map((office: any, idx: number) => (
                <div key={idx} className="space-y-3 font-poppins p-5 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-gray-200 transition-colors">
                  <h3 className="font-bold text-base text-black">
                    {office.city}
                  </h3>
                  <div className="space-y-2.5 text-xs text-[#555555]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-4 h-4 shrink-0">
                        <Image src="/images/call.svg" alt="Phone" fill className="object-contain" />
                      </div>
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-black font-bold">✉</span>
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="relative w-4 h-5 shrink-0 mt-0.5">
                        <Image src="/images/location.svg" alt="Location" fill className="object-contain" />
                      </div>
                      <span>{office.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
