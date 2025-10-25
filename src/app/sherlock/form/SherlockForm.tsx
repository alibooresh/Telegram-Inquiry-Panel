import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip, CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import api from "../../../base/axios/axios.config";

interface UserSitesRequest {
    username: string;
    sites: string[];
}

const siteOptions = ["twitter", "github", "instagram", "facebook", "tiktok"];

const SherlockForm = () => {
    const [username, setUsername] = useState("");
    const [sites, setSites] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const navigate = useNavigate();
    const [siteOptions, setSiteOptions] = useState<string[]>([]);
    const [loadingSites, setLoadingSites] = useState(false);

    interface SherlockResponse {
        results: string[];
        sites_requested: string[];
        username: string;
    }

    const [resultData, setResultData] = useState<SherlockResponse | null>(null);

    const handleSherlock = async () => {
        if (!username || sites.length === 0) {
            setMessage("لطفا نام کاربری و حداقل یک سایت را انتخاب کنید.");
            return;
        }

        const requestData: UserSitesRequest = {username, sites};

        try {
            setLoading(true);
            setMessage(null);
            setResultData(null);

            const response = await api.post<SherlockResponse>("/scan", requestData);
            setResultData(response.data);
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
                const response = await api.get<{ sites: string[] }>("/sites/list"); // مسیر endpoint بک
                setSiteOptions(response.data.sites);
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
                        backgroundColor: "rgba(30,30,40,0.6)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                    }}
                >
                    <CircularProgress
                        size={80}
                        thickness={4}
                        sx={{
                            color: "rgba(144,202,249,0.8)",
                            borderRadius: "50%",
                            boxShadow: "0 0 20px rgba(144,202,249,0.5)",
                        }}
                    />
                </Box>
            )}

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
                            استعلام نام کاربری
                        </Typography>
                    }
                />
                <CardContent>
                    {/* فیلد نام کاربری */}
                    <TextField
                        type="text"
                        color="success"
                        fullWidth
                        label="نام کاربری"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            maxWidth: 350,
                            mb: 2,
                            ml: 2,
                            "& input": {color: "#fff"},
                            "& .MuiInputLabel-root": {color: "#90caf9"},
                        }}
                    />

                    {/* فیلد انتخاب سایت‌ها */}
                    <FormControl fullWidth sx={{maxWidth: 350, mb: 4}}>
                        <InputLabel sx={{color: "#90caf9"}}>سایت‌ها</InputLabel>
                        <Select
                            multiple
                            value={sites}
                            onChange={(e) => setSites(e.target.value as string[])}
                            input={<OutlinedInput label="سایت‌ها"/>}
                            renderValue={(selected) => (
                                <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} color="primary"/>
                                    ))}
                                </Box>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: "rgba(25, 25, 25, 0.9)",
                                        color: "#fff",
                                        backdropFilter: "blur(6px)",
                                        "& .MuiMenuItem-root:hover": {
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                        },
                                        "& .Mui-selected": {
                                            backgroundColor: "rgba(255,255,255,0.15) !important",
                                        },
                                    },
                                },
                            }}
                            sx={{
                                color: "#fff",
                                "& .MuiOutlinedInput-notchedOutline": {borderColor: "#555"},
                                "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "#888"},
                            }}
                        >
                            {siteOptions.map((site) => (
                                <MenuItem key={site} value={site}>
                                    {site}
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    {/* دکمه استعلام */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSherlock}
                        disabled={loading || !username || sites.length === 0}
                        sx={{
                            height: 56,
                            marginRight: 2,
                        }}
                    >
                        {loading ? "در حال استعلام..." : "استعلام"}
                    </Button>

                    {/* پیام‌ها */}
                    {message && (
                        <Typography variant="body2" color="error" mt={2}>
                            {message}
                        </Typography>
                    )}

                    {resultData && (
                        <Box mt={3} p={2}
                             sx={{background: "rgba(255,255,255,0.05)", borderRadius: 2, textAlign: "left"}}>
                            <Typography variant="body1" fontWeight="bold" mb={1}>
                                نتیجه استعلام برای <strong>{resultData.username}</strong>:
                            </Typography>

                            {resultData.results.map((line, index) => {
                                if (line.startsWith("Error:")) {
                                    return (
                                        <Typography key={index} variant="body2" color="error">
                                            {line.replace("Error:", "❌")}
                                        </Typography>
                                    );
                                } else if (line.startsWith("[+]")) {
                                    // استخراج لینک
                                    const match = line.match(/\[.+?\] (.+?): (.+)/);
                                    if (match) {
                                        const site = match[1];
                                        const url = match[2];
                                        return (
                                            <Typography key={index} variant="body2" color="success.main">
                                                {site}: <a href={url} target="_blank"
                                                           rel="noopener noreferrer">{url}</a>
                                            </Typography>
                                        );
                                    }
                                }
                                return (
                                    <Typography key={index} variant="body2" color="info.main">
                                        {line}
                                    </Typography>
                                );
                            })}
                        </Box>
                    )}

                </CardContent>
            </Card>
        </>
    );
};

export default SherlockForm;
