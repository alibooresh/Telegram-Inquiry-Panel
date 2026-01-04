import React, { useMemo, useState } from "react";
import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "../../base/component/datagrid/CustomDataGrid";
import Grid from "@mui/material/GridLegacy";
import { useSearchParams } from "react-router-dom";

export const terminalColumns: GridColDef[] = [
    { field: "count", headerName: "تعداد تکرار", width: 100, headerAlign: "center", align: "center" },
    { field: "cellId", headerName: "CellId", width: 100, headerAlign: "center", align: "center" },
    { field: "lac", headerName: "LAC", width: 100, headerAlign: "center", align: "center" },
    { field: "mnc", headerName: "MNC", width: 80, headerAlign: "center", align: "center" },
    { field: "mcc", headerName: "MCC", width: 80, headerAlign: "center", align: "center" },
    {
        field: "operator",
        headerName: "اپراتور",
        width: 250,
        headerAlign: "center",
        align: "center",
        renderCell: (params) =>
            params.value === "MTN Irancell Telecommunications Services Company"
                ? "شرکت خدمات مخابراتی ام‌تی‌ان ایرانسل"
                : params.value,
    },
    {
        field: "brand",
        headerName: "برند",
        width: 150,
        headerAlign: "center",
        align: "center",
        renderCell: (params) =>
            params.value === "MTN Irancell" ? "ایرانسل" : params.value,
    },
    {
        field: "country",
        headerName: "کشور",
        width: 100,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (params.value === "Iran" ? "ایران" : params.value),
    },
    { field: "tmsi2", headerName: "TMSI-2", width: 120, headerAlign: "center", align: "center" },
    { field: "tmsi1", headerName: "TMSI-1", width: 120, headerAlign: "center", align: "center" },
    {
        field: "imsi",
        headerName: "IMSI",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
            <span style={{ direction: "ltr", unicodeBidi: "plaintext" }}>
                {params.value}
            </span>
        ),
    },
    { field: "last_seen", headerName: "زمان", width: 220, headerAlign: "center", align: "center" },
];

export default function TestPage() {
    const [searchParams] = useSearchParams();
    const scriptId = searchParams.get("scriptId");

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [filters, setFilters] = useState({
        imsi: "",
        operator: "",
        country: "",
        brand: "",
    });
    const [gridKey, setGridKey] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        setGridKey((prev) => prev + 1);
    };

    const requestConfig = useMemo(() => {
        if (!scriptId) return null;

        const params: Record<string, string> = {
            page: "0",
            size: "20",
            scriptId,
        };

        if (filters.imsi) params.imsi = filters.imsi;
        if (filters.operator) params.operator = filters.operator;
        if (filters.country) params.country = filters.country;
        if (filters.brand) params.brand = filters.brand;

        return {
            url: "http://127.0.0.1:5000/imsi",
            method: "GET",
            params,
        };
    }, [filters, scriptId, gridKey]);

    // ❌ اگر scriptId نداشت
    if (!scriptId) {
        return (
            <Box
                height="70vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={2}
            >
                <Typography variant="h6" color="text.secondary">
                    هیچ اطلاعاتی برای نمایش وجود ندارد
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    لطفاً از بخش اسکریپت‌ها اقدام نمایید
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", padding: "10px" }}>
            {/* جستجوی پیشرفته */}
            <Button
                variant="contained"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                sx={{ marginBottom: 2 }}
            >
                جستجوی پیشرفته
            </Button>

            <Collapse in={showAdvancedSearch}>
                <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2, marginBottom: 2 }}>
                    <Grid container spacing={2}>
                        {["imsi", "operator", "country", "brand"].map((key) => (
                            <Grid item xs={12} sm={6} md={3} key={key}>
                                <TextField
                                    fullWidth
                                    label={key.toUpperCase()}
                                    name={key}
                                    value={filters[key as keyof typeof filters]}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="contained" onClick={handleSearch}>
                            جستجو
                        </Button>
                    </Box>
                </Box>
            </Collapse>

            {/* DataGrid */}
            {requestConfig && (
                <CustomDataGrid
                    key={gridKey}
                    requestConfig={requestConfig}
                    columns={terminalColumns}
                    blockField="isBlocked"
                    pageSize={10}
                    enableActions
                />
            )}
        </Box>
    );
}
