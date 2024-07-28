import { useRouter } from "next/navigation";
import { SideBarWrapper, SideBarButton } from "./style";

type SideBarProps = {
    sideBarItems: Array<Record<string, string | undefined>>;
    category: string | undefined;
    setCategory: any;
};

const SideBar = ({ sideBarItems, category, setCategory }: SideBarProps) => {
    const router = useRouter();

    return (
        <SideBarWrapper>
            {sideBarItems?.map((item) => (
                <SideBarButton
                    style={{
                        color:
                            item.category === category ||
                            (item.category === undefined &&
                                item.label !== "all")
                                ? "blue"
                                : "black",
                    }}
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
