const { Router } = require("express");
const Employee = require("../dataBase/models/Employee.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");



const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUserInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(userLogout));
}

async function getUserInfo(req, res, next) {
  let user = await Employee.findByPk(req.userId);

  res.status(200).json(user);
}

async function updateUserInfo(req, res, next) {
  let user = await Employee.update(req.body, {
    where: { id_employee: req.userId },
    returning: true,
  });

  res.status(200).json(user);
}

async function userLogout(req, res, next) {
  await Token.destroy({
    where: {
      value: req.header("x-access-token"),
    },
  });

  res.status(200).json({ message: "Logged out" });

}

initRoutes();

module.exports = router;
