import React from "react";
import MailPage from "../components/Mail/MailPage";
import SideNavbar from "../components/Navbar/SideNavbar";

const SentMailPage = () => {
  return (
    <>
      <SideNavbar />
      <MailPage type="sent" />
    </>
  );
}

export default SentMailPage;
