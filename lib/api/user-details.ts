import axios from "axios";
import { auth } from "@/lib/firebase/config";
import useSWR, { mutate } from "swr";
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

const updater = async (url: string, data: any) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("User not authenticated");
    }
    const token = await getValidToken();
    await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
};

export const useUserDetails = () => {
    const { data, error } = useSWR("/api/user/details", fetcher);
    return {
        userDetails: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
        updater,
    };
};
