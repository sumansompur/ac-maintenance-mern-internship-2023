import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "Layout";
import React from "react";
import NavBarComponent from "pages/components/common/NavBarComponent";
import FooterComponent from "pages/components/common/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Layout />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
