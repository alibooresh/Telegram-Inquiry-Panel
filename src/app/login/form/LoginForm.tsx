import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    CardHeader,
    Stack,
    IconButton,
    CardContent, LinearProgress, Card
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../../../base/axios/axios.config";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Step = "phone" | "verify";

interface LoginValues {
    phoneNumber: string;
    code: string;
}

const LoginForm: React.FC = () => {
    const [step, setStep] = useState<Step>("phone");
    const [timer, setTimer] = useState<number>(60);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (step === "verify" && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const initialValues: LoginValues = { phoneNumber: "", code: "" };

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required("شماره تلفن الزامی است")
            .matches(/^989\d{9}$/, "شماره تلفن معتبر نیست (مثال: 989123456789)"),
        code:
            step === "verify"
                ? Yup.string()
                    .required("کد تایید الزامی است")
                    .matches(/^\d{5}$/, "کد تایید باید ۵ رقم باشد")
                : Yup.string().nullable(),
    });

    const handleSubmit = async (values: LoginValues) => {
        try {
            setLoading(true);
            if (step === "phone") {
                await api.post("/auth/send-phone?phoneNumber="+values.phoneNumber, null);
                setStep("verify");
                setTimer(60);
            } else if (step === "verify") {
                const res = await api.post("/auth/check-code?code="+values.code, null);
                localStorage.setItem("token", res.data.token);
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{maxWidth: 400, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
            <CardHeader
                title={
                    <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                        ورود به سامانه
                    </Typography>
                }
            />
            <CardContent className={"profile-content"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="phoneNumber"
                                label="شماره تلفن"
                                fullWidth
                                margin="normal"
                                disabled={step === "verify"}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                            />

                            {step === "verify" && (
                                <>
                                    <Field
                                        as={TextField}
                                        name="code"
                                        label="کد تایید"
                                        fullWidth
                                        margin="normal"
                                        error={touched.code && Boolean(errors.code)}
                                        helperText={touched.code && errors.code}
                                    />

                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {timer > 0
                                            ? `زمان باقی‌مانده: ${timer} ثانیه`
                                            : "کد منقضی شد"}
                                    </Typography>
                                </>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading || (step === "verify" && timer === 0)}
                                sx={{ mt: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : step === "phone" ? (
                                    "دریافت کد تایید"
                                ) : (
                                    "تایید"
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
