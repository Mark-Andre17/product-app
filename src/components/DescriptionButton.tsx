import React, { FC, memo } from "react";

type DescriptionButtonProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const DescriptionButton: FC<DescriptionButtonProps> = ({ visible, setVisible }) => {

    const toggleDescription = () => {
        setVisible(!visible);
    };

    return (
        <button onClick={toggleDescription}>{!visible ? 'Показать все' : 'Скрыть'}</button>
    )
}

export  default memo(DescriptionButton);

