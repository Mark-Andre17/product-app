import React, { FC } from "react";
import { IProduct, Keys } from "../models/product.model";
import "../assets/styles/addModal.css";
import CloseIcon from '@mui/icons-material/Close';
import { addProduct } from "../actions/postProduct";
import { useAppDispatch } from "../hooks/appHooks";
import { SubmitHandler, useForm } from "react-hook-form";

type AddModalProps = {
    filterList: string[],
    products:  IProduct[],
    visibleAdd: boolean,
    setVisibleAdd: (visibleAdd: boolean) => void
}
interface MyForm {
    title: string,
    price: number,
    category: string,
    description: string, 
    image: string
}

export const AddModal: FC<AddModalProps> = ({ visibleAdd, setVisibleAdd, products, filterList }) => {
    const dispatch = useAppDispatch();
    
    const toggleVisible = () => {
        setVisibleAdd(!visibleAdd);
    }

    const { register, handleSubmit, reset, formState: {errors, isValid} } = useForm<MyForm>({
        mode: 'onBlur'
    });

    const addForm = () => {
        const orderedKeys: Keys = ['title', 'price', 'category', 'description', 'image'];
        
        return orderedKeys.map(keyItem => {
            if (keyItem === 'category') {
                return (
                    <select key={keyItem} {...register(keyItem)}>
                        {filterList.map((item) => (
                            item !== 'all' ? <option key={item} value={item}>{item}</option> : null
                        ))}
                    </select>
                );
            }
            return <label>
                        <input 
                        key={keyItem} 
                        type={products.length > 0 && typeof products[0][keyItem as keyof IProduct] === 'number' ? 'number' : 'text'} 
                        placeholder={keyItem} 
                        {...register(keyItem, {
                            required: 'Поле обязательно к заполнению', 
                            minLength: {
                                value: 2, 
                                message: 'Минимум 2 символа'
                            }})}
                        />
                        <div className="input__error">{errors?.[keyItem] && <p>{errors?.[keyItem]?.message}!</p>}</div>
                    </label>;
        });
    };
    

    const submit: SubmitHandler<MyForm> = (data) => {

        const newProduct: IProduct = {
            id:  products.length + 1,
            title: data.title,
            price: Number(data.price),
            category: data.category,
            description: data.description,
            image: data.image
        };

        reset();

        dispatch(addProduct(newProduct));
    }

    return (
        <div className="add__modal">
            <div className="add__modal-header">
                <h2 className="add__modal-header__title">Новая позиция</h2>
                <button onClick={toggleVisible} className="add__modal-header__btn"><CloseIcon /></button>
            </div>
            <form onSubmit={handleSubmit(submit)} className="add__form">
                {addForm()}
                <button type="submit" disabled={!isValid}>Добавить</button>
            </form>
        </div>
    )
}