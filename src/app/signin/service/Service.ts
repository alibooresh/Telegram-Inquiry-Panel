import api from "../../../base/axios/axios.config";
import LoginRequestModel from "../model/LoginRequestModel";

export const login = (data: LoginRequestModel) => {
    return api.post<any>("/auth/login", data);
};

export const verify = (data: LoginRequestModel) => {
    return api.post<any>("/auth/verify", data);
};

export const confirmPassword = (data: LoginRequestModel) => {
    return api.post<any>("/auth/confirmPassword", data);
};