import { AxiosResponse } from "axios";

export type IResponse<T> = Promise<AxiosResponse<T>>;