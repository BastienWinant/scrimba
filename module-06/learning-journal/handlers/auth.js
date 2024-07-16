const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login.ejs")
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  res.send(`Email:${email} | Password: ${password}`);
})
