"use client";

import React, { useState } from "react";
import { CommentFormFields } from "@/types/cms";
import { Check } from "lucide-react";

interface CommentFormProps {
  fields: CommentFormFields;
}

export function CommentForm({ fields }: CommentFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-white pt-12 mt-12 border-t border-gray-100 font-poppins">
      <h3 className="font-bold text-2xl text-black mb-2">
        Leave a Reply
      </h3>
      <p className="text-xs text-[#6c6c6c] mb-6">
        Your email address will not be published. Required fields are marked *
      </p>

      {submitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 text-xs sm:text-sm">
          <Check className="w-5 h-5 text-green-500 shrink-0" />
          <span>Thank you! Your comment has been posted successfully.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black mb-2">
              Comment
            </label>
            <textarea
              rows={6}
              required
              className="w-full p-4 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-2">
              Website
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="save-info"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black cursor-pointer"
            />
            <label
              htmlFor="save-info"
              className="text-xs text-[#6c6c6c] cursor-pointer"
            >
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-8 py-3.5 btn-slide btn-shine text-white font-bold text-xs sm:text-sm rounded-full shadow-md"
            >
              Post Comment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
