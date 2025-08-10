import React, {Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import Example from "./app/example/form/ExampleForm";
import LanguageSwitcher from "./base/languageswitcher/LanguageSwitcher";
import LoginForm from "./app/login/form/LoginForm";
import InquiryForm from "./app/inquiry/form/InquiryForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import InquiryDetailForm from "./app/inquirydetail/form/InquiryDetailForm";

function App() {
  return (
          <Suspense>
              <Routes>
                  <Route path="/login" element={<LoginForm/>}/>
                  <Route path="/inquiry" element={<InquiryForm/>}/>
                  <Route path="/inquiry/*" element={<InquiryDetailForm/>}/>
              </Routes>
          </Suspense>
  );
}

export default App;
