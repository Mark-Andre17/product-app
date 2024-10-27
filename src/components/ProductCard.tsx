import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { IProduct } from "../models/product.model";
import Description from "./Description";
import "../assets/styles/productCard.css";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";
import { iCart } from "../models/cart.model";
import { AddProductToCart, UpdateProductInCart } from "../store/reducers/cartSLice";
import { deleteProducts } from "../actions/deleteProduct";

type ProductCardProps = {
    product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart)
    const handleAddToCart = useCallback(() => {
        const currentIndex = cart.cart.findIndex(item => item.title === product.title)
        if (currentIndex !== -1) {
            const updateCart = {
                ...cart.cart[currentIndex],
                count: cart.cart[currentIndex].count + 1,
                price: cart.cart[currentIndex].price + product.price
            };
            dispatch(UpdateProductInCart(updateCart));
        }else{
            const productToCart: iCart = {
                count: 1,
                title: product.title,
                price: product.price,
            };
            dispatch(AddProductToCart(productToCart));
        }
    }, [dispatch, product.title, product.price, cart]);

    const handleDelete = (id: number) => {
        if(id){
            dispatch(deleteProducts(id));
        }
        
    };
    return (
        <div className="product__card">
            <img src={product.image} alt={product.title}/>
            <div className="product__info">
                <h2 className="product__info-title">{product.title}</h2>
                <Description description={product.description}/>
                <p className="product__info-price">{product.price}$</p>
                <button onClick={handleAddToCart} className="product__info-btn">В корзину</button>
                <button onClick={() => handleDelete(product.id)} className="product__info-btn">Удалить</button>
            </div>
        </div>
    )
}

export default memo(ProductCard);