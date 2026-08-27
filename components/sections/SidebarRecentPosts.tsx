import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarRecentPostsFields } from "@/types/cms";

interface SidebarRecentPostsProps {
  fields: SidebarRecentPostsFields;
}

const defaultPosts = [
  {
    thumbnail: "/images/home-img-2.png",
    title: "Travel Stories for Now and the Future",
    date: "14 Dec 2022",
    url: "/blog",
  },
  {
    thumbnail: "/images/home-img-1.png",
    title: "9 Popular Travel Destintion on Sale in 2022",
    date: "14 Dec 2022",
    url: "/blog",
  },
  {
    thumbnail: "/images/home-img-3.png",
    title: "How Are We Going to Travel in 2022?",
    date: "14 Dec 2022",
    url: "/blog",
  },
];

export function SidebarRecentPosts({ fields }: SidebarRecentPostsProps) {
  const recentPosts =
    fields?.items && fields.items.length > 0 ? fields.items : defaultPosts;
  const heading = fields?.heading || "Recent Post";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="font-poppins font-bold text-xl text-black">
        {heading}
      </h3>
      <div className="space-y-4">
        {recentPosts.map((post: any, idx: number) => (
          <Link
            key={idx}
            href={post.url || "/blog"}
            className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
              <Image
                src={post.thumbnail || "/images/home-img-2.png"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-poppins text-xs sm:text-sm font-semibold text-black group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <span className="text-[11px] text-[#6c6c6c] font-poppins block">
                {post.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
