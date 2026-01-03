import { IBase } from "./base.interface";

export interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diameter: number;
}

export interface IPizzaQuery {
    pageSize: number;
    page: number;
    name?: string;
    price?: number;
    diameter?: number;
    search?: string;
    order?: string;
}

export type IPizzaCreateDTO = Pick<IPizza, "name" | "price" | "diameter">;
