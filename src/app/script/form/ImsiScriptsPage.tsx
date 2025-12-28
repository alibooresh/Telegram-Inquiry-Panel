import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack, TextField,
    Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import TerminalIcon from "@mui/icons-material/Terminal";
import api from "../../../base/axios/axios.config";

interface Script {
    id: number;
    name: string;
}

type ScriptStatus = "idle" | "running" | "stopping";
export default function ScriptControlPanel() {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [selectedScript, setSelectedScript] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<ScriptStatus>("idle");
    const [statusLoading, setStatusLoading] = useState(false);
    const [runDialogOpen, setRunDialogOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [runLoading, setRunLoading] = useState(false);

    useEffect(() => {
        if (selectedScript === "") return;

        const fetchStatus = async () => {
            setStatusLoading(true);
            try {
                const res = await api.get<{ status: ScriptStatus }>(
                    "/scripts/status",
                    {
                        params: { scriptId: selectedScript },
                    }
                );

                setStatus(res.data.status);
            } catch {
                setStatus("idle"); // fallback امن
            } finally {
                setStatusLoading(false);
            }
        };

        fetchStatus();
    }, [selectedScript]);


    return (
        <Box display="flex" justifyContent="center">
            <Card sx={{width: 420, borderRadius: 4}}>
                <CardContent>
                    {/* Header */}
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                        <TerminalIcon color="primary"/>
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
                    <Stack spacing={2} mt={3}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="success"
                            disabled={
                                selectedScript === "" ||
                                status === "running" ||
                                statusLoading
                            }
                            startIcon={<PlayArrowIcon />}
                            sx={{
                                py: 1.4,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "& .MuiButton-startIcon": { ml: 0.5 },
                            }}
                            onClick={() => {
                                setPassword("");
                                setRunDialogOpen(true);
                            }}
                        >
                            اجرای اسکریپت
                        </Button>


                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="error"
                            disabled={status !== "running"}
                            startIcon={
                                status === "stopping" ? (
                                    <CircularProgress size={20} color="inherit"/>
                                ) : (
                                    <StopCircleIcon/>
                                )
                            }
                            sx={{
                                py: 1.4,
                                borderRadius: 2,
                                fontWeight: "bold",
                                transition: "all 0.25s ease",
                                "& .MuiButton-startIcon": {ml: 0.5},
                                ...(status === "running" &&
                                    {
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 0 16px rgba(231, 76, 60, 0.6)",
                                        },
                                    })
                            }}
                            onClick={async () => {
                                setStatus("stopping");
                                // ⛔️ mock stop
                                await new Promise((r) => setTimeout(r, 1500));
                                setStatus("idle");
                            }}
                        >
                            {status === "stopping" ? "در حال توقف..." : "توقف"}
                        </Button>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="info"
                            disabled={selectedScript === ""}
                            startIcon={<BarChartIcon/>}
                            sx={{
                                py: 1.4,
                                borderRadius: 2,
                                fontWeight: "bold",
                                transition: "all 0.25s ease",
                                "& .MuiButton-startIcon": {ml: 0.5},
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 0 16px rgba(52, 152, 219, 0.6)",
                                    },
                            }}
                        >
                            نمایش دیتا
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            <Dialog
                open={runDialogOpen}
                onClose={() => !runLoading && setRunDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>تأیید اجرای اسکریپت</DialogTitle>

                <DialogContent>
                    <Typography variant="body2" mb={2}>
                        لطفاً رمز سیستم را برای اجرای اسکریپت وارد کنید
                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        type="password"
                        label="رمز سیستم"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={runLoading}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setRunDialogOpen(false)}
                        disabled={runLoading}
                    >
                        انصراف
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        disabled={!password || runLoading}
                        startIcon={
                            runLoading ? (
                                <CircularProgress size={18} color="inherit" />
                            ) : (
                                <PlayArrowIcon />
                            )
                        }
                        onClick={async () => {
                            if (!selectedScript) return;

                            setRunLoading(true);

                            try {
                                await api.post("/scripts/run", {
                                    scriptId: selectedScript,
                                    password,
                                });

                                setStatus("running");
                                setRunDialogOpen(false);
                            } catch {
                                alert("خطا در اجرای اسکریپت ❌");
                            } finally {
                                setRunLoading(false);
                            }
                        }}
                    >
                        اجرا
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}
