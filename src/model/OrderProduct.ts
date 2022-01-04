import { OrderWithDetail } from "./Order";
import { Product } from "./Product";
import { User } from "./User";

export interface OrderProduct {
    id: string;
    orderId: string;
    idProduct: string;
    quantity: number;
    price: number;
    product?: Product;
    user?: User;
}