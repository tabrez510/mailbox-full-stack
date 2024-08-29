const User = require("../models/user");
const Email = require("../models/email");
const Recipient = require("../models/recipient");
const moment = require("moment-timezone");

const sendEmail = async (req, res) => {
  const { recipients, subject, body } = req.body;

  try {
    const email = await Email.create({
      subject,
      body,
      userId: req.user.id,
    });

    const allRecipients = [...new Set([...recipients])];

    for (const recipientEmail of allRecipients) {
      const recipientUser = await User.findOne({
        where: { email: recipientEmail },
      });
      if (recipientUser) {
        await Recipient.create({
          emailId: email.id,
          userId: recipientUser.id,
        });
      }
    }

    res.status(200).json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending mail" });
  }
};

const getSentEmails = async (req, res) => {
  try {
    const sentEmails = await Email.findAll({
      where: { userId: req.user.id, isDeleted: false },
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
            attributes: ["name", "email"],
          },
        },
      ],
    });
    const emails = sentEmails.map((email) => ({
      emailId: email.id,
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
      where: { userId, isDeleted: false },
      include: [
        {
          model: Email,
          as: "Email",
          include: [
            { model: User, as: "Sender", attributes: ["name", "email"] },
          ],
        },
      ],
      attributes: ["emailId", "isSeen" , "createdAt"],
    });

    const emails = receivedEmails.map((recipient) => ({
      emailId: recipient.emailId,
      subject: recipient.Email.subject,
      isSeen: recipient.isSeen,
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
      where: { id: emailId, isDeleted: false },
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

    const recipient = email.Recipients.find(
      (rec) => rec.userId === userId
    );

    if (!recipient) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    recipient.isSeen = true;
    await recipient.save();

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
        time
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
      where: { id: emailId, userId, isDeleted: false },
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
            attributes: ["name", "email"],
          },
        },
      ],
    });

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
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

const deleteEmail = async (req, res) => {
  const { emailId } = req.params;
  const userId = req.user.id;

  try {
    const email = await Email.findOne({
      where: { id: emailId },
      include: [
        {
          model: Recipient,
          as: "Recipients",
        },
      ],
    });

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    if (email.userId === userId) {
      await email.update({ isDeleted: true });
      return res
        .status(200)
        .json({ success: true, message: "Email marked as deleted" });
    }

    const recipient = await Recipient.findOne({
      where: { emailId, userId },
    });

    if (recipient) {
      await recipient.update({ isDeleted: true });
      return res
        .status(200)
        .json({
          success: true,
          message: "Email marked as deleted for recipient",
        });
    }

    res
      .status(403)
      .json({ success: false, message: "Unauthorized to delete this email" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  sendEmail,
  getSentEmails,
  getReceivedEmails,
  getReceivedEmailDetails,
  getSentEmailDetails,
  deleteEmail
};
