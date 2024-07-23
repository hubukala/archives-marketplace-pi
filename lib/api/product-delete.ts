import axios from "axios";
import { useState } from "react";
import getValidToken from "@/app/utils/get-valid-token";

const useProductDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const productDelete = async (productId: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getValidToken();
            const response = await axios.delete("/api/product", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: { productId },
            });

            setLoading(false);
            return response.data;
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Failed to upload product");
            setLoading(false);
        }
    };

    return { productDelete, loading, error };
};

export default useProductDelete;
