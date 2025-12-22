import { IResponse } from "../types/response.type";
import { IPizza } from "../interfaces/pizza.interface";
import { apiService } from "./api.service";
import { urls } from "../constants/urls";

const pizzaService = {
    create (data: IPizza): IResponse<IPizza> {
        return apiService.post<IPizza>(urls.pizzas, data)
    },
    getAll (): IResponse<IPizza[]> {
        return apiService.get(urls.pizzas)
    }
}
export {pizzaService}