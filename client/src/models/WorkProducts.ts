import {ProductInfo} from './ProductInfo';

export interface WorkProducts {
  work_id: number;
  product_id: number;
  status: string;
  productInfo?: ProductInfo;
  order_number?: number; // Adding the order_number to the WorkProducts model
}
