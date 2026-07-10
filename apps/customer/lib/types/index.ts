export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
