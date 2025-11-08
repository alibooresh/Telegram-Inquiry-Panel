import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import InquiryService from "../service/InquiryService";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";

interface ScanItem {
    id: number;
    username: string;
    total_sites: number;
    start_time: string;
    end_time?: string;
    duration?: string;
    status?: string;
}

const InquiryForm: React.FC = () => {
    const service = new InquiryService();
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70, headerAlign: "center" },
        { field: "username", headerName: "نام کاربری", width: 180, headerAlign: "center" },
        { field: "total_sites", headerName: "تعداد سایت‌ها", width: 150, headerAlign: "center" },
        { field: "duration", headerName: "مدت زمان (ثانیه)", width: 180, headerAlign: "center" },
        { field: "status", headerName: "وضعیت", width: 140, headerAlign: "center" },
        { field: "start_time", headerName: "شروع استعلام", width: 230, headerAlign: "center" },
        { field: "end_time", headerName: "پایان استعلام", width: 230, headerAlign: "center" },
    ];

    const startInquiry = (id: any) => {
        service
            .startInquiry({ inquiryId: id })
            .then(() => {})
            .catch(() => {})
            .finally(() => {});
    };

    const transformResponse = (response: any) => {
        return response.scans.map((item: any) => {
            const duration = item.end_time
                ? (
                    (new Date(item.end_time).getTime() -
                        new Date(item.start_time).getTime()) /
                    1000
                ).toFixed(2)
                : "-";

            const status = item.end_time ? "انجام شده" : "در حال استعلام";

            return {
                ...item,
                duration,
                status,
            };
        });
    };

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                backdropFilter: "blur(14px)",
                background: "rgba(30,30,40,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e3f2fd",
            }}
        >
            <CardHeader
                title={
                    <Typography
                        variant="h5"
                        align="right"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ color: "#e3f2fd" }}
                    >
                        لیست استعلامات
                    </Typography>
                }
                action={
                    <Stack direction="row-reverse" spacing={1}>
                        <IconButton
                            color="info"
                            title="بازگشت"
                            onClick={() => navigate(-1)}
                            sx={{ color: "#90caf9" }}
                        >
                            <ArrowCircleRightOutlinedIcon />
                        </IconButton>
                        <IconButton
                            color="warning"
                            title="پروفایل"
                            onClick={() => navigate("/profile")}
                            sx={{ color: "#ffb74d" }}
                        >
                            <Person2Icon />
                        </IconButton>
                        <IconButton
                            color="success"
                            title="استعلام جدید"
                            onClick={() => navigate("/sherlock")}
                            sx={{ color: "#81c784" }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Stack>
                }
            />

            <CardContent sx={{ p: 2 }}>
                <CustomDataGrid
                    columns={columns}
                    requestConfig={{
                        url: "http://212.23.201.242:5000/inquiry/search",
                        params: { page: 1, size: 10 },
                        transformResponse,
                    }}
                    pageSize={10}
                    enableActions
                    actions={[
                        {
                            color: "primary",
                            icon: <ListAltIcon />,
                            label: "جزئیات استعلام",
                            onClick: (row) =>
                                navigate("/inquiryDetail", { state: { id: row.id } }),
                        }
                    ]}
                />
            </CardContent>
        </Card>
    );
};

export default InquiryForm;
