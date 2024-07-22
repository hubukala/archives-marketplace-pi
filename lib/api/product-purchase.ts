import axios from "axios";
import { useState } from "react";
import getValidToken from "@/app/utils/get-valid-token";

type ProductDataType = {
    productId: string;
    purchaseDate: string;
};

const useProductPurchase = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const productPurchase = async (productData: ProductDataType) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getValidToken();
            const response = await axios.post(
                "/api/product-purchase",
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setLoading(false);
            return response.data;
        } catch (err) {
            console.error("Purchase failed:", err);
            setError("Failed to purchase the product");
            setLoading(false);
        }
    };

    return { productPurchase, loading, error };
};

export default useProductPurchase;
