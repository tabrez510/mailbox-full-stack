import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/Navbar/SideNavbar";
import MailDetails from "../components/MailDetails/MailDetails";
import { getReceivedMailDetailsAction } from "../features/mail/mailActions";

const ReceivedMailDetailsPage = () => {
    const { emailId } = useParams();
    const emailData = useSelector((state) => state.mail.selectedMail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReceivedMailDetailsAction( emailId));
    }, [emailId, dispatch]);
    return (
        <>
            <SideNavbar />
            <MailDetails type="received" emailData={emailData} />
        </>
    )
}

export default ReceivedMailDetailsPage;