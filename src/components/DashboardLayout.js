import React from "react";
// import Header from "./Dashboard/Header";
// import SideMenu from "./Dashboard/SideMenu";
import AppHeader from "./layouts/AppHeader";
import AppSideber from "./layouts/AppSideber"; 
import AppFooter from "./layouts/AppFooter";
import AppContents from "./layouts/AppContents";
// import Footer from "./Dashboard/Footer";

const DashboardLayout = () => {
  return (
    <>
      <AppHeader />
      <AppSideber />
      <div className="content-wrapper">
        <AppContents />
      </div>
      <AppFooter />
    </>
  );
};

export default DashboardLayout;
