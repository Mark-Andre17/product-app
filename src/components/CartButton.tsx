import React, { FC } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../assets/styles/cartButton.css";
import { useAppSelector } from "../hooks/appHooks";

type CartButtonProps = {
    visibleCart: boolean,
    setVisibleCart: (visibleCart: boolean) => void
}

export const CartButton: FC<CartButtonProps> = ({ visibleCart, setVisibleCart }) => {
    const cart = useAppSelector(state => state.cart);
    const sumCount = cart.cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <button onClick={() => {setVisibleCart(!visibleCart)}} className="cart__btn" data-count={sumCount}>
            <ShoppingCartIcon fontSize="large"/>
        </button>
    )
}