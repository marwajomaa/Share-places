const HttpError = require("./../models/http-error");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
let DUMMY_USERS = [
  {
    id: Math.random(),
    name: "Marwa",
    email: "marwa@marwa.com",
    password: "12341234",
  },
];

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const data = req.body;
  const { name, email, password, image, places } = data;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Could not signup, please try again later", 500));
  }

  if (existingUser) {
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );
  }

  const newUser = {
    name,
    email,
    password,
    image,
    places,
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
    return next(new HttpError(err.message, 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;
  const { email, password } = data;

  try {
    const user = DUMMY_USERS.find((user) => user.email === email);

    if (!user || user.password !== password) {
      return next(
        new HttpError(
          "Could not identify user, credentials seem to be wrong",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      message: "User with the given email and password founded",
      user: { user },
    });
  } catch (err) {
    next(new HttpError(err, 500));
  }
};
