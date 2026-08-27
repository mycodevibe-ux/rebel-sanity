import React from "react";
import Image from "next/image";

export function AirplaneBanner() {
  return (
    <section className="relative w-full h-[680px] min-h-[680px] overflow-hidden bg-sky-100">
      <Image
        src="/images/airoplain.png"
        alt="Commercial aircraft flying across world landmarks"
        fill
        priority
        className="object-cover object-center"
      />
    </section>
  );
}
