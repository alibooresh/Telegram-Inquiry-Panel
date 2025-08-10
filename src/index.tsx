import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18n";
import {createTheme, ThemeProvider} from "@mui/material";
import {faIR} from "@mui/material/locale";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./app/login/form/LoginForm";
import InquiryForm from "./app/inquiry/form/InquiryForm";



const theme = createTheme(
    {
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
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
