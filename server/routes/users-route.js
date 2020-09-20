const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
} = require("./../controllers/user-controller");

router.get("/", getAllUsers);

// router.get("/:uId", getUserById);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  createUser
);

router.post("/login", loginUser);

// router.patch("/:uId", updateUser);

// router.delete("/:uId", deleteUser);

module.exports = router;
