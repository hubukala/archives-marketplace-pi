import ProductCard from "../product-card/product-card";
import { ProductType } from "@/types/Product";

type ProductsListProps = {
    arr: Array<ProductType>;
    message?: string;
};

const ProductsList = ({ arr, message }: ProductsListProps) => {
    return (
        <>
            {arr?.length < 1 ? (
                <p>{message && message}</p>
            ) : (
                arr?.map((item: ProductType) => (
                    <ProductCard
                        key={item?.id}
                        image={item?.image}
                        title={item?.title}
                        size={item?.size}
                        price={item?.price}
                        id={item?.id}
                        category={item?.category}
                    />
                ))
            )}
        </>
    );
};

export default ProductsList;
