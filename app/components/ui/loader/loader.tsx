import * as S from "./style";

type LoaderPropsType = {
    size?: "small" | "regular";
};

const Loader = ({ size = "regular" }: LoaderPropsType) => {
    return (
        <S.LoaderWrapper>
            {size === "regular" ? (
                <>
                    <S.LoaderRegular />
                    <p>Loading...</p>
                </>
            ) : (
                <S.LoaderSmall />
            )}
        </S.LoaderWrapper>
    );
};

export default Loader;
