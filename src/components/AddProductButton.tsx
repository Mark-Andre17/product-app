import React, { FC, memo, useCallback } from "react";
import "../assets/styles/addProductButton.css";

type AddProductButtonProps = {
    visibleAdd: boolean,
    setVisibleAdd: (visibleAdd: boolean) => void
}

const AddProductButton: FC<AddProductButtonProps> = ({ visibleAdd, setVisibleAdd }) => {
    const toggleVisible = useCallback(() =>{
        setVisibleAdd(!visibleAdd)
    }, [visibleAdd, setVisibleAdd])
    
    return (
        <button onClick={toggleVisible} className="add__button">Add</button>
    )
}

export default memo(AddProductButton);