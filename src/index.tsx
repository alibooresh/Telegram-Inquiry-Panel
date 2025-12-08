import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {faIR} from "@mui/material/locale";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeModeProvider} from "./app/theme/ThemeContext";




const theme = createTheme(
    {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        margin: 0,
                        minHeight: "100vh",
                        background: "linear-gradient(to top, #09203f 50%, #537895 100%)",
                        backgroundAttachment: "fixed",
                    },
                },
            },
        },
        direction: 'rtl',
        palette: {
            primary: { main: '#1976d2' },
        },
        typography: {
            fontFamily: 'Vazirmatn'
        }
    },
    faIR,
);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
            <CssBaseline />
        <ThemeModeProvider>
            <App />
        </ThemeModeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
