const express = require("express");
const app = express();
const Usuario = require("./databases/mongoose");
const jwtoken = require("./jwt/jwt.js");
const jwt = require("jsonwebtoken");

//Register

app.post("/api/auth/register", async (req, res) => {
  let user = req.body;
  const isNewUser = await Usuario.isThisNameInUse(req.body.userName);
  if (!isNewUser) {
    return res.json({
      success: false,
      message: "username is taken",
    });
  } else {
    Usuario.create(user);
    return jwtoken.sendToken(user, req, res);
  }
});

//login

app.post("/api/auth/login", async (req, res) => {
  let users = await Usuario.getUsers();
  let user = req.body;
  const login = await Usuario.login(req.body.userName, req.body.password);
  if (login) {
    //enviar datos
    return jwt.sign(user, "secretkey", (err, token) => {
      res.json({
        message: "succesfully registered",
        success: true,
        username: req.body.userName,
        token: token,
        users
      });
    });
  } else {
    res.json({
      success: false,
      message: "usuario o contraseña incorrectos",
    });
  }
});
module.exports = app;
