/** Hình minh hoạ: cặp màu gradient + emoji. Thay bằng ảnh thật khi có. */
export interface Art {
  from: string;
  to: string;
  emoji: string;
  /** Chú thích ảnh thật cần chụp — ghi chú cho team nội dung. */
  realPhotoNote?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // VND
  art: Art;
  category: 'gio' | 'phu-kien';
  maker: string;
  region: string;
  short: string;
  description: string;
  materials: string[];
  size: string;
  stock: number;
  featured?: boolean;
  storySlug?: string;
}

export interface Story {
  id: string;
  slug: string;
  kind: 'artisan' | 'school';
  title: string;
  person: string;
  location: string;
  excerpt: string;
  body: string[];
  art: Art;
}

export interface ImpactStat {
  key: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  emoji: string;
}

export interface Allocation {
  label: string;
  amount: number;
  color: string;
}

export interface Report {
  id: string;
  period: string;
  title: string;
  summary: string;
  totalRaised: number;
  allocations: Allocation[];
  invoiceLabel: string;
}

export interface UpcomingProject {
  id: string;
  title: string;
  startDate: string; // ISO
  note: string;
  art: Art;
}
