import jwt, { SignOptions } from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
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
        type: TokenTypeEnum | ActionTokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenTypeEnum.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenTypeEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "token`s type is not valid",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            // throw new ApiError(
            //     "Token is not valid",
            //     StatusCodesEnum.UNAUTHORIZED,
            // );
            console.error("JWT ERROR:", e.message);
        }
    }
    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenTypeEnum,
    ) {
        let secret: string;
        let expiresIn: string;

        switch (type) {
            case ActionTokenTypeEnum.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenTypeEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new ApiError(
                    "Token type is not valid",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }
        return jwt.sign(payload, secret, { expiresIn } as SignOptions);
    }

    public async isTokenExist(
        token: string,
        type: TokenTypeEnum,
    ): Promise<boolean> {
        const tokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!tokenPromise;
    }
}
export const tokenService = new TokenService();
