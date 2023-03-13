const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/chatApp");

const usersSchema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  perfilImg: { type: String },
});

usersSchema.static("isThisNameInUse", async function (userName) {
  if (!userName) return false;
  try {
    const user = await this.findOne({ userName });
    if (user) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error usuario en uso");
    return false;
  }
});

usersSchema.static("login", async function (userName, password) {
  if ((!userName, !password)) return false;
  try {
    const user = await this.findOne({ userName, password });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error al intectar logearse");
    return false;
  }
});
usersSchema.static("sendData", async function (userName) {
  if (!userName) return false;
  try {
    const user = await this.findOne();
    if (user) {
      return user._id;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error al intectar logearse");
    return false;
  }
});

usersSchema.static("getUsers", async function () {
  try {
    const users = await this.find().select("select userName from users");
    return users;
  } catch (error) {
    console.log("error al intentar transferir usuarios");
  }
});

const Usuario = new mongoose.model("users", usersSchema);

module.exports = Usuario;
