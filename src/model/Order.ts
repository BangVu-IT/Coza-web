import { OrderProduct } from "./OrderProduct";

export default interface Order {
    id: string;
    userId: string;
    createdAt: string;
    isTemporary: boolean;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postCode: string;
    orderStatus: string;
}
export interface OrderWithDetail extends Order {
    orderProducts: OrderProduct[];    
}