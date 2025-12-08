import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    useTheme
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import api from "../../../base/axios/axios.config";

interface InquiryStats {
    total: number;
    saved: number;
    started: number;
    finished: number;
    failed: number;
}

const Dashboard: React.FC = () => {
    const theme = useTheme();

    const isDark = theme.palette.mode === "dark";

    const [stats, setStats] = useState<InquiryStats | null>({
        total: 1025,
        saved: 652,
        started: 568,
        finished: 125,
        failed: 80
    });
    const [loading, setLoading] = useState(false);

    const chartData = stats
        ? [
            { name: "کل استعلام‌ها", value: stats.total },
            { name: "ذخیره شده", value: stats.saved },
            { name: "درحال استعلام", value: stats.started },
            { name: "انجام شده", value: stats.finished },
            { name: "ناموفق", value: stats.failed }
        ]
        : [];

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    background: isDark
                        ? "rgba(30,30,40,0.6)"
                        : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(14px)",
                    border: `1px solid ${
                        isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)"
                    }`,
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <Typography
                        color={"primary"}
                        variant="h5"
                        align="right"
                        fontWeight="bold"
                        gutterBottom
                    >
                        داشبورد استعلام‌ها
                    </Typography>

                    {loading || !stats ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={200}
                        >
                            <CircularProgress color="info" />
                        </Box>
                    ) : (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke={isDark ? "#e0e0e0" : "#333"}
                                />
                                <YAxis stroke={isDark ? "#e0e0e0" : "#333"} />
                                <Tooltip
                                    wrapperStyle={{
                                        backgroundColor: isDark
                                            ? "#2c2c2c"
                                            : "#f6f6f6",
                                        borderRadius: 8,
                                        padding: 5,
                                        border: "1px solid rgba(0,0,0,0.2)"
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="value"
                                    fill={isDark ? "#90caf9" : "#1976d2"}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
