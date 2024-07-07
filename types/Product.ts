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
    buyer_id?: string;
    available?: boolean;
}
