import { useRouter } from "next/navigation";
import { SideBarWrapper, SideBarButton } from "./style";

type SideBarProps = {
    sideBarItems: Array<Record<string, string | undefined>>;
    setCategory: any;
};

const SideBar = ({ sideBarItems, setCategory }: SideBarProps) => {
    const router = useRouter();

    return (
        <SideBarWrapper>
            {sideBarItems?.map((item) => (
                <SideBarButton
                    key={item.label}
                    onClick={() => setCategory(item?.category)}
                >
                    {item?.label && item.label.toUpperCase()}
                </SideBarButton>
            ))}
        </SideBarWrapper>
    );
};

export default SideBar;
