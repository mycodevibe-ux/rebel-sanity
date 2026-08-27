export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SEOData {
  title: string;
  description?: string;
  ogImage?: string;
  keywords?: string[];
}
