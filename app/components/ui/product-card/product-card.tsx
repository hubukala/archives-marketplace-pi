import { useRouter } from "next/navigation";
import { ProductCardWrapper } from "./style";
import { Thumbnail } from "../thumbnail/style";

const ProductCard = (props: any) => {
    const router = useRouter();
    const OpenProductPage = (id: string) => {
        router.push(`/shop/${id}`);
    };
    return (
        <ProductCardWrapper onClick={() => OpenProductPage(props.id)}>
            <Thumbnail src={props.image} alt="image" width={200} height={200}/>
            <br />
            {props.title}
            <br />
            {props.size}
            <br />$ {props.price}
            <br />
        </ProductCardWrapper>
    );
};

export default ProductCard;