// types/cart.ts
import { IProduct } from "./product";

export interface ICartItem {
  product: IProduct;
  selectedSize: string;
  quantity: number;
}
