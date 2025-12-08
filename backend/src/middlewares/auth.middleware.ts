import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

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
                TokenTypeEnum.ACCESS,
            );
            console.log(tokenPayload);
            const isTokenExist = await tokenService.isTokenExist(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            console.log(isTokenExist);
            if (!isTokenExist) {
                throw new ApiError(
                    "Token is not valid",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const isActive = await userService.isActive(tokenPayload.userId);
            if (!isActive) {
                throw new ApiError(
                    "Account is not active",
                    StatusCodesEnum.FORBIDDEN,
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
                TokenTypeEnum.REFRESH,
            );
            const isTokenExist = await tokenService.isTokenExist(
                refreshToken,
                TokenTypeEnum.REFRESH,
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
    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;
            if (role !== "admin") {
                throw new ApiError(
                    "No has permissions",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
