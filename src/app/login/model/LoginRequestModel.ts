interface LoginRequestModel {
    phoneNumber: string;
    code: string;
    password?: string;
}

export default LoginRequestModel;