const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login.ejs")
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (password === "test") {
    req.session.authenticated = true;
    req.session.user = {email, password}
  }

  res.send(req.session.user);
})

// Export the router object so index.js can access it
module.exports = router;