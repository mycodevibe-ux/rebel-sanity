import React from "react";
import Link from "next/link";
import { SidebarCategoriesFields } from "@/types/cms";
import { ArrowRight } from "lucide-react";

interface SidebarCategoriesProps {
  fields: SidebarCategoriesFields;
}

export function SidebarCategories({ fields }: SidebarCategoriesProps) {
  const categories = [
    { label: "Travel", url: "/blog" },
    { label: "Tips", url: "/blog" },
    { label: "Stories", url: "/blog" },
    { label: "Destination", url: "/blog" },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="font-poppins font-bold text-xl text-black pb-2">
        Catagories
      </h3>
      <ul className="space-y-3 font-poppins text-xs sm:text-sm">
        {categories.map((cat, idx) => (
          <li key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <Link
              href={cat.url}
              className="flex items-center gap-3 text-[#555555] hover:text-black transition-colors group"
            >
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">{cat.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
