import { FaExclamation } from "react-icons/fa";
import { Message, WarningWrapper } from "./style";

type WarningPropsType = {
    message: string;
};

const Warning = ({ message }: WarningPropsType) => {
    return (
        <WarningWrapper>
            <FaExclamation color="red" size={30} />
            <Message>{message}</Message>
        </WarningWrapper>
    );
};

export default Warning;
