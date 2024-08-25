const User = require("../models/user");
const Email = require("../models/email");
const Recipient = require("../models/recipient");

const SendEmail = async (req, res) => {
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

module.exports = {
  SendEmail,
};
