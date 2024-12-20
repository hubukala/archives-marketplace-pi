import { ReactImageGalleryItem } from "react-image-gallery";
import { DocumentReference } from "firebase/firestore";
import { UserType } from "./User";

export interface ProductType {
    id?: string;
    images?: string[] | ReactImageGalleryItem[];
    title?: string;
    size?: string;
    price?: string | number;
    category?: string;
    condition?: string;
    description?: string;
    designer?: string;
    user_id?: string;
    seller_email?: string;
    buyer_id?: string;
    buyer_email?: string;
    available?: boolean;
    color?: string;
    shipping_carrier?: string;
    shipping_price?: string;
    iban?: string;
    seller?: DocumentReference<UserType>;
    tracking_number?: string;
    paid?: boolean;
}
