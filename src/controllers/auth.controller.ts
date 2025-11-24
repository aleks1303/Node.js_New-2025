import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;
            const data = await authService.signIn(dto);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const { _userId } = tokenPayload;
            const user = await userService.getById(_userId);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
