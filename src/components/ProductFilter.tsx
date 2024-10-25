import React, { FC, memo, useMemo } from "react";
import "../assets/styles/productFilter.css";

type ProductFilterProps = {
    filterList: string[],
    handleFilter: (category: string) => void
}

const ProductFilter: FC<ProductFilterProps> = ({ filterList, handleFilter }) => {
    const productFilters = useMemo(() => {
        return filterList.map((item) => (
            <li key={item} className="product__filter">
                        <button 
                        onClick={() => {handleFilter(item)}} className="product__filter-btn">
                            {item}
                        </button>
                    </li>
        ))

    }, [filterList, handleFilter]) 

    return (
        <ul className="product__filters">
            {productFilters}
        </ul>
    )
}

export default memo(ProductFilter);