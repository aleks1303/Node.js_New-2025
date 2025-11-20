import {IUser, IUserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositorie/user.repository";

class UserService {
    public getAll (): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create (user: IUserDTO): Promise<IUser>{
        return userRepository.create(user);
    }
    public getById (userId: string): Promise<IUser> {
        return userRepository.getById(userId);
    }
    public updateById (userId:string, user: IUserDTO):Promise<IUser>{
        return userRepository.updateById(userId, user);
    }
    public delete (userId: string): Promise<void>{
      return userRepository.delete(userId);
    }
}
export const userService = new UserService();