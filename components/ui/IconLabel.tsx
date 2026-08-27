import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  User,
  Tag,
  Clock,
  Send,
  Check,
  Plane,
  Bed,
  Compass,
  Shield,
  Award,
  Globe,
  Smile,
  Target,
  Eye,
  Users,
  Quote,
  Search,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ICONS_MAP: Record<string, React.ElementType> = {
  "map-pin": MapPin,
  location: MapPin,
  phone: Phone,
  mail: Mail,
  email: Mail,
  calendar: Calendar,
  date: Calendar,
  user: User,
  people: User,
  users: Users,
  tag: Tag,
  clock: Clock,
  send: Send,
  check: Check,
  plane: Plane,
  flight: Plane,
  hotel: Bed,
  bed: Bed,
  compass: Compass,
  guide: Compass,
  shield: Shield,
  award: Award,
  globe: Globe,
  smile: Smile,
  target: Target,
  eye: Eye,
  quote: Quote,
  search: Search,
  chevron: ChevronDown,
  "arrow-right": ArrowRight,
  menu: Menu,
  close: X,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

interface IconLabelProps {
  icon: string | React.ElementType;
  label: React.ReactNode;
  iconClassName?: string;
  labelClassName?: string;
  className?: string;
}

export function IconLabel({
  icon,
  label,
  iconClassName,
  labelClassName,
  className,
}: IconLabelProps) {
  let IconComponent: React.ElementType = MapPin;

  if (typeof icon === "string") {
    IconComponent = ICONS_MAP[icon.toLowerCase()] || MapPin;
  } else {
    IconComponent = icon;
  }

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <IconComponent className={cn("w-4 h-4 shrink-0 text-rebel-gray-dark", iconClassName)} />
      <span className={cn("font-poppins text-sm text-rebel-gray-dark", labelClassName)}>
        {label}
      </span>
    </div>
  );
}
