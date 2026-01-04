import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    useTheme
} from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();

    const featureCard = {
        p: 2.5,
        borderRadius: 3,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        background: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.8)",
        border: `1px solid ${
            isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
        }`,
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: isDark
                ? "0 0 24px rgba(144,202,249,0.25)"
                : "0 12px 30px rgba(0,0,0,0.15)",
        },
    };

    return (
        <Box display="flex" justifyContent="center" mt={1} px={2}>
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 4,
                    background: isDark
                        ? "rgba(25,25,35,0.6)"
                        : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(18px)",
                    border: `1px solid ${
                        isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)"
                    }`,
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    {/* Header */}
                    <Stack spacing={1.5} mb={4} textAlign="right">
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                        >
                            👋 خوش آمدید
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            مرکز مدیریت و تحلیل داده‌های IMSI
                        </Typography>
                        <Typography variant="body2">
                            این سامانه برای اجرای اسکریپت‌های پایش شبکه،
                            جمع‌آوری داده‌های IMSI و تحلیل دقیق اطلاعات
                            طراحی شده است.
                        </Typography>
                    </Stack>

                    {/* Features */}
                    <Stack spacing={2.5}>
                        <Box sx={featureCard}>
                            <TerminalIcon color="success" fontSize="large" />
                            <Box>
                                <Typography fontWeight="bold">
                                    کنترل اسکریپت‌ها
                                </Typography>
                                <Typography variant="body2">
                                    اجرای، توقف و مدیریت اسکریپت‌های پایش
                                    به‌همراه وضعیت لحظه‌ای اجرا.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={featureCard}>
                            <StorageIcon color="info" fontSize="large" />
                            <Box>
                                <Typography fontWeight="bold">
                                    داده‌های IMSI
                                </Typography>
                                <Typography variant="body2">
                                    مشاهده، فیلتر و جستجوی رکوردهای IMSI
                                    به‌صورت جدولی و دقیق.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={featureCard}>
                            <BarChartIcon color="warning" fontSize="large" />
                            <Box>
                                <Typography fontWeight="bold">
                                    داشبورد تحلیلی
                                </Typography>
                                <Typography variant="body2">
                                    تحلیل بصری داده‌ها شامل توزیع اپراتورها،
                                    Timeline تشخیص IMSI و CellIDهای فعال.
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>

                    {/* Actions */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        mt={5}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<RocketLaunchIcon />}
                            onClick={() => navigate("/script")}
                            sx={{
                                px: 4,
                                py: 1.4,
                                borderRadius: 3,
                                fontWeight: "bold",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow:
                                        "0 0 28px rgba(33,150,243,0.6)",
                                },
                                "& .MuiButton-startIcon": { ml: 0.5 },
                            }}
                        >
                            شروع کار
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
