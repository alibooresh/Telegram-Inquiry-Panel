import React, {useEffect} from "react";
import {
    AppBar,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import {Home, ListAlt, PersonPin} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useError} from "../base/context/ErrorContext";
import {setupAxiosInterceptors} from "../base/axios/axios.config";

const drawerWidth = 210;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const navigate = useNavigate();
    const {showError} = useError();
    useEffect(() => {
        setupAxiosInterceptors(showError);
    }, [showError]);
    const menuItems = [
        {text: "داشبورد", icon: <Home/>, path: "/"},
        {text: "لیست استعلامات", icon: <ListAlt/>, path: "/inquiry"},
        // {text: "استعلام جدید", icon: <Add/>, path: "/inquiry/new"},
        // {text: "استعلام تکی", icon: <SystemSecurityUpdateGood/>, path: "/inquiryDetail/new"},
        {text: "استعلام Sherlock", icon: <PersonPin/>, path: "/sherlock"},
        // {text: "پروفایل کاربر", icon: <Person/>, path: "/profile"},
        // {text: "خروج", icon: <Logout/>, path: "/login"},
    ];

    return (
        <Box sx={{display: "flex", height: "100vh", overflow: "hidden", direction: "rtl"}}>
            {/* هدر بالا */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background: "rgba(20, 20, 30, 0.7)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Toolbar sx={{justifyContent: "center"}}>
                    <Typography variant="h6" sx={{color: "#e3f2fd"}}>
                        سامانه مدیریت استعلامات
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* منوی شیشه‌ای سمت راست */}
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        background: "rgba(30, 30, 40, 0.6)",
                        backdropFilter: "blur(14px)",
                        borderLeft: "1px solid rgba(255,255,255,0.1)",
                        color: "#e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    },
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: "auto", mt: 2}}>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    textAlign: "right",
                                    justifyContent: "space-between",
                                    px: 2,
                                    borderRadius: "12px",
                                    mx: 1,
                                    mb: 0.5,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        transform: "translateX(-4px)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    sx={{".MuiTypography-root": {fontSize: "0.9rem"}}}
                                />
                                <ListItemIcon sx={{minWidth: "unset", color: "#90caf9", ml: 1}}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Box sx={{textAlign: "center", pb: 2, fontSize: "0.8rem", opacity: 0.6}}>
                    نسخه 1.0.0
                </Box>
            </Drawer>

            {/* محتوای اصلی */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "rgba(15, 15, 25, 0.8)",
                    color: "#e3f2fd",
                    p: 3,
                    pt: 10,
                    pr: 3,
                    height: "100vh",
                    overflowY: "auto",
                    backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(70,70,120,0.3) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(30,50,90,0.2) 0%, transparent 70%)",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
