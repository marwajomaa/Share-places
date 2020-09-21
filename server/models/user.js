const mongoose = require("mongoose");
const uniqueValidate = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
});

userSchema.plugin(uniqueValidate);

module.exports = mongoose.model("User", userSchema);
