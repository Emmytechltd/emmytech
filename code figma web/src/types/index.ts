export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  specifications: Record<string, string>;
  stock: number;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  dealOfWeek?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  icon: string;
  size?: "large" | "medium" | "small";
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
  price?: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
  avatarColor: string;
  date: string;
  product?: string;
}
