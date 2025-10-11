import React, {useState} from "react";
import {Card, CardContent, CardHeader, IconButton, Stack, Typography} from "@mui/material";
import InquiryService from "../service/InquiryService";
import {useNavigate} from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CustomDataGrid from "../../../base/component/datagrid/CustomDataGrid";
import {GridColDef} from "@mui/x-data-grid";
interface LabelValueModel {
    label:string,
    value:string
}
const STATUSES:LabelValueModel[] = [
    {label: "ذخیره شده", value: "SAVED"},
    {label: "درحال استعلام", value: "STARTED"},
    {label: "انجام شده", value: "FINISHED"},
    {label: "ناموفق", value: "FAILED"},
];

const InquiryForm: React.FC = () => {
    const service = new InquiryService();
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState<string[]>([]);

    const columns: GridColDef<{ id: string | number }>[] = [
        { field: "id", headerName: "ID", width: 40, headerAlign: "center", type: "number" },
        { field: "duration", headerName: "مدت زمان استعلام", width: 200, headerAlign: "center", type: "string" },
        { field: "status", headerName: "وضعیت", width: 120, headerAlign: "center", type: "string", renderCell:(params) => convertStatus(params.value) },
        { field: "dateFa", headerName: "تاریخ ایجاد", width: 250, headerAlign: "center", type: "string" },
    ];

    const convertStatus = (status:string) => {
        let state = STATUSES.filter(value => value.value===status)[0];
        return state.label;
    }

    const startInquiry = (id: any) => {
        service
            .startInquiry({inquiryId: id})
            .then(() => {
            })
            .catch(() => {
            })
            .finally(() => {
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
                        sx={{color: "#e3f2fd"}}
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
                            sx={{color: "#90caf9"}}
                        >
                            <ArrowCircleRightOutlinedIcon/>
                        </IconButton>
                        <IconButton
                            color="warning"
                            title="پروفایل"
                            onClick={() => navigate("/profile")}
                            sx={{color: "#ffb74d"}}
                        >
                            <Person2Icon/>
                        </IconButton>
                        <IconButton
                            color="success"
                            title="استعلام جدید"
                            onClick={() => navigate("/inquiry/new")}
                            sx={{color: "#81c784"}}
                        >
                            <AddCircleIcon/>
                        </IconButton>
                    </Stack>
                }
            />
            <CardContent sx={{p: 2}}>
                <CustomDataGrid
                    columns={columns}
                    requestConfig={{
                        url: "/inquiry/search",
                        params: {statuses: statuses},
                    }}
                    pageSize={10}
                    enableActions
                    actions={[
                        {
                            color: "primary",
                            icon: <ListAltIcon/>,
                            label: "جزئیات استعلام",
                            onClick: (row) => navigate("/inquiryDetail", {state: {id: row.id}}),
                        },
                        {
                            color: "success",
                            icon: <PublishedWithChangesIcon/>,
                            label: "شروع استعلام",
                            onClick: (row) => startInquiry(row.id),
                        },
                    ]}
                />
            </CardContent>
        </Card>

    );
};

export default InquiryForm;
