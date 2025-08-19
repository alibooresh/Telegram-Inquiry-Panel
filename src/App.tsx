import React, {Suspense} from 'react';
import './App.css';
import LoginForm from "./app/login/form/LoginForm";
import InquiryForm from "./app/inquiry/form/InquiryForm";
import {Route, Routes} from "react-router-dom";
import InquiryDetailForm from "./app/inquirydetail/form/InquiryDetailForm";
import ProfileForm from "./app/profile/form/ProfileForm";
import NewInquiryForm from "./app/inquiry/form/NewInquiryForm";


function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<ProfileForm/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/inquiry" element={<InquiryForm/>}/>
                <Route path="/inquiry/new" element={<NewInquiryForm/>}/>
                <Route path="/inquiryDetail" element={<InquiryDetailForm/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
