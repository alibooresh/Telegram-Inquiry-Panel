import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    Typography,
    TextField,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import api from "../../../base/axios/axios.config";

interface InquiryResult {
    id: number;
    phoneNumber: string;
    userId: string;
    status: string;
    firstName: string;
    lastName: string;
    usernames: string;
}

const NewInquiryDetailForm = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<InquiryResult | null>(null);
    const [sherlock, setSherlock] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInquiry = async () => {
        if (!phone) {
            setMessage("لطفا شماره تلفن را وارد کنید.");
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            setResult(null);

            const response = await api.post<InquiryResult>(`/inquiry/startSingleInquiryByPhone?phoneNumber=${phone}`);
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setMessage("خطا در انجام استعلام ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleSherlock = async () => {
        if (!result?.usernames) {
            setMessage("نام کاربری یافت نشد");
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            setResult(null);

            const response = await api.post<string>(`/sherlock/scan?username=${result.usernames}`);
            setSherlock(response.data);
        } catch (error) {
            console.error(error);
            setMessage("خطا در انجام استعلام ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                backdropFilter: "blur(14px)",
                background: "rgba(30,30,40,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e3f2fd",
            }}
        >
            <CardHeader
                title={
                    <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                        استعلام تکی جدید
                    </Typography>
                }
                action={
                    <Stack textAlign={"left"} direction="row-reverse">
                        <IconButton color="info" title={"بازگشت"} onClick={() => navigate(-1)}>
                            <ArrowCircleRightOutlinedIcon />
                        </IconButton>
                        <IconButton color="warning" title={"پروفایل"} onClick={() => navigate("/")}>
                            <Person2Icon />
                        </IconButton>
                        <IconButton color="primary" title={"لیست استعلام"} onClick={() => navigate("/inquiry")}>
                            <PersonSearchIcon />
                        </IconButton>
                    </Stack>
                }
            />
            <CardContent>
                <TextField
                    type={"text"}
                    color="success"
                    fullWidth
                    label="شماره تلفن"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhone(value.slice(0, 12)); // حداکثر 10 رقم
                    }}
                    inputProps={{ maxLength: 12 }}
                    sx={{
                        maxWidth:350,
                        mb: 2,
                        "& input": {
                            color: "#fff",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#90caf9",
                        },
                    }}
                />


                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInquiry}
                    disabled={loading || !phone}
                    sx={{
                        height:56,
                        marginRight:2
                    }}
                >
                    {loading ? "در حال استعلام..." : "استعلام"}
                </Button>

                {message && (
                    <Typography variant="body2" color="error" mt={2}>
                        {message}
                    </Typography>
                )}

                {result && (
                    <Box mt={3} p={2} sx={{ background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                        <Typography variant="body1"><strong>شماره تلفن:</strong> {result.phoneNumber}</Typography>
                        <Typography variant="body1"><strong>شناسه کاربری:</strong> {result.userId}</Typography>
                        <Typography variant="body1"><strong>نام کاربری:</strong> {result.usernames}</Typography>
                        <Typography variant="body1"><strong>نام:</strong> {result.firstName}</Typography>
                        <Typography variant="body1"><strong>نام خانوادگی:</strong> {result.lastName}</Typography>
                        <Typography variant="body1"><strong>وضعیت استعلام:</strong> {result.status}</Typography>
                    </Box>
                )}
                {sherlock && (
                    <Box mt={3} p={2} sx={{ background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                        <Typography variant="body1"><strong>استعلام نام کاربری:</strong> {sherlock}</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default NewInquiryDetailForm;
