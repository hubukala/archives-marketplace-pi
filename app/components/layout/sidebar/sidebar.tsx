import { useRouter } from "next/navigation";
import { SideBarWrapper, SideBarButton } from "./style";

type SideBarProps = {
    sideBarItems: Array<Record<string, string>>
}

const SideBar = ({sideBarItems}: SideBarProps) => {
    const router = useRouter()

    return (
        <SideBarWrapper>
            {sideBarItems?.map((item) => (
                <SideBarButton
                    key={item.label}
                    onClick={() => router.push(item.route)}
                >
                    {item.label.toUpperCase()}
                </SideBarButton>
            ))}
        </SideBarWrapper>
    );
};

export default SideBar;