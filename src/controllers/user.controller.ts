import { Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async create(req: Request, res: Response) {
        const user = req.body as IUserCreateDTO;
        const data = await userService.create(user);
        res.status(StatusCodesEnum.CREATED).json(data);
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body as IUserUpdateDTO;
        const data = await userService.updateById(id, body);
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await userService.deleteById(id);
        res.sendStatus(StatusCodesEnum.NO_CONTENT);
    }
}
export const userController = new UserController();
