import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

type NotifyProps = {
    type: "success" | "error";
    message: string;
};

export const notify = ({ type, message }: NotifyProps) => {
    switch (type) {
        case "error":
            toast.error(message, {
                position: "top-left",
            });
            break;
        case "success":
            toast.success(message, {
                position: "top-center",
            });
            break;
    }
};

export const ToastNotification = () => {
    return (
        <>
            <ToastContainer autoClose={5000} />
        </>
    );
};
