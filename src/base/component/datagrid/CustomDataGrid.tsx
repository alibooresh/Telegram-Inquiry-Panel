import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { CircularProgress, Box } from "@mui/material";
import api from "../../axios/axios.config";

interface CustomDataGridProps<T> {
    columns: GridColDef[];
    rows?: T[]; // وقتی دیتا از بیرون پاس داده بشه
    fetchUrl?: string; // وقتی دیتا از API گرفته بشه
    pageSize?: number; // تعداد رکورد در هر صفحه
    enableActions?: boolean; // ستون عملیات
    onActionClick?: (row: T) => void; // هندلر برای اکشن
}

function CustomDataGrid<T extends { id: string | number }>({
                                                               columns,
                                                               rows,
                                                               fetchUrl,
                                                               pageSize = 10,
                                                               enableActions = false,
                                                               onActionClick,
                                                           }: CustomDataGridProps<T>) {
    const [data, setData] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);

    // گرفتن دیتا از API
    useEffect(() => {
        if (fetchUrl) {
            setLoading(true);
            api
                .get(fetchUrl, { params: { page: page + 1, size: pageSize } }) // بک‌اند باید ساپورت کنه
                .then((res) => {
                    setData(res.data.items); // فرض: ریسپانس شامل { items, total }
                    setRowCount(res.data.total);
                })
                .finally(() => setLoading(false));
        } else if (rows) {
            setRowCount(rows.length);
            setData(rows.slice(page * pageSize, (page + 1) * pageSize));
        }
    }, [page, rows, fetchUrl, pageSize]);

    // اضافه کردن ستون اکشن
    const finalColumns: GridColDef[] = [...columns];
    if (enableActions && onActionClick) {
        finalColumns.push({
            field: "actions",
            headerName: "عملیات",
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: (params) => (
                <button onClick={() => onActionClick(params.row)}>جزئیات</button>
            ),
        });
    }

    return (
        <Box sx={{ height: 500, width: "100%" }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : (
                <DataGrid
                    rows={data}
                    columns={finalColumns}
                    pagination
                    paginationMode={fetchUrl ? "server" : "client"}
                    rowCount={rowCount}
                    paginationModel={{ pageSize, page }}
                    onPaginationModelChange={(model) => setPage(model.page)}
                    pageSizeOptions={[5, 10, 20]}
                    localeText={{
                        noRowsLabel: "هیچ داده‌ای برای نمایش وجود ندارد",
                        footerRowSelected: (count) =>
                            count !== 1 ? `${count.toLocaleString()} ردیف انتخاب شده` : `${count.toLocaleString()} ردیف انتخاب شده`,
                        footerTotalRows: "تعداد کل ردیف‌ها:",
                        paginationRowsPerPage:"ردیف در هر صفحه",
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
                    }}
                />
            )}
        </Box>
    );
}

export default CustomDataGrid;
