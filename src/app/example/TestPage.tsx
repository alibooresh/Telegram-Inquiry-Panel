import React, { useState } from "react";
import { Box, Button, Collapse, TextField } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "../../base/component/datagrid/CustomDataGrid";
import Grid from "@mui/material/GridLegacy";
import axios from "axios";

export const terminalColumns: GridColDef[] = [
    { field: "count", headerName: "تعداد تکرار", width: 100, headerAlign: "center", align: "center" },
    { field: "cellId", headerName: "CellId", width: 100, headerAlign: "center", align: "center" },
    { field: "lac", headerName: "LAC", width: 100, headerAlign: "center", align: "center" },
    { field: "mnc", headerName: "MNC", width: 80, headerAlign: "center", align: "center" },
    { field: "mcc", headerName: "MCC", width: 80, headerAlign: "center", align: "center" },
    { field: "operator", headerName: "اپراتور", width: 250, headerAlign: "center", align: "center",
        renderCell: (params) => params.value === 'MTN Irancell Telecommunications Services Company' ? "شرکت خدمات مخابراتی ام‌تی‌ان ایرانسل" : params.value
    },
    { field: "brand", headerName: "برند", width: 150, headerAlign: "center", align: "center",
        renderCell: (params) => params.value === 'MTN Irancell' ? "ایرانسل" : params.value
    },
    { field: "country", headerName: "کشور", width: 100, headerAlign: "center", align: "center",
        renderCell: (params) => params.value === 'Iran' ? "ایران" : params.value
    },
    { field: "tmsi2", headerName: "TMSI-2", width: 120, headerAlign: "center", align: "center" },
    { field: "tmsi1", headerName: "TMSI-1", width: 120, headerAlign: "center", align: "center" },
    {
        field: "imsi", headerName: "IMSI", width: 180, headerAlign: "center", align: "center",
        renderCell: (params) => (
            <span style={{ direction: "ltr", unicodeBidi: "plaintext" }}>
                {params.value}
            </span>
        ),
    },
    { field: "last_seen", headerName: "زمان", width: 220, headerAlign: "center", align: "center" },
];

export default function TestPage() {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [filters, setFilters] = useState({
        imsi: "",
        operator: "",
        country: "",
        brand: "",
    });
    const [gridKey, setGridKey] = useState(0); // برای رفرش دیتاگرید بعد از جستجو

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        // با هر جستجو، key دیتاگرید را تغییر می‌دهیم تا دیتاگرید مجدداً داده‌ها را از سرور بگیرد
        setGridKey(prev => prev + 1);
    };

    // ساخت Query Params برای GET
    const getRequestConfig = () => {
        const params: Record<string, string> = {};
        if (filters.imsi) params.imsi = filters.imsi;
        if (filters.operator) params.operator = filters.operator;
        if (filters.country) params.country = filters.country;
        if (filters.brand) params.brand = filters.brand;
        params.page = "0";
        params.size = "20";

        return {
            url: "http://127.0.0.1:5000/imsi",
            method: "GET",
            params,
        };
    };

    return (
        <Box sx={{ width: "100%", padding: "10px" }}>
            {/* دکمه جستجوی پیشرفته */}
            <Button
                variant="contained"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                sx={{ marginBottom: 2 }}
            >
                جستجوی پیشرفته
            </Button>

            {/* فرم جستجوی پیشرفته */}
            <Collapse in={showAdvancedSearch}>
                <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
                    <Grid container spacing={2}>
                        {["imsi", "operator", "country", "brand"].map((key) => (
                            <Grid item xs={12} sm={6} md={3} key={key}>
                                <TextField
                                    fullWidth
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
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

            {/* دیتاگرید */}
            <CustomDataGrid
                key={gridKey} // با تغییر این key، دیتاگرید رفرش می‌شود
                requestConfig={getRequestConfig()}
                columns={terminalColumns}
                pageSize={10}
                enableActions={true}
            />
        </Box>
    );
}
