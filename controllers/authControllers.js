const { userSchema } = require("../helpers/validationSchemas");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    let { age, city, username, password, email } = req.body;
    let newuser = new User({ age, city, email, username});
    let db_user = await User.register(newuser, password);
    req.login(newuser, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/login");
    });
  } catch (error) {
    res.status(422).send({
      message: error.message,
    });
  }
};
const registerGet = async (req, res) => {
  res.render("auth/signup");
};

const loginGet = async (req, res) => {
  res.render("auth/login");
};

const loginUser = async (req, res) => {
  res.redirect("/posts");
};
module.exports = { registerUser, registerGet, loginGet, loginUser };
