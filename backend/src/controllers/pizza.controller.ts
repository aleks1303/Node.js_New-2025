import {Request, Response, NextFunction } from "express";
import { pizzaService } from "../services/pizza.service";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IPizzaCreateDTO } from "../interfaces/pizza.interface";

class PizzaController {
    public async getAll (req: Request, res:Response, next: NextFunction) {
        try {
            const data = await pizzaService.getAll();
            res.status(StatusCodesEnum.OK).json(data)
        } catch (e){
            next(e)
        }
    }

    public async create (req: Request, res:Response, next: NextFunction) {
        try {
            const body = req.body as IPizzaCreateDTO;
            const data = await pizzaService.create(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e){
            next(e)
        }
    }
}
export const pizzaController = new PizzaController();