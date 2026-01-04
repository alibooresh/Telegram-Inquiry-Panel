import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, Cell, CartesianGrid
} from "recharts";
import {Typography, useTheme} from "@mui/material";
import {CHART_COLORS} from "../form/Dashboard";

export default function CellIdChart({ data }: any) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    return (
        <>
            <Typography mb={2} fontWeight={600}>
                Top Active CellID / LAC
            </Typography>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? "#1e1e2f" : "#ffffff",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.15)",
                        }}
                        itemStyle={{color:isDark ? "#e0e0e0" : "#555",}}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <XAxis dataKey="cellId"
                           tickMargin={10}
                           stroke={isDark ? "#e0e0e0" : "#555"}/>
                    <YAxis tickMargin={30} stroke={isDark ? "#e0e0e0" : "#555"} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {data.map((_: any, index: number) => (
                            <Cell
                                key={`cellId-${index}`}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
