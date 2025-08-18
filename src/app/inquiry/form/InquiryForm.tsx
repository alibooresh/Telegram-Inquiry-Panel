import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import InquiryService from "../service/InquiryService";
import InquiryModel from "../model/InquiryModel";
import {useTranslation} from "react-i18next";
import {GridColDef} from "@mui/x-data-grid";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";

const InquiryForm: React.FC = () => {
    const {t} = useTranslation();
    const service = new InquiryService();
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    let reqs :InquiryModel[]=[
        {
            id: '1',
            title: 'string',
            status: 'انجام شده',
            createdAt: '1404/05/01',
            duration:'200',
            recordCount:'3500'
        },
        {
            id: '2',
            title: 'weqe',
            status: 'در حال انجام',
            createdAt: '1404/05/05',
            duration:'750',
            recordCount:'100'
        }
    ]
    const [requests, setRequests] = useState<InquiryModel[]>(reqs);
    useEffect(() => {
        const storedPhone = localStorage.getItem("phoneNumber");
        if (storedPhone) setPhoneNumber(storedPhone);

        service.inquiryList({}).then((res) => {
                setRequests(res.data);
            })
            .catch((err) => {
                console.error("Error fetching requests:", err);
            })
            .finally(() => {
                setRequests(reqs)
                setLoading(false)
            });
    }, []);
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 , headerAlign: "center"},
        { field: "title", headerName: "عنوان", width: 200 , headerAlign: "center"},
        { field: "status", headerName: "وضعیت", width: 120 , headerAlign: "center"},
        { field: "createdAt", headerName: "تاریخ ایجاد", width: 180 , headerAlign: "center"},
    ];

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 800}}>
                <Box>

                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" dir={'rtl'} sx={{flexGrow: 1}}>
                                {t('ایست استعلام')}
                            </Typography>
                            <Typography variant="body1">
                                {phoneNumber}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <CustomDataGrid
                        columns={columns}
                        rows={mockInquiries}
                        // fetchUrl="/requests" // یا rows={[...]} اگر دیتا لوکال باشه
                        pageSize={10}
                        enableActions
                        onActionClick={(row) => alert("جزئیات رکورد: " + row.id)}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default InquiryForm;
export interface Inquiry {
    id: number;
    title: string;
    status: "جدید" | "در حال بررسی" | "تکمیل شده";
    createdAt: string;
}

export const mockInquiries: Inquiry[] = [
    { id: 1, title: "استعلام شماره ۱", status: "جدید", createdAt: "2025-08-01" },
    { id: 2, title: "استعلام شماره ۲", status: "در حال بررسی", createdAt: "2025-08-02" },
    { id: 3, title: "استعلام شماره ۳", status: "تکمیل شده", createdAt: "2025-08-03" },
    { id: 4, title: "استعلام شماره ۴", status: "جدید", createdAt: "2025-08-04" },
    { id: 5, title: "استعلام شماره ۵", status: "در حال بررسی", createdAt: "2025-08-05" },
    { id: 6, title: "استعلام شماره ۶", status: "تکمیل شده", createdAt: "2025-08-06" },
    { id: 7, title: "استعلام شماره ۷", status: "جدید", createdAt: "2025-08-07" },
    { id: 8, title: "استعلام شماره ۸", status: "در حال بررسی", createdAt: "2025-08-08" },
    { id: 9, title: "استعلام شماره ۹", status: "تکمیل شده", createdAt: "2025-08-09" },
    { id: 10, title: "استعلام شماره ۱۰", status: "جدید", createdAt: "2025-08-10" },
    { id: 11, title: "استعلام شماره ۱۱", status: "در حال بررسی", createdAt: "2025-08-11" },
    { id: 12, title: "استعلام شماره ۱۲", status: "تکمیل شده", createdAt: "2025-08-12" },
    { id: 13, title: "استعلام شماره ۱۳", status: "جدید", createdAt: "2025-08-13" },
    { id: 14, title: "استعلام شماره ۱۴", status: "در حال بررسی", createdAt: "2025-08-14" },
    { id: 15, title: "استعلام شماره ۱۵", status: "تکمیل شده", createdAt: "2025-08-15" },
];