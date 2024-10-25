import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import '../assets/styles/cart.css';
import { ChangeCountInCart, RemoveProductFromCart } from "../store/reducers/cartSLice";
import { RootState } from "../store/store";

type CartProps = {
    visibleCart: boolean,
    setVisibleCart: (visibleCart: boolean) => void
}
export const Cart: FC<CartProps> = ({ visibleCart, setVisibleCart }) =>{
    const cart = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const totalPrice = cart.cart.reduce((acc,item) => acc + item.price, 0);

    const cartProducts = cart.cart.map((item) => {

        const handleDelete = () => {
            dispatch(RemoveProductFromCart(item))         
        }

        const handleChangeCount = () => {
            dispatch(ChangeCountInCart(item))
        }

        return (
            <li className="cart__item" key={item.price}>
                <p>{item.title}</p>
                <p>{item.count}</p>
                <p>{item.price} $</p>
                <button onClick={item.count > 1 ? handleChangeCount : handleDelete} className="delete__item"><DeleteIcon fontSize="large"/></button>
            </li>
        )
    })

    return (
        <div className="cart__block">
            <div className="cart__header">
                <h2>Корзина</h2>
                <button onClick={() => {setVisibleCart(!visibleCart)}}><CloseIcon /></button>
            </div>
            <ul className="cart__list">
                {cartProducts}
            </ul>
            <div className="cart__total">
                <p className="total">Total:</p>
                <p className="total">{(totalPrice).toFixed(2)} $</p>
            </div>
        </div>
    )
}