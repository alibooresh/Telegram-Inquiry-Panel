import React, {ReactNode, useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {Box, CircularProgress, IconButton} from "@mui/material";
import api from "../../axios/axios.config";
import DeleteIcon from '@mui/icons-material/Delete';
import {AxiosRequestConfig} from "axios";

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
    color?:'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

function CustomDataGrid<T extends { id: string | number }>({
                                                               columns,
                                                               rows,
                                                               requestConfig,
                                                               pageSize = 5,
                                                               enableActions = false,
                                                               actions = [],
                                                           }: CustomDataGridProps<T>) {
    const [data, setData] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);


    useEffect(() => {
        if (requestConfig) {
            setLoading(true);
            api
                .get(requestConfig.url!, {
                    params:
                        {
                            ...requestConfig.params,
                            page: page,
                            size: pageSize
                        }
                })
                .then((res) => {

                    setData(res.data.content);
                    setRowCount(res.data.totalElements);
                })
                .finally(() => setLoading(false));
        } else if (rows) {
            setRowCount(rows.length);
            setData(rows.slice(page * pageSize, (page + 1) * pageSize));
        }
    }, [page, rows, requestConfig, pageSize]);


    const finalColumns: GridColDef[] = [...columns];

    if (enableActions && actions?.length) {
        finalColumns.push({
            field: "actions",
            headerName: "عملیات",
            sortable: false,
            filterable: false,
            width: 150,
            headerAlign: "center",
            pinnable: false,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
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
                </div>
            ),
        });
    }

    return (
        <Box sx={{height: 500, width: "100%"}}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress/>
                </Box>
            ) : (
                <DataGrid
                    rows={data}
                    columns={finalColumns}
                    pagination
                    paginationMode={requestConfig ? "server" : "client"}
                    rowCount={rowCount}
                    paginationModel={{pageSize, page}}
                    onPaginationModelChange={(model) => setPage(model.page)}
                    pageSizeOptions={[5, 10, 20]}
                    localeText={{
                        noRowsLabel: "هیچ داده‌ای برای نمایش وجود ندارد",
                        footerRowSelected: (count) =>
                            count !== 1 ? `${count.toLocaleString()} ردیف انتخاب شده` : `${count.toLocaleString()} ردیف انتخاب شده`,
                        footerTotalRows: "تعداد کل ردیف‌ها:",
                        paginationRowsPerPage: "ردیف در هر صفحه",

                    }}
                    sx={{

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f5f5f5",
                            fontWeight: "bold",
                            textAlign: "center"
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "center",
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                />
            )}
        </Box>
    );
}

export default CustomDataGrid;
