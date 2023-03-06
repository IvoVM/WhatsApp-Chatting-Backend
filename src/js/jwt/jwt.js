const express = require('express');
const jwt = require("jsonwebtoken");

const sendToken = (user,req,res) => {
  jwt.sign(user, "secretkey", (err, token) => {
    res.json({
      message: "succesfully registered",
      success: true,
      username: req.body.userName,
      token: token,

    });
  });
};

const receiveToken = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    let bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
const verifyToken = () => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "Post fue creado",
        authData: authData,
      });
    }
  });
};

module.exports = { sendToken,receiveToken, verifyToken };
