import React, {Suspense, useEffect} from 'react';
import './App.css';
import LoginForm from "./app/login/form/LoginForm";
import InquiryForm from "./app/inquiry/form/InquiryForm";
import {Route, Routes} from "react-router-dom";
import InquiryDetailForm from "./app/inquirydetail/form/InquiryDetailForm";
import ProfileForm from "./app/profile/form/ProfileForm";
import NewInquiryForm from "./app/inquiry/form/NewInquiryForm";
import MainLayout from "./layout/MainLayout";
import Dashboard from './app/dashboard/form/Dashboard';
import {ErrorProvider, useError} from './base/context/ErrorContext';
import {setupAxiosInterceptors} from "./base/axios/axios.config";
import NewInquiryDetailForm from "./app/inquirydetail/form/NewInquiryDetailForm";
import SherlockForm from "./app/sherlock/form/SherlockForm";


function App() {
    return (
        <ErrorProvider>
            <MainLayout>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/profile" element={<ProfileForm/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/inquiry" element={<InquiryForm/>}/>
                        <Route path="/inquiry/new" element={<NewInquiryForm/>}/>
                        <Route path="/inquiryDetail" element={<InquiryDetailForm/>}/>
                        <Route path="/inquiryDetail/new" element={<NewInquiryDetailForm/>}/>
                        <Route path="/sherlock" element={<SherlockForm/>}/>
                    </Routes>
                </Suspense>
            </MainLayout>
        </ErrorProvider>

    );
}

export default App;
