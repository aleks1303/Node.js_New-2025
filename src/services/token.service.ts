/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositorie/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });
        return { accessToken, refreshToken };
    }

    public verifyToken(
        token: string,
        type: "access" | "refresh",
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case "access":
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "token`s type is not valid",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError(
                "Token is not valid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
    }

    public async isTokenExist(
        token: string,
        type: "accessToken" | "refreshToken",
    ): Promise<boolean> {
        const tokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!tokenPromise;
    }
}
export const tokenService = new TokenService();
