const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
} = require("./../controllers/user-controller");

router.get("/", getAllUsers);

// router.get("/:uId", getUserById);

router.post("/signup", createUser);

router.post("/login", loginUser);

// router.patch("/:uId", updateUser);

// router.delete("/:uId", deleteUser);

module.exports = router;
