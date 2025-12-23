import React, { FC } from "react";
import { IPizza } from "../../interfaces/pizza.interface";
interface IProps {
    pizza: IPizza
}
const Pizza: FC<IProps> = ({pizza}) => {
    const {name, price, diameter } = pizza
    return (
        <div>
            <div>name:{name}</div>
            <div>price:{price}</div>
            <div>diameter:{diameter}</div>
            <hr/>
        </div>
    );
};

export default Pizza;