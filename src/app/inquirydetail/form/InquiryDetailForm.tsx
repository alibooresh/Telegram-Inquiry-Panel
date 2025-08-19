import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box, Button, Card, CardContent, CardHeader, Checkbox,
    CircularProgress,
    Divider, FormControlLabel, FormGroup, IconButton,
    List,
    ListItem,
    ListItemText,
    Paper, Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import InquiryDetailService from "../service/InquiryDetailService";
import InquiryDetailModel from "../model/InquiryDetailModel";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";
import {useLocation, useNavigate} from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';

const STATUSES = [
    { label: "ذخیره شده", value: "SAVED" },
    { label: "درحال استعلام", value: "STARTED" },
    { label: "انجام شده", value: "FINISHED" },
    { label: "ناموفق", value: "FAILED" },
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
        {field: "userId", headerName: "شناسه کاربر", groupable:true, width: 200, headerAlign: "center"},
        {field: "firstName", headerName: "نام", width: 100, headerAlign: "center"},
        {field: "lastName", headerName: "نام خانوادگی", width: 100, headerAlign: "center"},
        {field: "phoneNumber", headerName: "شماره تلفن", width: 120, headerAlign: "center"}
    ];

    return (
        <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
            <CardHeader
                title={
                    <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                        لیست جزئیات استعلام
                    </Typography>
                }
                action={
                    <Stack textAlign={"left"} direction="row-reverse">
                        <IconButton title={"خروج"} color="error"
                                    onClick={() => navigate("/login")}>
                            <LogoutIcon/>
                        </IconButton>
                        <IconButton color="primary" title={"پروفایل"}
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
                            color:"primary",
                            icon:<ListAltIcon/>,
                            label:'جزئیات',
                            onClick:(row) => navigate("/inquiryDetail/view", {state: {id: row.id}})
                        }
                    ]}
                />
            </CardContent>
        </Card>
    );
};

export default InquiryForm;
