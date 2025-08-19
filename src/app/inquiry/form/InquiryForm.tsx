import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material";
import InquiryService from "../service/InquiryService";
import InquiryModel from "../model/InquiryModel";
import {useTranslation} from "react-i18next";
import {GridColDef} from "@mui/x-data-grid";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const STATUSES = [
    {label: "ذخیره شده", value: "SAVED"},
    {label: "درحال استعلام", value: "STARTED"},
    {label: "انجام شده", value: "FINISHED"},
    {label: "ناموفق", value: "FAILED"},
];

const InquiryForm: React.FC = () => {
    const {t} = useTranslation();
    const service = new InquiryService();
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [requests, setRequests] = useState<InquiryModel[]>([]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    const handleToggle = (value: string) => {
        setSelected((prev) => {
            const newSelected = prev.includes(value)
                ? prev.filter((x) => x !== value)
                : [...prev, value];
            setStatuses(newSelected);
            return newSelected;
        });
    };

    const clearFilter = () => {
        setSelected([]);
        setStatuses([]);
    };
    useEffect(() => {
        const storedPhone = localStorage.getItem("phoneNumber");
        if (storedPhone) setPhoneNumber(storedPhone);
    }, []);
    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 40, headerAlign: "center"},
        {field: "duration", headerName: "مدت زمان استعلام", width: 200, headerAlign: "center"},
        {field: "status", headerName: "وضعیت", width: 120, headerAlign: "center"},
        {field: "createdAt", headerName: "تاریخ ایجاد", width: 250, headerAlign: "center"},
    ];

    const startInquiry = (id:any) => {
      service.startInquiry({inquiryId:id}).then(value => {

      }).catch(reason => {

      }).finally(() => {});
    }

    return (
        <>
            <Card sx={{maxWidth: 800, margin: "2rem auto", borderRadius: 3, boxShadow: 3}}>
                <CardHeader
                    title={
                        <Typography variant="h5" align="right" fontWeight="bold" gutterBottom>
                            لیست استعلامات
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
                            <IconButton color="success" title={"استعلام جدید"}
                                        onClick={() => navigate("/inquiry/new")}>
                                <AddCircleIcon/>
                            </IconButton>
                        </Stack>
                    }
                />
                <CardContent className={"profile-content"}>
                    {/*<Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mb: 2 }}>*/}
                    {/*    <Typography variant="subtitle1" fontWeight="bold" mb={1}>*/}
                    {/*        فیلتر وضعیت*/}
                    {/*    </Typography>*/}
                    {/*    <FormGroup sx={{display:"block"}}>*/}
                    {/*        {STATUSES.map((status) => (*/}
                    {/*            <FormControlLabel*/}
                    {/*                key={status.value}*/}
                    {/*                control={*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={selected.includes(status.value)}*/}
                    {/*                        onChange={() => handleToggle(status.value)}*/}
                    {/*                    />*/}
                    {/*                }*/}
                    {/*                label={status.label}*/}
                    {/*            />*/}
                    {/*        ))}*/}
                    {/*    </FormGroup>*/}
                    {/*    {selected.length > 0 && (*/}
                    {/*        <Button size="small" onClick={clearFilter}>*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*</Box>*/}
                    <CustomDataGrid
                        columns={columns}
                        requestConfig={{
                            url: "/inquiry/search",
                            params: {statuses: statuses}
                        }}
                        pageSize={10}
                        enableActions
                        actions={[
                            {
                                color:"primary",
                                icon:<ListAltIcon/>,
                                label:'جزئیات استعلام',
                                onClick:(row) => navigate("/inquiryDetail", {state: {id: row.id}})
                            },
                            {
                                color:"success",
                                icon:<PublishedWithChangesIcon/>,
                                label:'شروع استعلام',
                                onClick:(row) => startInquiry(row.id)
                        }
                            ]}
                    />
                </CardContent>
            </Card>
            {/*<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">*/}
            {/*    <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 800}}>*/}
            {/*        <Box>*/}
            {/*            <AppBar position="static">*/}
            {/*                <Toolbar>*/}
            {/*                    <Typography variant="h6" dir={'rtl'} sx={{flexGrow: 1}}>*/}
            {/*                        {t('ایست استعلام')}*/}
            {/*                    </Typography>*/}
            {/*                    <Typography variant="body1">*/}
            {/*                        {phoneNumber}*/}
            {/*                    </Typography>*/}
            {/*                </Toolbar>*/}
            {/*            </AppBar>*/}
            {/*            <CustomDataGrid*/}
            {/*                columns={columns}*/}
            {/*                rows={mockInquiries}*/}
            {/*                pageSize={10}*/}
            {/*                enableActions*/}
            {/*                onActionClick={(row) => alert("جزئیات رکورد: " + row.id)}*/}
            {/*            />*/}
            {/*        </Box>*/}
            {/*    </Paper>*/}
            {/*</Box>*/}

        </>

    );
};

export default InquiryForm;
