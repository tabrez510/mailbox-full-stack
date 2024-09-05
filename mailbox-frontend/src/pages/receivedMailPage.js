import React from "react";
import MailPage from "../components/Mail/MailPage";
import SideNavbar from "../components/Navbar/SideNavbar";

const ReceivedMailPage = () => {
  return (
    <>
      <SideNavbar />
      <MailPage type="received" />
    </>
  );
}

export default ReceivedMailPage;