import { IAuth } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import { apiService } from "./api.service";
import { urls } from "../constants/urls";
import { ITokens } from "../interfaces/token.interface";
import { IResponse } from "../types/response.type";

const _accessToken = 'accessToken';
const _refreshToken = 'refreshToken';
const authService = {
    register (user: IAuth): IResponse<IUser> {
        return authService.register(user)
    },
    async login (user: IAuth): Promise<IUser>{
        const {data} = await apiService.post<ITokens>(urls.auth.login, user);
        this.setTokens(data)
        const {data:me} = await this.me();
        return me
    },

    async refresh (): Promise<void>  {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refreshToken});
        this.setTokens(data)
        }
    },

    setTokens({tokens: {accessToken, refreshToken}}: ITokens): void {
        localStorage.setItem(_accessToken, accessToken)
        localStorage.setItem(_refreshToken, refreshToken)
    },

    deleteTokens (): void {
        localStorage.removeItem(_accessToken)
        localStorage.removeItem(_refreshToken)
    },
    
    me (): IResponse<IUser>{
        return apiService.get(urls.auth.me);
    },

    getAccessToken (): string {
        return localStorage.getItem(_accessToken) || '';
    },

    getRefreshToken (): string {
        return localStorage.getItem(_refreshToken) || '';
    }
};

export {authService}