import React from "react";
import { ContactInfoGridFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Building } from "lucide-react";

interface ContactInfoGridProps {
  fields: ContactInfoGridFields;
}

export function ContactInfoGrid({ fields }: ContactInfoGridProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#fafafa]">
      <Container size="content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fields.items.map((item, idx) => (
            <Card
              key={idx}
              className="p-6 space-y-4 border border-gray-100 hover:border-orange-500/40 group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <Building className="w-6 h-6" />
              </div>

              {item.title && (
                <h3 className="font-poppins font-semibold text-lg text-rebel-black">
                  {item.title}
                </h3>
              )}

              <div className="space-y-3 font-poppins text-xs sm:text-sm text-rebel-gray-body pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{item.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href={`tel:${item.phone}`} className="hover:text-orange-600 transition-colors">
                    {item.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href={`mailto:${item.email}`} className="hover:text-orange-600 transition-colors">
                    {item.email}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
