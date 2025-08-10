import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import LoginService from "../service/LoginService";
import LoginRequestModel from "../model/LoginRequestModel";
import {LoginState} from "../properties/Properties";
import * as Yup from "yup";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {Form, Formik, useFormik} from "formik";
import LanguageSwitcher from "../../../base/languageswitcher/LanguageSwitcher";

const initialValues: LoginRequestModel = {
    phoneNumber: "",
    code: "",
};
const sendPhoneValidationSchema = Yup.object({
    phoneNumber: Yup.string().required("نام کاربری الزامی است"),
});
const confirmCodeValidationSchema = Yup.object({
    phoneNumber: Yup.string().required("نام کاربری الزامی است"),
    code: Yup.string().required("رمز عبور الزامی است")
});
const confirmPasswordValidationSchema = Yup.object({
    phoneNumber: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است")
});
const LoginForm: React.FC = () => {
    const {t} = useTranslation();
    const service = new LoginService();
    const [state, setState] = useState<LoginState>(LoginState.SEND_PHONE);
    const getValidationShema = () => {
        switch (state) {
            case LoginState.SEND_PHONE: return sendPhoneValidationSchema;
            case LoginState.CONFIRM_CODE: return confirmCodeValidationSchema;
            case LoginState.CONFIRM_PASSWORD: return confirmPasswordValidationSchema;
        }
    }

    const loginForm = useFormik({
        initialValues: initialValues,
        onSubmit: value => {
            if (state === LoginState.SEND_PHONE) {
                service.login(value).then(response => {

                }).catch(reason => {
                    console.error(reason)
                })
            } else if (state === LoginState.CONFIRM_CODE) {
                service.verify(value).then(response => {

                }).catch(reason => {
                    console.error(reason)
                })
            }
        },
        validationSchema: getValidationShema()
    })

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
                <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 400}}>
                    <Typography variant="h5" textAlign="center" mb={3}>
                        {t('loginTitle')}
                    </Typography>
                        <Form onSubmit={loginForm.handleSubmit} onReset={loginForm.handleReset}>
                            {state === LoginState.SEND_PHONE &&
                                <Box mb={2}>
                                    <TextField fullWidth name="phoneNumber" label={t('phoneNumber')}/>
                                    <span>{}</span>
                                </Box>
                            }
                            {state === LoginState.CONFIRM_CODE &&
                                <>
                                    <Box mb={2}>
                                        <TextField disabled={true} name="phoneNumber" label={t('phoneNumber')}/>
                                    </Box>
                                    <Box mb={2}>
                                        <TextField name="code" label={t('confirmCode')} type="password"/>
                                    </Box>
                                </>

                            }
                            {state === LoginState.CONFIRM_PASSWORD &&
                                <>
                                    <Box mb={2}>
                                        <TextField disabled={true} name="phoneNumber" label={t('phoneNumber')}/>
                                    </Box>
                                    <Box mb={2}>
                                        <TextField name="password" label={t('password')} type="password"/>
                                    </Box>
                                </>
                            }
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {t('login')}
                            </Button>
                        </Form>
                </Paper>
            </Box>
        </>
    );
}
export default LoginForm;