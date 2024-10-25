import React, { FC, memo, useState } from "react";
import DescriptionButton from "./DescriptionButton";
import "../assets/styles/description.css";

type DescriptionProps = {
    description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const maxLength: number = 150;
    if (description.length >  maxLength) {
        return (
            !visible
            ? <p className="product__info-text">{description.slice(0, maxLength)}<span>...</span><DescriptionButton visible={visible} setVisible={setVisible}/></p>
            : <p className="product__info-text">{description}<DescriptionButton visible={visible} setVisible={setVisible}/></p>
        )
    }
    
    return(
        <p className="product__info-text">{description}</p>
    )
}

export default memo(Description);