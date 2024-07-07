import useSWR from "swr";
import axios from "axios";
import { ProductType } from "@/types/Product";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data.product[0];
};

const useProduct = (productId?: string) => {
    const queryString = productId ? `?product_id=${productId}` : "";
    const { data, error } = useSWR(`/api/product${queryString}`, fetcher);

    return {
        product: data as ProductType | undefined,
        isLoading: !error && !data,
        isError: error,
    };
};

export default useProduct;
