const boom = require("boom");
const bcrypt = require("bcryptjs");
const HttpError = require("./../models/http-error");
const { validationResult } = require("express-validator");
const User = require("./../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      status: "success",
      message: "Users successfully fetched",
      users: users.map((user) => user.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError("Could not fetch users, please try again later"));
  }
};

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const data = req.body;
  const { name, email, password, image } = data;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not signup, please try again later", 500));
  }

  if (existingUser) {
    // return next(boom.badRequest("Could not create user, email already exists"));
    const error = new HttpError(
      "Could not create user, email already exists",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again"), 500);
  }

  const newUser = {
    name,
    email,
    password: hashedPassword,
    image,
    places: [],
  };

  try {
    const createdUser = await new User(newUser);
    await createdUser.save();
    res.status(200).json({
      status: "success",
      message: "Signing up successfully",
      user: createdUser.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError("Could not sign up, please try again", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;

  const { email, password } = data;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not login, please try again later", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Invalid credentials could not log you in", 401));
  }

  res.status(200).json({
    status: "success",
    message: "Logged in",
    user: existingUser,
  });
};
