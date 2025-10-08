export interface ProductImage { id: number; imageUrl: string; }
export interface Product {
  id: number;
  name: string;
  description?: string;
  size?: string;
  color?: string;
  pricePerDay?: number;
  priceForSale?: number;
  available?: boolean;
  images?: ProductImage[];
}
