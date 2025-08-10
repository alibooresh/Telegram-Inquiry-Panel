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

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={3} sx={{padding: 4, width: "100%", maxWidth: 800}}>
                <Box>

                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" dir={'rtl'} sx={{flexGrow: 1}}>
                                {t('inquiryList')}
                            </Typography>
                            <Typography variant="body1">
                                {phoneNumber}
                            </Typography>
                        </Toolbar>
                    </AppBar>


                    <Box className={"rtl"} p={2}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <Paper className={"rtl"}>
                                <List>
                                    {requests.map((req) => (
                                        <React.Fragment key={req.id}>
                                            <ListItem onClick={() => window.location.href = `/inquiry/${req.id}`}>
                                                <ListItemText
                                                    primary={`${t('id')}:${req.id}    ${t('status')}:${req.status}`}
                                                    // secondary={`وضعیت: ${req.status} | تاریخ: ${req.createdAt}`}
                                                    secondary={`${t('createdAt')}:${req.createdAt} - ${t('recordCount')}:${req.recordCount} - ${t('duration')}:${req.duration}`}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default InquiryForm;
