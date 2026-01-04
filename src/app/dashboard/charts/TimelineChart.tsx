import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, CartesianGrid
} from "recharts";
import {Typography, useTheme} from "@mui/material";

export default function TimelineChart({ data }: any) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    return (
        <>
            <Typography mb={2} fontWeight={600}>
                IMSI Detection Timeline
            </Typography>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                    />
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        stroke={isDark ? "#e0e0e0" : "#555"}
                    />
                    <YAxis tickMargin={30} stroke={isDark ? "#e0e0e0" : "#555"} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? "#1e1e2f" : "#ffffff",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.15)",
                        }}
                        itemStyle={{color:isDark ? "#e0e0e0" : "#555",}}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="count"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
