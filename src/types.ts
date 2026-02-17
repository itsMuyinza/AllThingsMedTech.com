export interface NavItem {
  label: string;
  href: string;
  subItems?: string[];
}

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  isFeatured?: boolean;
}

export interface PodcastEpisode {
  id: number;
  title: string;
  guest: string;
  role: string;
  duration: string;
  imageUrl: string;
}

export interface SupplierCategory {
  name: string;
  iconName: string;
  count: number;
}

export interface Company {
  id: number;
  name: string;
  tagline: string;
  description: string;
  location: string;
  logoUrl: string;
  website?: string;
  isVerified: boolean;
  categories: string[];
  certifications: string[];
  foundedYear?: number;
}
