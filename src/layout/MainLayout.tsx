import React, { useEffect, useState } from "react";
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
import { Home, ListAlt, PersonPin, DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "../base/axios/axios.config";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../app/theme/ThemeContext";
import TerminalIcon from '@mui/icons-material/Terminal';
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";
import BlockIcon from "@mui/icons-material/Block";
const drawerWidth = 210;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { mode, toggleMode } = useThemeMode();

    const isDark = mode === "dark";

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
    }, []);

    const menuItems = [
        { text: "داشبورد", icon: <BarChartIcon color="warning"/>, path: "/dashboard" },
        { text: "اسکریپت", icon: <TerminalIcon color="success" />, path: "/script" },
        // { text: "استعلام Sherlock", icon: <PersonPin />, path: "/sherlock" },
        { text: "IMSI", icon: <StorageIcon color="info" />, path: "/demo" },
        { text: "IMSI لیست سیاه", icon: <BlockIcon color={"error"} />, path: "/black-list" },
    ];

    const drawerContent = (
        <Box sx={{ textAlign: "right", mt: 2 }}>
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

                            // وابسته به تم
                            "&:hover": {
                                backgroundColor: isDark
                                    ? "rgba(255,255,255,0.12)"
                                    : "rgba(0,0,0,0.08)",
                                transform: "translateX(-4px)",
                            },
                        }}
                    >
                        <ListItemText
                            primary={item.text}
                            sx={{
                                ".MuiTypography-root": {
                                    fontSize: "0.9rem",
                                    color: theme.palette.text.primary,
                                },
                            }}
                        />
                        <ListItemIcon
                            sx={{
                                minWidth: "unset",
                                color: theme.palette.primary.main,
                                ml: 1,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                    </ListItemButton>
                ))}
            </List>

            <Box
                sx={{
                    textAlign: "center",
                    pb: 2,
                    fontSize: "0.8rem",
                    opacity: 0.6,
                    color: theme.palette.text.secondary,
                }}
            >
                نسخه 1.0.0
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", direction: "rtl" }}>

            {/* ⭐ AppBar داینامیک */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (t) => t.zIndex.drawer + 1,
                    background: isDark
                        ? "rgba(20,20,30,0.7)"
                        : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(10px)",
                    borderBottom: `1px solid ${
                        isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                    }`,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* menu */}
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)} sx={{ color: theme.palette.text.primary }}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "center", mx: "auto" }}>

                        <Box
                            component="img"
                            src='tower.png' // مسیر عکس خودت
                            alt="Logo"
                            sx={{ width: 32, height: 32, borderRadius: "50%" }}
                        />
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, mr: 1 }}>
                            IMSI Control Center
                        </Typography>
                    </Box>

                    {/* دکمه تغییر تم */}
                    <IconButton
                        onClick={toggleMode}
                        sx={{
                            color: theme.palette.text.primary,
                            ml: 1,
                            background: isDark
                                ? "rgba(255,255,255,0.12)"
                                : "rgba(0,0,0,0.08)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "12px",
                            p: 1,
                            transition: "0.3s",
                            "&:hover": {
                                background: isDark
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(0,0,0,0.15)",
                            },
                        }}
                    >
                        {isDark ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        background: isDark ? "rgba(30,30,40,0.9)" : "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(18px)",
                        color: theme.palette.text.primary,
                        right: 0,
                        left: "unset",
                    },
                }}
            >
                <Toolbar />
                {drawerContent}
            </Drawer>

            {/* محتوای صفحه - داینامیک */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: 10,
                    pr: 3,
                    height: "100vh",
                    overflowY: "auto",
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    position:'relative',
                    backgroundImage: isDark
                        ? "radial-gradient(circle at 20% 30%, rgba(70,70,120,0.3) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(30,50,90,0.2) 0%, transparent 70%)"
                        : "linear-gradient(135deg, #ebf4f5 30%, #b5c6e0 70%)",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
