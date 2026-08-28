"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Check, Loader2, User } from "lucide-react";

interface CommentItem {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface BlogCommentsSectionProps {
  postSlug: string;
  postTitle: string;
}

export function BlogCommentsSection({ postSlug, postTitle }: BlogCommentsSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          postTitle,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setSubmitted(true);
        setFormData({ name: "", email: "", comment: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Comment submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-12 space-y-10 font-poppins border-t border-gray-100">
      {/* Header with Comments Count */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl text-black flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-orange-500" />
          <span>Comments ({comments.length})</span>
        </h3>
      </div>

      {/* Existing Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-6 text-xs text-gray-400 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
            <span>Loading discussion...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center text-xs text-gray-400">
            Be the first to share your thoughts on this story!
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    {c.name ? c.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black">{c.name}</h4>
                    <span className="text-[11px] text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed pl-1">
                {c.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Leave a Comment Form */}
      <div className="p-7 sm:p-8 bg-[#fafafa] rounded-3xl border border-gray-200/80 space-y-5">
        <div className="space-y-1">
          <h4 className="font-bold text-xl text-black">Leave a Comment</h4>
          <p className="text-xs text-gray-500">
            Your email address will not be published. Required fields are marked *
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2 text-xs font-semibold border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your comment has been posted successfully.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:border-black font-poppins"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:border-black font-poppins"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Comment *
              </label>
              <textarea
                rows={4}
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Write your thoughts or travel experience..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:border-black font-poppins resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 btn-slide btn-shine text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Comment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
