import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import "./MailList.css";

const MailList = ({ mails, type, onMailClick }) => {
  return (
    <ListGroup className="mail-list">
      {mails.map((mail) => (
        <ListGroup.Item
          key={mail.emailId}
          className={`mail-item ${mail.isSeen ? "seen" : "unseen"}`}
          onClick={() => onMailClick(mail.id)}
        >
          <Row className="align-items-center">
            <Col xs={1} className="mail-status">
              {!mail.isSeen && (
                <div className="status-dot"></div>
              )}
            </Col>
            <Col className="mail-sender-subject">
              <span className={`mail-sender ${!mail.isSeen ? "fw-bold" : ""}`}>
                {type === "sent" ? mail.to : mail.from}
              </span>
              <span className={`mail-subject ${!mail.isSeen ? "fw-bold" : ""}`}>
                {mail.subject}
              </span>
            </Col>
            <Col xs={3} className="mail-date-time">
              <span className={`mail-date ${!mail.isSeen ? "fw-bold" : ""}`}>
                {mail.date}
              </span>
              <span className={`mail-time ${!mail.isSeen ? "fw-bold" : ""}`}>
                {mail.time}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MailList;
