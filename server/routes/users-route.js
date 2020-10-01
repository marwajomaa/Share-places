const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
} = require("./../controllers/user-controller");

router.get("/", getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  createUser
);
console.log("heeeeeeeeeeell");
router.post("/login", loginUser);

module.exports = router;
