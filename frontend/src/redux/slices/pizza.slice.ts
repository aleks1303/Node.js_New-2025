import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/pizza.interface";
import { pizzaService } from "../../services/pizza.service";
import { authActions } from "./auth.slice";

interface IState {
    pizzas: IPizza[]
}
const initialState: IState = {
    pizzas: []
}
const getAll = createAsyncThunk<IPizza[], void>(
    "pizzaSlice/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await pizzaService.getAll();
            return data
        } catch (e) {
           return  rejectWithValue(e)
        }
    }
);
// const create = createAsyncThunk<IPizza, {pizza: IPizza }>(
//     "pizzaSlice/create",
//     async ({pizza}, {rejectWithValue}) => {
//         try {
//             const { data } = await pizzaService.create(pizza);
//             return data
//         } catch (e) {
//            return  rejectWithValue(e)
//         }
//     }
// );

const slicePizza = createSlice({
    name: 'slicePizza',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.pizzas = action.payload
            })


});

const  {reducer: pizzaReducer, actions} = slicePizza;

const pizzaActions = { ...actions, getAll };

export {pizzaReducer, pizzaActions}