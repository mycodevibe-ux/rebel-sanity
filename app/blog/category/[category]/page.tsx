import { redirect } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function BlogCategoryRedirect({ params }: CategoryPageProps) {
  redirect(`/blog?category=${encodeURIComponent(params.category)}`);
}
