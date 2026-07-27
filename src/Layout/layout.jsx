import React from "react";
import MenuTab from "../components/menuTab";
import Footer from "../components/footer/";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MenuTab />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
