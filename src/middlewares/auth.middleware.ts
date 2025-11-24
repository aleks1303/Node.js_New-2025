import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
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
            const isTokenExist = await tokenService.isTokenExist(accessToken);
            if (!isTokenExist) {
                throw new ApiError(
                    "Token is not valid",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
