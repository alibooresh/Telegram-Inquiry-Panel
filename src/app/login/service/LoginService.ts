import api from "../../../base/axios/axios.config";
import LoginRequestModel from "../model/LoginRequestModel";

class LoginService {
    login = (data: LoginRequestModel) => {
        return api.post<any>("/auth/login", data);
    };

    verify = (data: LoginRequestModel) => {
        return api.post<any>("/auth/verify", data);
    };

    confirmPassword = (data: LoginRequestModel) => {
        return api.post<any>("/auth/confirmPassword", data);
    };
}

export default LoginService