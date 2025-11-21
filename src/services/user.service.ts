import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositorie/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public getById(userId: string): Promise<IUser> {
        const user = userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    public updateById(userId: string, user: IUserUpdateDTO): Promise<IUser> {
        return userRepository.updateById(userId, user);
    }
    public deleteById(userId: string): Promise<void> {
        return userRepository.deleteById(userId);
    }
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(
                "Email is already exist",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }
}
export const userService = new UserService();
