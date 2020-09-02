"use strict";
const express = require("express");
const router = express.Router();
const userRouter = require("./users");
// router.get("/", (req, res) => {
//   return res.status(200).send("Hurray, buildForSDG");
// });
router.use("/users", userRouter).use((error, req, res, next) => {
  error.status = 400;
  return next(error);
});

module.exports = router;
