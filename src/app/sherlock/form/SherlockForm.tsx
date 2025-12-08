import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import api from "../../../base/axios/axios.config";
import { useNavigate } from "react-router-dom";

interface UserSitesRequest {
    username: string;
    sites: string[];
}

const SherlockForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [sites, setSites] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [siteOptions, setSiteOptions] = useState<string[]>([]);
    const [loadingSites, setLoadingSites] = useState(false);

    interface ScanResponse {
        message: string;
        scan_id: number;
        username: string;
        sites: string[];
    }

    const [resultData, setResultData] = useState<ScanResponse | null>(null);

    const handleSherlock = async () => {
        if (!username || sites.length === 0) {
            setMessage("لطفا نام کاربری و حداقل یک سایت را انتخاب کنید.");
            return;
        }

        const requestData: UserSitesRequest = { username, sites };

        try {
            setLoading(true);
            setMessage(null);
            setResultData(null);

            const response = await api.post("/scan", requestData);
            const data = response.data;

            setResultData({
                scan_id: data.scan_id,
                username: data.username,
                sites: data.sites,
                message: data.message,
            });
        } catch (error) {
            console.error(error);
            setMessage("خطا در انجام استعلام ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSites = async () => {
            try {
                setLoadingSites(true);
                const response = await api.get<{ sites: string[] }>("/sites/list");
                if (response.status === 200 && response.data.sites) {
                    setSiteOptions(response.data.sites);
                }
            } catch (error) {
                console.error("خطا در دریافت سایت‌ها:", error);
            } finally {
                setLoadingSites(false);
            }
        };

        fetchSites();
    }, []);

    return (
        <>
            {loading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.6)"
                                : "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                    }}
                >
                    <CircularProgress size={80} thickness={4} />
                </Box>
            )}

            <Card
                sx={{
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: theme.palette.mode === "dark"
                        ? "0 8px 32px rgba(0,0,0,0.5)"
                        : "0 4px 16px rgba(0,0,0,0.1)",
                    backdropFilter: theme.palette.mode === "dark" ? "blur(14px)" : "none",
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(40,40,55,0.6)"
                            : theme.palette.background.paper,
                    border:
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.05)",
                    color: theme.palette.text.primary,
                }}
            >
                <CardHeader
                    title={
                        <Typography variant="h5" align="right" fontWeight="bold">
                            استعلام نام کاربری
                        </Typography>
                    }
                />
                <CardContent>
                    {/* نام کاربری */}
                    <TextField
                        label="نام کاربری"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            maxWidth: 350,
                            mb: 3,
                        }}
                    />

                    {/* انتخاب سایت‌ها */}
                    <FormControl fullWidth sx={{ maxWidth: 350, mb: 4 }}>
                        <InputLabel>سایت‌ها</InputLabel>
                        <Select
                            multiple
                            value={sites}
                            onChange={(e) => setSites(e.target.value as string[])}
                            input={<OutlinedInput label="سایت‌ها" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} color="primary" />
                                    ))}
                                </Box>
                            )}
                        >
                            {siteOptions.map((site) => (
                                <MenuItem key={site} value={site}>
                                    {site}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* دکمه */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSherlock}
                        disabled={loading}
                        sx={{ height: 56, mr: 2 }}
                    >
                        استعلام
                    </Button>

                    {/* پیام */}
                    {message && (
                        <Typography color="error" mt={2}>
                            {message}
                        </Typography>
                    )}

                    {/* نتیجه */}
                    {resultData && (
                        <Box
                            mt={3}
                            p={2}
                            sx={{
                                background:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.05)"
                                        : "rgba(0,0,0,0.04)",
                                borderRadius: 2,
                                textAlign: "center",
                            }}
                        >
                            <Typography fontWeight="bold" mb={1}>
                                {resultData.message}
                            </Typography>
                            <Typography>شناسه: {resultData.scan_id}</Typography>
                            <Typography>کاربر: {resultData.username}</Typography>
                            <Typography>سایت‌ها: {resultData.sites.join(", ")}</Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default SherlockForm;
