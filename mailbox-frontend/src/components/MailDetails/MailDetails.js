import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import './MailDetails.css';

const MailDetail = ( {type, emailData} ) => {
  const { sender, recipients, subject, body, date, time } = emailData;
  const parseBody = (rawBody) => {
    try {
      const content = JSON.parse(rawBody);
      return content.blocks.map((block, index) => {
        const inlineStyleRanges = block.inlineStyleRanges.reduce(
          (acc, range) => {
            const text = block.text.substring(
              range.offset,
              range.offset + range.length
            );
            switch (range.style) {
              case "BOLD":
                acc.push(
                  <strong key={`bold-${index}-${range.offset}`}>{text}</strong>
                );
                break;
              case "ITALIC":
                acc.push(
                  <em key={`italic-${index}-${range.offset}`}>{text}</em>
                );
                break;
              default:
                acc.push(text);
            }
            return acc;
          },
          []
        );
        return (
          <p key={index}>
            {inlineStyleRanges.length > 0 ? inlineStyleRanges : block.text}
          </p>
        );
      });
    } catch (e) {
      console.error("Error parsing email body:", e);
      return "Invalid body content";
    }
  };

  return (
    <Card className="email-card mx-auto mt-4" style={{ maxWidth: "600px" }}>
      <Card.Header as="h5">{subject}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>From:</strong> {sender?.name} ({sender?.email})
        </Card.Text>
        <Card.Text>
          <strong>To:</strong>{" "}
          {recipients?.map((recipient, index) => (
            <span key={index}>
              {recipient.name} ({recipient.email})
              {index < recipients.length - 1 && ", "}
            </span>
          ))}
        </Card.Text>
        <Card.Text>
          <strong>Date:</strong> {date} <strong>Time:</strong> {time}
        </Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Body:</strong>
            <div className="email-body">{parseBody(body)}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default MailDetail;
