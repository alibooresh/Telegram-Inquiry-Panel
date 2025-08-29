import React, {useState} from "react";
import {Button, Card, CardContent, CardHeader, IconButton, LinearProgress, Stack, Typography,} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import {useNavigate} from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import api from "../../../base/axios/axios.config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const NewInquiryForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("لطفا یک فایل انتخاب کنید.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setMessage(null);

            const response = await api.post("/inquiry/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage("فایل با موفقیت آپلود شد ✅");
        } catch (error) {
            console.error(error);
            setMessage("خطا در آپلود فایل ❌");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
            <CardHeader
                title={
                    <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                        استعلام جدید
                    </Typography>
                }
                action={
                    <Stack textAlign={"left"} direction="row-reverse">
                        <IconButton color="info" title={"بازگشت"}
                                    onClick={() => navigate(-1)}>
                            <ArrowCircleRightOutlinedIcon/>
                        </IconButton>
                        <IconButton color="warning" title={"پروفایل"}
                                    onClick={() => navigate("/")}>
                            <Person2Icon/>
                        </IconButton>
                        <IconButton color="primary" title={"لیست استعلام"}
                                    onClick={() => navigate("/inquiry")}>
                            <PersonSearchIcon/>
                        </IconButton>
                    </Stack>
                }
            />
            <CardContent className={"profile-content"}>
                <Typography variant="h6" mb={2} fontWeight="bold">
                    آپلود فایل اکسل
                </Typography>

                <Button
                    component="label"
                    variant="outlined"
                    endIcon={<CloudUploadIcon sx={{mr: '13px'}}/>}
                    sx={{mb: 2}}
                >
                    انتخاب فایل
                    <input type="file" hidden onChange={handleFileChange} accept=".xlsx, .xls"/>
                </Button>

                {file && (
                    <Typography variant="body2" mb={2}>
                        فایل انتخاب شده: {file.name}
                    </Typography>
                )}

                <Button
                    sx={{mr: '15px', mb: '17px'}}
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={uploading || !file}
                >
                    {uploading ? "در حال آپلود..." : "آپلود"}
                </Button>

                {uploading && <LinearProgress sx={{mt: 2}}/>}

                {message && (
                    <Typography variant="body2" color="text.secondary" mt={2}>
                        {message}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default NewInquiryForm;
