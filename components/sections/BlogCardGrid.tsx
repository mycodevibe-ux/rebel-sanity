import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardGridFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, ArrowRight, Tag } from "lucide-react";

interface BlogCardGridProps {
  fields: BlogCardGridFields;
}

export function BlogCardGrid({ fields }: BlogCardGridProps) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="content">
        <SectionHeading
          title={fields.heading}
          subtitle={fields.subheading}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {fields.items.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col justify-between group overflow-hidden border border-gray-100"
            >
              <div>
                {/* Thumbnail with category pill */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-rebel-black/80 backdrop-blur-md text-white text-xs font-poppins font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <Tag className="w-3 h-3 text-orange-400" />
                    <span>{post.category_label}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-rebel-gray-body font-poppins">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{post.published_date}</span>
                  </div>

                  <h3 className="font-poppins font-semibold text-lg sm:text-xl text-rebel-black group-hover:text-orange-600 transition-colors line-clamp-2">
                    <Link href={post.read_more_url}>{post.title}</Link>
                  </h3>

                  <p className="font-poppins text-xs sm:text-sm text-rebel-gray-body leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-6 pt-0">
                <Link
                  href={post.read_more_url}
                  className="inline-flex items-center gap-2 font-poppins text-xs sm:text-sm font-semibold text-rebel-black group-hover:text-orange-600 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Optional CTA */}
        {fields.cta_label && fields.cta_url && (
          <div className="text-center mt-12">
            <Button href={fields.cta_url} size="md" variant="outline">
              {fields.cta_label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
