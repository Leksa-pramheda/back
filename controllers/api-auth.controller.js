const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const { nanoid } = require("nanoid");
const Employee = require("../dataBase/models/Employee.model");
const { asyncHandler } = require("../middlewares/middlewares");
const { Op } = require("sequelize");

const router = Router();
function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  let user = await Employee.findOne({
    where: {
          login: req.body.login,
    },
  });
  if (user) throw new ErrorResponse("Login and email must be unique", 400);
  user = await Employee.create(req.body);
  res.status(200).json(user);
}

async function login(req, res, next) {
  // console.log("req.headers[]")
  // console.log(req.headers["token"])
  // console.log("req.headers[]")
  let user = await Employee.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  if (!user) throw new ErrorResponse("Wrong login or password!", 400);
  let token = await Token.create({
    userId: user.id,
    value: nanoid(128),
  });
  req.userId = token.userId;
  res.status(200).json({
    accessToken: token.value,
  });
}

initRoutes();

module.exports = router;
