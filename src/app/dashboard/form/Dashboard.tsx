import {
    Box,
    Paper,
    Typography,
    CircularProgress
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OperatorsChart from "../charts/OperatorsChart";
import CellIdChart from "../charts/CellIdChart";
import TimelineChart from "../charts/TimelineChart";
import Grid from "@mui/material/GridLegacy";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
});

export const CHART_COLORS = [
    "#42a5f5", // blue
    "#66bb6a", // green
    "#ffa726", // orange
    "#ab47bc", // purple
    "#ef5350", // red
];

export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const scriptId = searchParams.get("scriptId");
    const numericScriptId = scriptId ? Number(scriptId) : null;

    const [loading, setLoading] = useState(true);
    const [operators, setOperators] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [cellIds, setCellIds] = useState([]);

    useEffect(() => {
        if (!numericScriptId) return;

        setLoading(true);

        Promise.all([
            api.get("/dashboard/operators", {
                params: { scriptId: numericScriptId },
            }),
            api.get("/dashboard/timeline", {
                params: { scriptId: numericScriptId },
            }),
            api.get("/dashboard/top-cells", {
                params: { scriptId: numericScriptId },
            }),
        ])
            .then(([opRes, timeRes, cellRes]) => {
                setOperators(opRes.data);
                setTimeline(timeRes.data);
                setCellIds(cellRes.data);
            })
            .finally(() => setLoading(false));
    }, [numericScriptId]);

    if (!numericScriptId) {
        return (
            <Box
                height="60vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography color="text.secondary">
                    اسکریپتی انتخاب نشده است
                </Typography>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                height="60vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h5" mb={3}>
                IMSI Detection Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, height: 360 }}>
                        <OperatorsChart data={operators} />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, height: 360 }}>
                        <CellIdChart data={cellIds} />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, height: 420 }}>
                        <TimelineChart data={timeline} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
