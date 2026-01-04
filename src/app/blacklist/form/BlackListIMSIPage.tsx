import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    IconButton,
    CircularProgress,
    useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "../../../base/axios/axios.config";

interface BlacklistItem {
    id: number;
    imsi: string;
    created_at: string;
}

export default function BlacklistIMSIPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [imsi, setImsi] = useState("");
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [items, setItems] = useState<BlacklistItem[]>([]);

    /* 🔹 Load blacklist */
    const loadBlacklist = async () => {
        setListLoading(true);
        try {
            const res = await api.get<BlacklistItem[]>("/blacklist");
            setItems(res.data);
        } finally {
            setListLoading(false);
        }
    };

    useEffect(() => {
        loadBlacklist();
    }, []);

    /* ➕ Add IMSI */
    const handleAdd = async () => {
        if (!imsi) return;

        setLoading(true);
        try {
            await api.post("/blacklist", { imsi });
            setImsi("");
            loadBlacklist();
        } finally {
            setLoading(false);
        }
    };

    /* 🗑 Delete IMSI */
    const handleDelete = async (id: number) => {
        await api.delete(`/blacklist/${id}`);
        loadBlacklist();
    };

    const columns: GridColDef[] = [
        {
            field: "imsi",
            headerName: "IMSI",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <span style={{ direction: "ltr" }}>{params.value}</span>
            ),
        },
        {
            field: "created_at",
            headerName: "تاریخ ثبت",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "actions",
            headerName: "عملیات",
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box maxWidth={900} mx="auto" mt={4} px={2}>
            {/* ➕ Add Form */}
            <Card
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    background: isDark
                        ? "rgba(30,30,40,0.6)"
                        : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <BlockIcon color="error"
                            />
                            <Typography fontWeight="bold">
                                افزودن IMSI به لیست سیاه
                            </Typography>
                        </Stack>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                fullWidth
                                label="IMSI"
                                value={imsi}
                                onChange={(e) => setImsi(e.target.value)}
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                            />

                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleAdd}
                                disabled={!imsi || loading}
                                sx={{
                                    px: 4,
                                    marginRight:10,
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={22} color="inherit" />
                                ) : (
                                    "افزودن"
                                )}
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {/* 📋 List */}
            <Card
                sx={{
                    borderRadius: 3,
                    background: isDark
                        ? "rgba(30,30,40,0.6)"
                        : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <CardContent>
                    <Typography fontWeight="bold" mb={2}>
                        لیست IMSI های مسدود
                    </Typography>

                    <Box height={420}>
                        {listLoading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <DataGrid
                                rows={items}
                                columns={columns}
                                pageSizeOptions={[5, 10, 20]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 10, page: 0 },
                                    },
                                }}
                                disableRowSelectionOnClick
                            />
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
