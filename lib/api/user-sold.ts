import axios from "axios";
import useSWR from "swr";
import { auth } from "@/lib/firebase/config";
import getValidToken from "@/app/utils/get-valid-token";

const fetcher = async (url: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("User not authenticated");
    }
    const token = await getValidToken();
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    return response.data;
};

export const useUserSold = () => {
    const { data, error } = useSWR("/api/user/sold", fetcher);
    return {
        sold: data?.products,
        isLoading: !error && !data,
        isError: error,
    };
};
