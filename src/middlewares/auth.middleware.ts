import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IRefresh } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authHeaders = req.headers.authorization;
            if (!authHeaders) {
                throw new ApiError(
                    "Token is provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const accessToken = authHeaders.split(" ")[1];
            if (!accessToken) {
                throw new ApiError(
                    "Token is provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                accessToken,
                "access",
            );
            const isTokenExist = await tokenService.isTokenExist(
                accessToken,
                "accessToken",
            );
            if (!isTokenExist) {
                throw new ApiError(
                    "Token is not valid",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;
            if (!refreshToken) {
                throw new ApiError(
                    "Token refresh is provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                "refresh",
            );
            const isTokenExist = await tokenService.isTokenExist(
                refreshToken,
                "refreshToken",
            );
            if (!isTokenExist) {
                throw new ApiError(
                    "Token is not valid",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
