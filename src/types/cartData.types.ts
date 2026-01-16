export type TCartData = {
  _id: string;
  title: string;
  category?: string;
  image?: string;
  basePrice?: number;
  discountedPrice: number;
  courseType : string
}