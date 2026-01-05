import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/pizza.interface";
import { pizzaService } from "../../services/pizza.service";

interface IPaginatedResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
}

interface IState {
    pizzas: IPizza[],
    totalItems: number;
    totalPages: number;
    trigger: boolean,
}
const initialState: IState = {
    pizzas: [],
    totalItems: 0,
    totalPages: 0,
    trigger: false,
}
const getAll = createAsyncThunk<IPaginatedResponse<IPizza>, void>(
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
const create = createAsyncThunk<IPizza, {pizza: IPizza }>(
    "pizzaSlice/create",
    async ({pizza}, {rejectWithValue}) => {
        try {
            const { data } = await pizzaService.create(pizza);
            return data
        } catch (e) {
           return  rejectWithValue(e)
        }
    }
);

const pizzaSlice = createSlice({
    name: 'slicePizza',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.pizzas = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.trigger = !state.trigger
            })


});

const  {reducer: pizzaReducer, actions} = pizzaSlice;

const pizzaActions = { ...actions, getAll, create };

export {pizzaReducer, pizzaActions}