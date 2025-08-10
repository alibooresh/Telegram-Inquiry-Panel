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
import {useTranslation} from "react-i18next";
import InquiryDetailService from "../service/InquiryDetailService";
import InquiryDetailModel from "../model/InquiryDetailModel";
import {DataGrid, GridColDef} from '@mui/x-data-grid';


const InquiryForm: React.FC = () => {
    const {t} = useTranslation();
    const service = new InquiryDetailService();
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    let reqs :InquiryDetailModel[]=[
        {
            id: '1',
            userId: '546452222',
            firstName: 'علی',
            lastName: 'بورش',
            username:'alib',
        },
        {
            id: '2',
            userId: '562654565',
            firstName: 'مهدی',
            lastName: 'محمدی',
            username:'mehdi.m',
        }
    ]
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
    ];
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    const [requests, setRequests] = useState<InquiryDetailModel[]>(reqs);
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

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 800}}>
                <Box>

                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" dir={'rtl'} sx={{flexGrow: 1}}>
                                {t('inquiryDetailList')}
                            </Typography>
                            <Typography variant="body1">
                                {phoneNumber}
                            </Typography>
                        </Toolbar>
                    </AppBar>


                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default InquiryForm;
