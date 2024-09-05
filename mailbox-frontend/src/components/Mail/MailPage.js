import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSentMailsAction,
  fetchReceivedMailsAction,
} from "../../features/mail/mailActions";
import MailList from "./MailList";

const MailPage = ({ type }) => {
  const dispatch = useDispatch();
  const mails = useSelector((state) =>
    type === "sent" ? state.mail.sentMails : state.mail.receivedMails
  );

  useEffect(() => {
    if (type === "sent") {
      dispatch(fetchSentMailsAction());
    } else {
      dispatch(fetchReceivedMailsAction());
    }
  }, [dispatch, type]);

  const handleMailClick = (mailId) => {
    // Handle click to show mail details or mark as seen
    console.log(`Mail clicked with ID: ${mailId}`);
  };

  return (
    <div>
      <h2 className="text-center">{type === "sent" ? "Sent Mails" : "Received Mails"}</h2>
      <MailList mails={mails} type={type} onMailClick={handleMailClick} />
    </div>
  );
};

export default MailPage;
