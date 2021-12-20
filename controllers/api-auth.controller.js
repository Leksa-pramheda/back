const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const { nanoid } = require("nanoid");
const User = require("../dataBase/models/Employee.model");
const { asyncHandler } = require("../middlewares/middlewares");
const { Op } = require("sequelize");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  let user = await User.findOne({
    where: {
          login: req.body.login,
    },
  });
  if (user) throw new ErrorResponse("Login and email must be unique", 400);
  user = await User.create(req.body);
  res.status(200).json(user);
}

async function login(req, res, next) {
  let user = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  if (!user) throw new ErrorResponse("Wrong login or password!", 400);
  let token = await Token.create({
    userId: user.id_employee,
    value: nanoid(128),
  });

  res.status(200).json({
    accessToken: token.value,
  });
}

initRoutes();

module.exports = router;
