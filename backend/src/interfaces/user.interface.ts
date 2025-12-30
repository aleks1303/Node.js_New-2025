import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    avatar: string;
    isActive: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    name: string;
    surname: string;
    age: number;
}

export interface IUserQuery {
    pageSize: number;
    page: number;
    search?: string;
    order?: string;
}

export type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;
export type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
