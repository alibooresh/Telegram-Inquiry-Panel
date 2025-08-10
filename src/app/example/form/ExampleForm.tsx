import React, {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import ExampleService from "../service/ExampleService";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../base/languageswitcher/LanguageSwitcher";

const initialValues = {
    username: "",
    password: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
});


const Example: React.FC = () => {
    const { t } = useTranslation();
    const service = new ExampleService();
    const handleSubmit = async (values: typeof initialValues) => {
        try {
            service.example({}).then(response => {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/requests";
            }).catch(reason => {
                console.error()
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 400}}>
                <Typography variant="h5" textAlign="center" mb={3}>
                    {t('example.title')}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Box mb={2}>
                            <TextField name="username" label="نام کاربری"/>
                        </Box>
                        <Box mb={2}>
                            <TextField name="password" label="رمز عبور" type="password"/>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            ورود
                        </Button>
                        <LanguageSwitcher/>
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default Example;
