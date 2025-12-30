import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import TerminalIcon from "@mui/icons-material/Terminal";
import api from "../../../base/axios/axios.config";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";


interface Script {
    id: number;
    name: string;
}

type ScriptStatus = "running" | "stopped" | "failed" | "unknown";

export default function ScriptControlPanel() {
    const navigate = useNavigate();

    const [scripts, setScripts] = useState<Script[]>([]);
    const [selectedScript, setSelectedScript] = useState<number | "">("");
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState<ScriptStatus>("unknown");
    const [statusLoading, setStatusLoading] = useState(false);

    const [runDialogOpen, setRunDialogOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info";
    }>({
        open: false,
        message: "",
        severity: "info",
    });

    const actionButtonSx = {
        py: 1.5,
        borderRadius: 2,
        fontWeight: "bold",
        transition: "all 0.25s ease",
        "&:hover": {
            transform: "translateY(-2px)",
        },
        "&:active": {
            transform: "scale(0.98)",
        },
    };

    /* 🔹 Load script list on mount */
    useEffect(() => {
        const fetchScripts = async () => {
            try {
                const res = await api.get<Script[]>("/script-list");
                setScripts(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchScripts();
    }, []);

    /* 🔹 Fetch status when script selected */
    useEffect(() => {
        if (selectedScript === "") return;

        const fetchStatus = async () => {
            setStatusLoading(true);
            try {
                const res = await api.get<{ status: ScriptStatus }>(
                    "/scripts/status",
                    { params: { scriptId: selectedScript } }
                );
                setStatus(res.data.status);
            } catch {
                setStatus("unknown");
            } finally {
                setStatusLoading(false);
            }
        };

        fetchStatus();
    }, [selectedScript]);

    /* ▶️ Run script */
    const handleRun = async () => {
        if (!selectedScript) return;

        if (status === "running") {
            setToast({
                open: true,
                severity: "info",
                message: "این اسکریپت در حال اجرا می‌باشد ⏳",
            });
            return;
        }

        setActionLoading(true);
        try {
            const res = await api.post("/scripts/run", {
                scriptId: selectedScript,
                password,
            });

            if (res.data.status === "running") {
                setStatus("running");
                setToast({
                    open: true,
                    severity: "success",
                    message: "اسکریپت با موفقیت اجرا شد ✅",
                });
                setRunDialogOpen(false);
            }
        } catch (e) {
            console.log("error",e)
            setToast({
                open: true,
                severity: "error",
                message: "خطا در اجرای اسکریپت ❌",
            });
        } finally {
            setActionLoading(false);
        }
    };

    /* ⏹ Stop script */
    const handleStop = async () => {
        if (status !== "running") {
            alert("اسکریپت در حال اجرا نمی‌باشد ⚠️");
            return;
        }

        setActionLoading(true);
        try {
            const res = await api.post("/scripts/stop", {
                scriptId: selectedScript,
            });

            if (res.data.status === "stopped") {
                setStatus("stopped");
                alert("اسکریپت با موفقیت متوقف شد 🛑");
            }
        } catch {
            alert("خطا در توقف اسکریپت ❌");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center">
            <Card sx={{ width: 420, borderRadius: 4 }}>
                <CardContent>
                    {/* Header */}
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                        <TerminalIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                            Script Control Center
                        </Typography>
                    </Box>

                    {/* Select */}
                    <FormControl fullWidth>
                        <InputLabel>انتخاب اسکریپت</InputLabel>
                        <Select
                            value={selectedScript}
                            label="انتخاب اسکریپت"
                            onChange={(e) =>
                                setSelectedScript(e.target.value as number)
                            }
                        >
                            {loading && (
                                <MenuItem disabled>
                                    <CircularProgress size={18} />
                                </MenuItem>
                            )}

                            {scripts.map((script) => (
                                <MenuItem key={script.id} value={script.id}>
                                    {script.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Actions */}
                    <Stack spacing={2.2} mt={3}>
                        {/* RUN */}
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="success"
                            disabled={
                                selectedScript === "" ||
                                status === "running" ||
                                statusLoading ||
                                actionLoading
                            }
                            startIcon={
                                actionLoading && status !== "running" ? (
                                    <CircularProgress size={18} color="inherit" />
                                ) : (
                                    <PlayArrowIcon />
                                )
                            }
                            onClick={() => {
                                if (status === "running") {
                                    setToast({
                                        open: true,
                                        severity: "info",
                                        message: "این اسکریپت در حال اجراست",
                                    });
                                    return;
                                }
                                setPassword("");
                                setRunDialogOpen(true);
                            }}
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                                bgcolor: status === "running" ? "success.dark" : "success.main",

                                "&:hover": {
                                    transform: status === "running" ? "none" : "translateY(-3px)",
                                    boxShadow:
                                        status === "running"
                                            ? "none"
                                            : "0 0 24px rgba(46, 204, 113, 0.8)",
                                },

                                ...(status === "running" && {
                                    animation: "pulse 1.6s infinite",
                                }),

                                "& .MuiButton-startIcon": { ml: 0.5 },

                                "@keyframes pulse": {
                                    "0%": { boxShadow: "0 0 0 0 rgba(46,204,113,0.7)" },
                                    "70%": { boxShadow: "0 0 0 14px rgba(46,204,113,0)" },
                                    "100%": { boxShadow: "0 0 0 0 rgba(46,204,113,0)" },
                                },
                            }}
                        >
                            {status === "running" ? "در حال اجرا..." : "اجرای اسکریپت"}
                        </Button>

                        {/* STOP */}
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="error"
                            disabled={selectedScript === "" || status !== "running"}
                            startIcon={<StopCircleIcon />}
                            onClick={async () => {
                                if (status !== "running") {
                                    setToast({
                                        open: true,
                                        severity: "info",
                                        message: "این اسکریپت در حال اجرا نمی‌باشد",
                                    });
                                    return;
                                }

                                try {
                                    setActionLoading(true);
                                    const res = await api.post("/scripts/stop", {
                                        scriptId: selectedScript,
                                    });

                                    if (res.data.status === "stopped") {
                                        setStatus("stopped");
                                        setToast({
                                            open: true,
                                            severity: "success",
                                            message: "اسکریپت با موفقیت متوقف شد",
                                        });
                                    }
                                } catch {
                                    setToast({
                                        open: true,
                                        severity: "error",
                                        message: "خطا در توقف اسکریپت",
                                    });
                                } finally {
                                    setActionLoading(false);
                                }
                            }}
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                                transition: "all 0.3s ease",

                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: "0 0 24px rgba(231, 76, 60, 0.8)",
                                },

                                "& .MuiButton-startIcon": { ml: 0.5 },
                            }}
                        >
                            توقف
                        </Button>

                        {/* DATA */}
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="info"
                            disabled={selectedScript === ""}
                            startIcon={<BarChartIcon />}
                            onClick={() =>
                                navigate(`/demo?scriptId=${selectedScript}`)
                            }
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                                transition: "all 0.3s ease",

                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: "0 0 24px rgba(52, 152, 219, 0.8)",
                                },

                                "& .MuiButton-startIcon": { ml: 0.5 },
                            }}
                        >
                            نمایش دیتا
                        </Button>
                    </Stack>

                </CardContent>
            </Card>

            {/* Run Dialog */}
            <Dialog
                open={runDialogOpen}
                onClose={() => !actionLoading && setRunDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{
                    direction:"rtl"
                }}>تأیید اجرای اسکریپت</DialogTitle>

                <DialogContent>
                    <Typography sx={{
                        direction:"rtl"
                    }} variant="body2" mb={2}>
                        لطفاً رمز سیستم را وارد کنید
                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        type="password"
                        label="رمز سیستم"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={actionLoading}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setRunDialogOpen(false)}
                        disabled={actionLoading}
                    >
                        انصراف
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        disabled={!password || actionLoading}
                        onClick={handleRun}
                    >
                        اجرا
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={toast.severity}
                    variant="filled"
                    onClose={() => setToast({ ...toast, open: false })}
                    sx={{ borderRadius: 2 }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}
