
export interface Product {
    productItemId: string;
    productId: string;
    image: string;
    colorId: string;
    color: string;
    sizeId: string;
    size: string;
    price: number;
    quantity: number;
}

export interface Brand {
    brand_id: string;
    brand: string;
}

export interface Color {
    color_id: string;
    color: string;
}

export interface Size {
    size_id: string;
    size: string;
}

export interface ProductLine {
    id: string;
    imageProduct: string;
    name: string;
    brandId: string;
    brand: string;
    gender: string;  
    createdAt: string;
    updatedAt: string;
    sold: number;
}

export interface ProductWithDetail extends ProductLine {
    productItem: Product[];
}

