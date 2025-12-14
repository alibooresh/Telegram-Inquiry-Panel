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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Particles } from "@tsparticles/react"; // حتماً با {} باشه
import { loadFull } from "tsparticles";



const SCRIPT_TYPES = ["imsi", "imsi2", "imsi3", "imsi4"];

export default function ImsiScriptsPage() {
    const [open, setOpen] = useState(false);
    const [scriptType, setScriptType] = useState<string | null>(null);

    const [filePath, setFilePath] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = (type: string) => {
        setScriptType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFilePath("");
        setPassword("");
        setScriptType(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // فقط مسیر/نام فایل داخل استرینگ ذخیره می‌شود
            setFilePath(file.name);
        }
    };

    const handleSubmit = () => {
        const payload = {
            scriptType,
            filePath,
            password,
        };

        console.log("SEND TO SERVER =>", payload);

        // اینجا می‌تونی axios.post بزنی
        api.post('/run/script', payload).then(r => alert("اسکریپت با موفقیت اجرا شد!"))

        handleClose();
    };

    return (
        <>
        <Box p={4}>

            <Box display="flex" alignItems="center" mb={3} gap={1}>
                <TerminalIcon fontSize={'large'} sx={{
                    color: "primary.main",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.2)" }
                }} />
                <Typography variant="h5" fontWeight="bold">
                    اجرای اسکریپت‌های IMSI
                </Typography>
            </Box>

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
                                <Typography variant="h6">
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



            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>اجرای اسکریپت {scriptType}</DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <Box display="flex" flexDirection="column" gap={2} pt={2}>
                        {/*<Button variant="outlined" component="label">*/}
                        {/*    انتخاب فایل*/}
                        {/*    <input type="file" hidden onChange={handleFileSelect} />*/}
                        {/*</Button>*/}
                        <TextField
                            label="مسیر فایل اسکریپت"
                            value={filePath}
                            onChange={(e) => setFilePath(e.target.value)}
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
        </>
    );
}
