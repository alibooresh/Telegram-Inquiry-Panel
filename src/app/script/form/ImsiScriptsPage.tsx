import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import api from "../../../base/axios/axios.config";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import TerminalIcon from "@mui/icons-material/Terminal";

const SCRIPT_TYPES = ["imsi", "imsi2", "imsi3", "imsi4"];

export default function ImsiScriptsPage() {
    const [open, setOpen] = useState(false);
    const [scriptType, setScriptType] = useState<string | null>(null);

    const [filePath, setFilePath] = useState("");
    const [workDir, setWorkDir] = useState("/usr/src/IMSI-catcher");
    const [password, setPassword] = useState("");

    const handleOpen = (type: string) => {
        setScriptType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFilePath("");
        setWorkDir("/usr/src/IMSI-catcher");
        setPassword("");
        setScriptType(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFilePath(file.name);
        }
    };

    const handleSubmit = async () => {
        if (!scriptType || !filePath || !workDir || !password) {
            alert("لطفاً تمام فیلدها را پر کنید");
            return;
        }

        const payload = {
            scriptType,
            filePath,
            workDir,
            password,
        };

        console.log("SEND TO SERVER =>", payload);

        try {
            await api.post("/run/script", payload);
            alert("اسکریپت با موفقیت اجرا شد ✅");
            handleClose();
        } catch (error) {
            alert("خطا در اجرای اسکریپت ❌");
        }
    };

    return (
        <Box p={4}>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={3} gap={1}>
                <TerminalIcon fontSize="large" color="primary" />
                <Typography variant="h5" fontWeight="bold">
                    اجرای اسکریپت‌های IMSI
                </Typography>
            </Box>

            {/* Cards */}
            <Grid container spacing={2} justifyContent="center">
                {SCRIPT_TYPES.map((type) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2.5}
                        lg={2}
                        key={type}
                    >
                        <Card
                            sx={{
                                backdropFilter: "blur(10px)",
                                backgroundColor: "rgba(255,255,255,0.1)", // برای لایت مود
                                borderRadius: "12px",
                                maxWidth: 220,
                                mx: "auto",
                                textAlign: "center",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" mb={2}>
                                    {type}
                                </Typography>
                                <Button
                                    endIcon={
                                        <PlayCircleIcon
                                            sx={{ width: 20, mr: 1 }}
                                        />
                                    }
                                    variant="contained"
                                        sx={{
                                        background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #2575fc, #6a11cb)"
                                        },
                                        mt: 2,
                                        justifyContent: "flex-",
                                        px: 2,
                                    }}
                                    onClick={() => handleOpen(type)}
                                >
                                    اجرا
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>
                    اجرای اسکریپت <strong>{scriptType}</strong>
                </DialogTitle>

                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <Button variant="outlined" component="label">
                            انتخاب فایل اسکریپت
                            <input type="file" hidden onChange={handleFileSelect} />
                        </Button>

                        <TextField
                            label="مسیر یا نام فایل اسکریپت"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="مسیر اجرای اسکریپت (WorkDir)"
                            value={workDir}
                            onChange={(e) => setWorkDir(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="پسورد"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>انصراف</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        ارسال
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
