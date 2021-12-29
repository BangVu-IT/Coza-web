import { Cart } from "./Cart";
import { Order } from "./Order";


export interface Buyer {
    id: string;
    order: Order[];
    cart: Cart;
}
