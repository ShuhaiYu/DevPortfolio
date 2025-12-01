import {
  Layout,
  Server,
  Zap,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Shield,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Server,
  Zap,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Shield,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent size={size} className={className} />;
}
