import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import type { AxiosRequestConfig } from "axios";
import { type ReactNode, useEffect, useState } from "react";
import api from "../../axios/axios.config";

interface CustomDataGridProps<T> {
    columns: GridColDef[];
    rows?: T[];
    requestConfig?: AxiosRequestConfig;
    pageSize?: number;
    enableActions?: boolean;
    actions?: GridAction<T>[];
}

export interface GridAction<T = any> {
    label: string;
    icon?: ReactNode;
    onClick: (row: T) => void;
    color?:
        | "inherit"
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
}

function CustomDataGrid<T extends { id: string | number }>({
                                                               columns,
                                                               rows,
                                                               requestConfig,
                                                               pageSize = 10,
                                                               enableActions = false,
                                                               actions = [],
                                                           }: CustomDataGridProps<T>) {
    const [data, setData] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSizeState, setPageSizeState] = useState(pageSize);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        if (requestConfig) {
            setLoading(true);
            api
                .get(requestConfig.url!, {
                    params: {
                        ...requestConfig.params,
                        page: page,
                        size: pageSizeState,
                    },
                })
                .then((res) => {
                    setData(res.data.content);
                    setRowCount(res.data.totalElements);
                })
                .finally(() => setLoading(false));
        } else if (rows) {
            setRowCount(rows.length);
            setData(rows.slice(page * pageSizeState, (page + 1) * pageSizeState));
        }
    }, [page, rows, requestConfig, pageSizeState]);

    // وسط‌چین کردن تمام ستون‌ها و اضافه کردن ستون عملیات
    const finalColumns: GridColDef[] = columns.map(col => ({
        ...col,
        headerAlign: "center",
        align: "center",
    }));

    if (enableActions && actions?.length) {
        finalColumns.push({
            field: "actions",
            headerName: "عملیات",
            sortable: false,
            filterable: false,
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Box display="flex" gap={1} justifyContent="center">
                    {actions.map((action, index) => (
                        <IconButton
                            key={index}
                            color={action.color || "primary"}
                            title={action.label}
                            onClick={() => action.onClick(params.row)}
                            size="small"
                        >
                            {action.icon}
                        </IconButton>
                    ))}
                </Box>
            ),
        });
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                height: "100%",
                background: "rgba(30,30,40,0.6)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                color: "#e3f2fd",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                    <CircularProgress color="info" />
                </Box>
            ) : (
                <DataGrid
                    rows={data}
                    columns={finalColumns}
                    pagination
                    paginationMode={requestConfig ? "server" : "client"}
                    rowCount={rowCount}
                    paginationModel={{ page, pageSize: pageSizeState }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setPageSizeState(model.pageSize);
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    localeText={{
                        noRowsLabel: "هیچ داده‌ای برای نمایش وجود ندارد",
                        footerRowSelected: (count) =>
                            count !== 1
                                ? `${count.toLocaleString()} ردیف انتخاب شده`
                                : `${count.toLocaleString()} ردیف انتخاب شده`,
                        footerTotalRows: "تعداد کل ردیف‌ها:",
                        paginationRowsPerPage: "ردیف در هر صفحه",
                    }}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            color: "#e3f2fd",
                            backgroundColor: "transparent",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgba(50,50,60,0.6)",
                            color: "#117fd0",
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "bold",
                            textAlign: "center",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "rgba(50,50,60,0.6)",
                            color: "#e3f2fd",
                        },
                        '& .MuiDataGrid-cell:focus': { outline: 'none' },
                        '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
                    }}
                />
            )}
        </Box>
    );
}

export default CustomDataGrid;
