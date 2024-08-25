import React, { useEffect, useState } from "react";
import axios from 'axios';
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./SendMail.css"

const ComposeMail = () => {
  const [recipients, setRecipients] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])

  const handleSendMail = async () => {
    const mailBody = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const data = {
      recipients: recipients.split(",").map((email) => email.trim()),
      cc: cc.split(",").map((email) => email.trim()),
      bcc: bcc.split(",").map((email) => email.trim()),
      subject,
      body: mailBody,
    };
    console.log(data);

    try {
      await axios.post("http://localhost:3001/api/email/send-email", data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      alert("Mail sent successfully");
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  return (
    <div className="compose-mail">
      <FloatingLabel controlId="floatingTo" label="To" className="mb-3">
        <Form.Control
          type="text"
          placeholder="To"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingCc" label="CC" className="mb-3">
        <Form.Control
          type="text"
          placeholder="CC"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingBcc" label="BCC" className="mb-3">
        <Form.Control
          type="text"
          placeholder="BCC"
          value={bcc}
          onChange={(e) => setBcc(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingSubject"
        label="Subject"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </FloatingLabel>
      <div className="editor-wrapper mb-3">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
        />
      </div>
      <Button variant="primary" onClick={handleSendMail}>
        Send
      </Button>
    </div>
  );
};

export default ComposeMail;
