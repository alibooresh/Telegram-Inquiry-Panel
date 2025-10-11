import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import InquiryDetailService from "../service/InquiryDetailService";
import {GridColDef} from '@mui/x-data-grid';
import Person2Icon from "@mui/icons-material/Person2";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";
import {useLocation, useNavigate} from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const STATUSES = [
    {label: "ذخیره شده", value: "SAVED"},
    {label: "درحال استعلام", value: "STARTED"},
    {label: "انجام شده", value: "FINISHED"},
    {label: "ناموفق", value: "FAILED"},
];

const InquiryForm: React.FC = () => {
    const {t} = useTranslation();
    const service = new InquiryDetailService();
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    useEffect(() => {
        const storedPhone = localStorage.getItem("phoneNumber");
        if (storedPhone) setPhoneNumber(storedPhone);
    }, []);

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 100, headerAlign: "center"},
        {field: "userId", headerName: "شناسه کاربر", groupable: true, width: 200, headerAlign: "center"},
        {field: "firstName", headerName: "نام", width: 100, headerAlign: "center"},
        {field: "lastName", headerName: "نام خانوادگی", width: 100, headerAlign: "center"},
        {field: "phoneNumber", headerName: "شماره تلفن", width: 120, headerAlign: "center"}
    ];

    return (
        <Card sx={{
            width: "100%",
            height: "100%",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
            backdropFilter: "blur(14px)",
            background: "rgba(30,30,40,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#e3f2fd",
        }}>
            <CardHeader
                title={
                    <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                        لیست جزئیات استعلام
                    </Typography>
                }
                action={
                    <Stack textAlign={"left"} direction="row-reverse">
                        <IconButton color="info" title={"بازگشت"}
                                    onClick={() => navigate(-1)}>
                            <ArrowCircleRightOutlinedIcon/>
                        </IconButton>
                        <IconButton color="warning" title={"پروفایل"}
                                    onClick={() => navigate("/")}>
                            <Person2Icon/>
                        </IconButton>
                    </Stack>
                }
            />
            <CardContent className={"profile-content"}>
                <CustomDataGrid
                    columns={columns}
                    requestConfig={{
                        url: "/inquiryDetail/search",
                        params: {id: id}
                    }}
                    pageSize={10}
                    enableActions
                    actions={[
                        {
                            color: "primary",
                            icon: <ListAltIcon/>,
                            label: 'جزئیات',
                            onClick: (row) => navigate("/inquiryDetail/view", {state: {id: row.id}})
                        }
                    ]}
                />
            </CardContent>
        </Card>
    );
};

export default InquiryForm;
