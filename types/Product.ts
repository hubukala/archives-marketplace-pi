export interface ProductType {
    id: string;
    image: string[];
    title: string;
    size: string;
    price: string | number;
    category: string;
    condition: string;
    description: string;
    designer: string;
    user_id: string;
    seller_email: string;
    buyer_id?: string;
    buyer_email?: string;
    available?: boolean;
    color?: string;
    shipping_carrier?: string;
    shipping_price?: string;
    iban?: string;
    seller?: any;
    tracking_number?: string;
    paid?: boolean;
}
