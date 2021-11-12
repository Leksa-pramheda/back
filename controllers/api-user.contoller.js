const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
// };

const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUserInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(userLogout));
}

async function getUserInfo(req, res, next) {
  let user = await User.findByPk(req.userId);
  // if (!user) {
  //   throw new ErrorResponse("No users found!", 404);
  // }

  res.status(200).json(user);
}

async function updateUserInfo(req, res, next) {
  let user = await User.update(req.body, {
    where: { id: req.userId },
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

  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   // response.setHeader("Access-Control-Allow-Methods", "*");
  // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, x-access-token');
  //   res.setHeader("x-access-token", "123");
  //   //res.writeHead(200,"x-access-token")
  //   console.log(req.headers);

  // let token = req.headers["x-access-token"];
  // console.log("---------",token);
  // console.log("*****",res.headers);
  // // token = res.headers["x-access-token"];
  // // console.log("*** ",token);
  // // let token = await Token.findOne({
  // //     where: {
  // //       value: req.params.id,
  // //     },
  // //   });

  // //await token.destroy();
  // next();
}

initRoutes();

module.exports = router;
