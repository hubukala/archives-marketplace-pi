import useSWR from "swr";
import axios from "axios";
import { ProductType } from "@/types/Product";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data.products;
};

const useProducts = (category?: string) => {
    const queryString = category ? `?category=${category}` : "";
    const { data, error } = useSWR(`/api/products${queryString}`, fetcher);

    return {
        products: data as ProductType[] | undefined,
        isLoading: !error && !data,
        isError: error,
    };
};

export default useProducts;
