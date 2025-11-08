import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

interface response {
    id: number|null,
    username: string,
    start_time: string,
    end_time:string,
    total_sites: number,
    finished: boolean,
    details: Details[],
}
interface Details {
    site:string,
    url:string
}
const InquiryDetail = () => {
    const location = useLocation();
    const { id } = location.state || {};

    // 🔹 مدل داده‌ی اولیه
    const initialData = {
        id: null,
        username: "",
        start_time: "",
        end_time: "",
        total_sites: 0,
        finished: false,
        details: [],
    };

    const [data, setData] = useState<response>(initialData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://212.23.201.242:5000/scan/${id}`)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.error("خطا در دریافت اطلاعات:", err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!data.id) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 10 }}>
                شناسه استعلام نامعتبر است یا داده‌ای برای نمایش وجود ندارد.
            </Typography>
        );
    }

    const foundSites = data.details?.length || 0;

    return (
        <div className="flex justify-center mt-10">
            <Card sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                backdropFilter: "blur(14px)",
                background: "rgba(30,30,40,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e3f2fd",
            }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        جزئیات استعلام #{data.id}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="body1">
                        <strong>وضعیت:</strong>{" "}
                        {data.finished ? "✅ پایان یافته" : "⏳ در حال انجام"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>نام کاربر:</strong> {data.username || "—"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>تعداد کل سایت‌ها:</strong> {data.total_sites}
                    </Typography>
                    <Typography variant="body1">
                        <strong>تعداد یافته‌ها:</strong> {foundSites}
                    </Typography>
                    <Typography variant="body1">
                        <strong>زمان شروع:</strong>{" "}
                        {data.start_time
                            ? new Date(data.start_time).toLocaleString("fa-IR")
                            : "—"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>زمان پایان:</strong>{" "}
                        {data.end_time
                            ? new Date(data.end_time).toLocaleString("fa-IR")
                            : "—"}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                        جزئیات یافته‌ها:
                    </Typography>

                    {foundSites > 0 ? (
                        <List>
                            {data.details.map((d, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={d.site.replace("[+] ", "")}
                                            secondary={
                                                <a
                                                    href={d.url.replace("[+] ", "")}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: "#1976d2" }}
                                                >
                                                    {d.url.replace("[+] ", "")}
                                                </a>
                                            }
                                        />
                                    </ListItem>
                                    {index < data.details.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            هیچ نتیجه‌ای یافت نشد.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default InquiryDetail;
