const User = require("../models/user");
const Email = require("../models/email");
const Recipient = require("../models/recipient");
const moment = require("moment-timezone");

const sendEmail = async (req, res) => {
  const { recipients, cc, bcc, subject, body } = req.body;

  try {
    const email = await Email.create({
      subject,
      body,
      userId: req.user.id,
    });

    const allRecipients = [...new Set([...recipients, ...cc, ...bcc])];

    for (const recipientEmail of allRecipients) {
      const recipientUser = await User.findOne({
        where: { email: recipientEmail },
      });
      if (recipientUser) {
        let type = "TO";
        if (cc.includes(recipientEmail)) {
          type = "CC";
        } else if (bcc.includes(recipientEmail)) {
          type = "BCC";
        }

        await Recipient.create({
          emailId: email.id,
          userId: recipientUser.id,
          type,
        });
      }
    }

    res.status(200).send("Mail sent successfully");
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).send("Error sending mail");
  }
};

const getSentEmails = async (req, res) => {
  try {
    const sentEmails = await Email.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["name", "email"],
        },
        {
          model: Recipient,
          as: "Recipients",
          where: { type: "TO" },
          include: {
            model: User,
            as: "RecipientUser",
            attributes: ["name", "email"],
          },
        },
      ],
    });
    const emails = sentEmails.map((email) => ({
      emailId: id,
      subject: email.subject,
      to: email.Recipients.map(
        (recipient) => recipient.RecipientUser.name
      ).join(", "),
      date: moment.tz(email.createdAt, "Asia/Kolkata").format("DD/MM/YY"),
      time: moment.tz(email.createdAt, "Asia/Kolkata").format("hh:mm A"),
    }));
    res.status(200).json({ success: true, emails });
  } catch (error) {
    console.error("Error fetching sent mails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getReceivedEmails = async (req, res) => {
  try {
    const userId = req.user.id;

    const receivedEmails = await Recipient.findAll({
      where: { userId },
      include: [
        {
          model: Email,
          as: "Email",
          include: [
            { model: User, as: "Sender", attributes: ["name", "email"] },
          ],
        },
      ],
      attributes: ["emailId", "createdAt"],
    });

    const emails = receivedEmails.map((recipient) => ({
      emailId: recipient.emailId,
      subject: recipient.Email.subject,
      from: recipient.Email.Sender.name,
      date: moment.tz(recipient.createdAt, "Asia/Kolkata").format("DD/MM/YY"),
      time: moment.tz(recipient.createdAt, "Asia/Kolkata").format("hh:mm A"),
    }));
    res.status(200).json({ success: true, emails });
  } catch (error) {
    console.error("Error fetching received mails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReceivedEmailDetails = async (req, res) => {
  const userId = req.user.id;
  const { emailId } = req.params;

  try {
    const email = await Email.findOne({
      where: { id: emailId },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["name", "email"],
        },
        {
          model: Recipient,
          as: "Recipients",
          include: {
            model: User,
            as: "RecipientUser",
            attributes: ["id", "name", "email"],
          },
        },
      ],
    });

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    const isRecipient = email.Recipients.some(
      (recipient) => recipient.RecipientUser.id === parseInt(userId)
    );

    if (!isRecipient) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    const sender = {
      name: email.Sender.name,
      email: email.Sender.email,
    };

    const recipients = email.Recipients.map((recipient) => ({
      name: recipient.RecipientUser.name,
      email: recipient.RecipientUser.email,
    }));

    const date = moment.tz(email.createdAt, "Asia/Kolkata").format("DD/MM/YY");
    const time = moment.tz(email.createdAt, "Asia/Kolkata").format("hh:mm A");

    res.status(200).json({
      success: true,
      data: {
        sender,
        recipients,
        subject: email.subject,
        body: email.body,
        date,
        time,
      },
    });
  } catch (error) {
    console.error("Error fetching received email details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getSentEmailDetails = async (req, res) => {
  const userId = req.user.id;
  const { emailId } = req.params;

  try {
    const email = await Email.findOne({
      where: { id: emailId, userId },
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'Recipients',
          include: {
            model: User,
            as: 'RecipientUser',
            attributes: ['name', 'email'],
          },
        },
      ],
    });

    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const sender = {
      name: email.Sender.name,
      email: email.Sender.email,
    };

    const recipients = email.Recipients.map((recipient) => ({
      name: recipient.RecipientUser.name,
      email: recipient.RecipientUser.email,
    }));

    const date = moment.tz(email.createdAt, "Asia/Kolkata").format("DD/MM/YY");
    const time = moment.tz(email.createdAt, "Asia/Kolkata").format("hh:mm A");

    res.status(200).json({
      success: true,
      data: {
        sender,
        recipients,
        subject: email.subject,
        body: email.body,
        date,
        time,
      },
    });
  } catch (error) {
    console.error("Error fetching sent email details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  sendEmail,
  getSentEmails,
  getReceivedEmails,
  getReceivedEmailDetails,
  getSentEmailDetails
};
