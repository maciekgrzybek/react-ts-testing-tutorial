export interface ProductType {
  id: string;
  name: string;
  color: string;
  price: number;
  promoAvailable?: boolean;
  image: string;
  quantity: number;
}

export interface PromoCode {
  name: string;
  discount: number;
}
