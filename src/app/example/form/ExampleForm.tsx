import React, {useState} from "react";
import {Box, Button, Paper, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import TextField from "../../../base/fields/textfield/TextField";
import ExampleService from "../service/ExampleService";

const initialValues = {
    username: "",
    password: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
});


const Example: React.FC = () => {
    const service = new ExampleService();
    const [response, setResponse] = useState<any>({});
    const handleSubmit = async (values: typeof initialValues) => {
        try {
            let response;
            service.example({}).then(response => {
                setResponse(response);
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
                    ورود به پنل
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
                    </Form>
                </Formik>
            </Paper>
        </Box>
    );
};

export default Example;
