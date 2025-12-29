import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key}: ${id} invalid Id`, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }

    public isFileExist() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.file) {
                    throw new ApiError(
                        "No file uploaded",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}
export const commonMiddleware = new CommonMiddleware();
