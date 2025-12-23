import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPizza } from "../../interfaces/pizza.interface";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { pizzaActions } from "../../redux/slices/pizza.slice";

const PizzaCreate = () => {
    const {register, handleSubmit} = useForm<IPizza>();
    const dispatch = useAppDispatch();

    const save: SubmitHandler<IPizza> = async (pizza) => {
        dispatch(pizzaActions.create({pizza}));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" placeholder={'name'} {...register("name")} />
                <input type="text" placeholder={'price'} {...register("price")} />
                <input type="text" placeholder={'diameter'} {...register("diameter")} />
                <button>Save</button>
            </form>
        </div>
    );
};

export default PizzaCreate;