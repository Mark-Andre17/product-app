import React, { FC, memo } from "react";
import { useAppSelector } from "../hooks/appHooks";
import ProductCard from './ProductCard';
import "../assets/styles/productList.css"

type ProductListProps = {
    currentCategory: string
}

const ProductList: FC<ProductListProps> = ({ currentCategory }) => {
    const products = useAppSelector(state => state.products)

    const filterProducts = products.products.filter((item) => {
        return currentCategory !== 'all' ?  item.category === currentCategory : products
    })
    
    const product: JSX.Element[] = filterProducts.map((item) => {return <ProductCard key={item.id} product={item}/>})

    return(
        <div className="product__list">
            {product}
        </div>

    )
}

export default memo(ProductList);