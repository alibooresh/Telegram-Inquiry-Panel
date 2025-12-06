import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Home, ListAlt, PersonPin} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useError} from "../base/context/ErrorContext";
import {setupAxiosInterceptors} from "../base/axios/axios.config";
import {useTheme} from "@mui/material/styles";
import {DarkMode, LightMode} from "@mui/icons-material";

const drawerWidth = 210;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const navigate = useNavigate();
    const {showError} = useError();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setupAxiosInterceptors(showError);
    }, [showError]);

    const menuItems = [
        {text: "داشبورد", icon: <Home/>, path: "/"},
        {text: "لیست استعلامات", icon: <ListAlt/>, path: "/inquiry"},
        {text: "استعلام Sherlock", icon: <PersonPin/>, path: "/sherlock"},
        {text: "دمو", icon: <Home/>, path: "/demo"},
    ];

    const drawerContent = (
        <Box sx={{textAlign: "right", mt: 2}}>
            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                        }}
                        sx={{
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
                        <ListItemText primary={item.text}
                                      sx={{".MuiTypography-root": {fontSize: "0.9rem"}}}/>
                        <ListItemIcon sx={{minWidth: "unset", color: "#90caf9", ml: 1}}>
                            {item.icon}
                        </ListItemIcon>
                    </ListItemButton>
                ))}

            </List>

            <Box sx={{textAlign: "center", pb: 2, fontSize: "0.8rem", opacity: 0.6}}>
                نسخه 1.0.0
            </Box>
        </Box>
    );

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
                <Toolbar sx={{justifyContent: "space-between"}}>

                    {/* دکمه منو */}
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)} sx={{color: "#fff"}}>
                        <MenuIcon/>
                    </IconButton>

                    {/* عنوان */}
                    <Typography variant="h6" sx={{color: "#e3f2fd", mx: "auto"}}>
                        سامانه مدیریت استعلامات
                    </Typography>

                    {/* دکمه تاگل تم */}
                    <IconButton
                        sx={{
                            color: "#fff",
                            ml: 1,
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "12px",
                            p: 1,
                            transition: "0.3s",
                            "&:hover": {
                                background: "rgba(255,255,255,0.25)",
                            },
                        }}
                    >
                        <LightMode sx={{fontSize: 22}}/>
                    </IconButton>

                </Toolbar>
            </AppBar>

            {/* Drawer به صورت راست‌به‌چپ */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        background: "rgba(30, 30, 40, 0.85)",
                        backdropFilter: "blur(18px)",
                        color: "#e0e0e0",
                        right: 0,
                        left: "unset",
                    },
                }}
            >
                <Toolbar/>
                {drawerContent}
            </Drawer>

            {/* محتوای صفحه */}
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
