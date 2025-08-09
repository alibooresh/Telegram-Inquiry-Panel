import React from 'react';
import logo from './logo.svg';
import './App.css';
import Example from "./app/example/form/ExampleForm";
import LanguageSwitcher from "./base/languageswitcher/LanguageSwitcher";

function App() {
  return (
      <>
          <Example/>
          <LanguageSwitcher/>
      </>
  );
}

export default App;
