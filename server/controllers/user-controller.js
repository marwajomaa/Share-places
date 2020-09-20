const HttpError = require("./../models/http-error");
const { validationResult } = require("express-validator");
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
  const { name, email, password } = data;
  const newUser = {
    id: Math.random(),
    name,
    email,
    password,
  };

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );
  }

  const user = await DUMMY_USERS.push(newUser);

  res.status(200).json({
    status: "success",
    message: "user has been successfully created",
    users: DUMMY_USERS,
  });
  try {
  } catch (err) {
    next(new HttpError("Something went wrong", 500));
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
