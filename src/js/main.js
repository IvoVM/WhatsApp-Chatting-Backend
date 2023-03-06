const express = require("express");
const app = express();
const Usuario = require("./databases/mongoose");
const jwtoken = require('./jwt/jwt.js')


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
    return jwtoken.sendToken(user,req,res);
  }
});

//login

app.post("/api/auth/login", async (req, res) => {
  try {
    let user = req.body;
    const login = await Usuario.login(req.body.userName, req.body.password);
    if (login) {
      //enviar datos
      return jwtoken.sendToken(user,req,res);
    } else {
      res.json({
        success: false,
        message: "usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
