const express = require("express");
const app = express();
const Usuario = require("./databases/mongoose");

//Register
app.post("/api/auth/register", async (req, res) => {
  var user = req.body;
  const isNewUser = await Usuario.isThisNameInUse(req.body.userName);
  if (!isNewUser) {
    return res.json({
      success: false,
      message: "username is taken",
    });
  } else {
    Usuario.create(user);
    return res.json({
      success: true,
      message: "succesfully registered",
      username: req.body.userName,
    });
  }
});

//login
app.post("/api/auth/login", async (req, res) => {
  const login = await Usuario.login(req.body.userName, req.body.password);
  if (login) {
    //enviar datos
    const id = await Usuario.sendData(req.body.userName);
    return res.json({
      success: true,
      message: "successfully logged in",
      username: req.body.userName,
      id: id,
    });
  } else {
    res.json({
      success: false,
      message: "usuario o contraseña incorrectos",
    });
  }
});

module.exports = app;
