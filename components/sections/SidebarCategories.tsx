import React from "react";
import Link from "next/link";
import { SidebarCategoriesFields } from "@/types/cms";
import { ArrowRight } from "lucide-react";

interface SidebarCategoriesProps {
  fields: SidebarCategoriesFields;
}

const defaultCategories = [
  { label: "All Categories", url: "/blog" },
  { label: "Stories", url: "/blog?category=Stories" },
  { label: "Tips", url: "/blog?category=Tips" },
  { label: "Travel Deals", url: "/blog?category=Travel+Deals" },
  { label: "Eco Travel", url: "/blog?category=Eco+Travel" },
  { label: "Adventure", url: "/blog?category=Adventure" },
  { label: "Destination", url: "/blog?category=Destination" },
];

export function SidebarCategories({ fields }: SidebarCategoriesProps) {
  const categories =
    fields?.items && fields.items.length > 0 ? fields.items : defaultCategories;
  const heading = fields?.heading || "Categories";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="font-poppins font-bold text-xl text-black pb-2">
        {heading}
      </h3>
      <ul className="space-y-3 font-poppins text-xs sm:text-sm">
        {categories.map((cat: any, idx: number) => {
          const href = cat.url || `/blog?category=${encodeURIComponent(cat.label)}`;
          return (
            <li key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <Link
                href={href}
                className="flex items-center justify-between text-[#555555] hover:text-orange-600 transition-colors group"
              >
                <span className="font-medium">{cat.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
