const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

function generateToken(id, name) {
  return jwt.sign({ userId: id, name }, process.env.TOKEN_SECRET);
}

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ where: { email } });
    if(existingEmail){
      return res.status(409).json({success: false, message: 'Email already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({ name, email, password: hashedPassword });
    res.status(200).json({
      success: true,
      user: user,
      token: generateToken(user.id, user.name),
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, err, message: "Internal Server Error" });
  }
};

const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const hashedPassowrd = existingUser.password;
    const isMatch = await bcrypt.compare(password, hashedPassowrd);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Passowrd" });
    }

    res.status(200).json({ success: true, user: existingUser, token: generateToken(existingUser.id, existingUser.name), });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found Login Again" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Integrnal server Error" });
  }
};

module.exports = {
  createUser,
  validateUser,
  getUser,
};
