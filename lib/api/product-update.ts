import axios from "axios";
import { useState } from "react";
import getValidToken from "@/app/utils/get-valid-token";

const useProductUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const productUpdate = async (productData: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getValidToken();
            const response = await axios.put("/api/products", productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            return response.data;
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Failed to upload product");
            setLoading(false);
        }
    };

    return { productUpdate, loading, error };
};

export default useProductUpdate;
