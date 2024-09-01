import { ProductType } from "@/types/Product";

type FilterArrayProps = {
    cat: String;
    arr: Array<ProductType>;
};

function FilterArray({ cat, arr }: FilterArrayProps) {
    if (cat === "All") {
        return arr;
    } else if (cat !== "All") {
        const newArray = arr.filter((e) => e.category === cat);
        return newArray;
    }
}

export default FilterArray;
