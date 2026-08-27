import React from "react";
import Image from "next/image";
import { CtaContactCardFields } from "@/types/cms";
import { Mail } from "lucide-react";

interface CtaContactCardProps {
  fields: CtaContactCardFields;
}

export function CtaContactCard({ fields }: CtaContactCardProps) {
  const heading = fields?.heading || "Have Any Question?";
  const description =
    fields?.description ||
    "Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.";
  const phone = fields?.phone || "+62 6943 6956";
  const email = fields?.email || "contact@domain.com";

  return (
    <div className="rounded-2xl p-8 text-white shadow-lg bg-black space-y-6 font-poppins">
      <h3 className="font-bold text-2xl text-white">
        {heading}
      </h3>
      <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
        {description}
      </p>

      <div className="pt-2 space-y-3 text-xs sm:text-sm">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
        >
          <div className="relative w-4 h-4 shrink-0">
            <Image src="/images/call.svg" alt="Call" fill className="brightness-0 invert object-contain" />
          </div>
          <span className="font-medium">{phone}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
        >
          <Mail className="w-4 h-4 shrink-0" />
          <span className="font-medium">{email}</span>
        </a>
      </div>
    </div>
  );
}
