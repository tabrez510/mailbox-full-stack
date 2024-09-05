import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/Navbar/SideNavbar";
import MailDetails from "../components/MailDetails/MailDetails";
import { getSentMailDetailsAction } from "../features/mail/mailActions";

const SentMailDetailsPage = () => {
    const { emailId } = useParams();
    const emailData = useSelector((state) => state.mail.selectedMail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSentMailDetailsAction( emailId));
    })
    return (
        <>
            <SideNavbar />
            <MailDetails type="sent" emailData={emailData} />
        </>
    )
}

export default SentMailDetailsPage;