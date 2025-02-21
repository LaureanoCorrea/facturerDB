const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["director", "admin"], default: "director" },
  logoUrl: { type: String, default: null },
  teamName: { type: String, default: ""}, 
  alias: {type: String, default:""}
});

module.exports = mongoose.model("User", UserSchema);
