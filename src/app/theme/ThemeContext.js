import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeModeContext = createContext({
    mode: "dark",
    toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }) => {
    const [mode, setMode] = useState("dark");

    // خواندن از LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("appThemeMode");
        if (saved) setMode(saved);
    }, []);

    const toggleMode = () => {
        setMode(prev => {
            const next = prev === "dark" ? "light" : "dark";
            localStorage.setItem("appThemeMode", next);
            return next;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                direction: "rtl",
                palette: {
                    mode,
                    ...(mode === "dark"
                        ? {
                            background: {
                                default: "#0f0f19",
                                paper: "#1d1d2b",
                            },
                            text: { primary: "#e3f2fd" },
                        }
                        : {
                            background: {
                                default: "#fafafa",
                                paper: "#ffffff",
                            },
                            text: { primary: "#222" },
                        }),
                },
                typography: {
                    fontFamily: "IRANSans, Roboto",
                },
            }),
        [mode]
    );

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
};
