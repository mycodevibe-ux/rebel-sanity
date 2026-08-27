import { redirect } from "next/navigation";

interface DestinationRedirectProps {
  params: {
    slug: string;
  };
}

export default function DestinationRedirect({ params }: DestinationRedirectProps) {
  redirect(`/packages/${params.slug}`);
}
