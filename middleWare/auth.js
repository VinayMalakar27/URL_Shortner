//middlewere > auth.js
const { use } = require("../routes/url");
const { getUser } = require("../service/auth");

async function restrictToLoginnedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("Cookies =>", req.cookies);

  if (!userUid) return res.render("login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoginnedinUserOnly,
  checkAuth,
};
