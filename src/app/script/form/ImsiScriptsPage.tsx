import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Stack,
    Collapse,
    Divider,
} from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../../../base/axios/axios.config";

export default function RunScriptForm() {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [form, setForm] = useState({
        scriptFile: "imsi1.py",
        workDir: "/usr/src/imsi1",
        password: "",

        scriptId: "imsi1",
        sqliteFile: "imsi1.sqlite",
        args: "--sniff",
    });

    const [manualOverride, setManualOverride] = useState({
        scriptId: false,
        sqliteFile: false,
    });

    /* 🔁 اتوماتیک کردن مقادیر وابسته */
    useEffect(() => {
        const baseName = form.scriptFile.split(".")[0];

        setForm((prev) => ({
            ...prev,
            scriptId: manualOverride.scriptId ? prev.scriptId : baseName,
            sqliteFile: manualOverride.sqliteFile
                ? prev.sqliteFile
                : `${baseName}.sqlite`,
        }));
    }, [form.scriptFile]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.scriptFile || !form.workDir || !form.password) {
            alert("فیلدهای اصلی را پر کنید");
            return;
        }

        const payload = {
            scriptId: form.scriptId,
            scriptFile: form.scriptFile,
            workDir: form.workDir,
            sqliteFile: form.sqliteFile,
            args: form.args.split(" ").filter(Boolean),
            password: form.password,
        };

        console.log("SEND =>", payload);

        try {
            await api.post("/scripts/run", payload);
            alert("اسکریپت با موفقیت اجرا شد ✅");
        } catch {
            alert("خطا در اجرای اسکریپت ❌");
        }
    };

    return (
        <Box p={0} display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3 }}>
                <CardContent>
                    {/* Header */}
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <TerminalIcon color="primary" />
                        <Typography variant="subtitle1" fontWeight="bold">
                            اجرای اسکریپت
                        </Typography>
                    </Box>

                    {/* Main Fields */}
                    <Stack spacing={2}>
                        <TextField
                            dir="ltr"
                            label="Script File"
                            value={form.scriptFile}
                            onChange={(e) =>
                                handleChange("scriptFile", e.target.value)
                            }
                            fullWidth
                        />

                        <TextField
                            dir="ltr"
                            label="Work Directory"
                            value={form.workDir}
                            onChange={(e) =>
                                handleChange("workDir", e.target.value)
                            }
                            fullWidth
                        />

                        <TextField
                            dir="ltr"
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            fullWidth
                        />
                    </Stack>

                    {/* Advanced Toggle */}
                    <Box mt={1}>
                        <Button
                            size="small"
                            startIcon={<ExpandMoreIcon />}
                            onClick={() => setShowAdvanced((p) => !p)}
                        >
                            گزینه‌های بیشتر
                        </Button>
                    </Box>

                    {/* Advanced Fields */}
                    <Collapse in={showAdvanced}>
                        <Divider sx={{ my: 2 }} />
                        <Stack spacing={2}>
                            <TextField
                                dir="ltr"
                                label="Script ID"
                                value={form.scriptId}
                                onChange={(e) => {
                                    setManualOverride((p) => ({
                                        ...p,
                                        scriptId: true,
                                    }));
                                    handleChange("scriptId", e.target.value);
                                }}
                                fullWidth
                            />

                            <TextField
                                dir="ltr"
                                label="SQLite File"
                                value={form.sqliteFile}
                                onChange={(e) => {
                                    setManualOverride((p) => ({
                                        ...p,
                                        sqliteFile: true,
                                    }));
                                    handleChange("sqliteFile", e.target.value);
                                }}
                                fullWidth
                            />

                            <TextField
                                dir="ltr"
                                label="Args"
                                value={form.args}
                                onChange={(e) =>
                                    handleChange("args", e.target.value)
                                }
                                helperText="مثال: --sniff --debug"
                                fullWidth
                            />
                        </Stack>
                    </Collapse>

                    {/* Submit */}
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<PlayCircleIcon />}
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                    >
                        اجرای اسکریپت
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
