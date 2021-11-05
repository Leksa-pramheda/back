const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/:id', asyncHandler(getUserInfo));
    router.patch('/:id', asyncHandler(updateUserInfo));
    router.post('/logout',asyncHandler(userLogout));
}


async function getUserInfo(req, res, next) {
    // console.log(req)
    // console.log(req.body)
    let user = await User.findByPk(req.params.id);
    if (!user) {
        throw new ErrorResponse('No users found!', 404);
    }

    res.status(200).json(user);
  };

async function updateUserInfo(req, res, next) {
    const id = req.params.id;
  
    let user = await User.findByPk(id);

    console.log(req.body);
    await user.update(req.body);
    console.log(req.body);

    user = await User.findByPk(req.params.id);

    res.status(200).json(user);
}

async function userLogout(req, res, next) {
    console.log(req)
    let token = await Token.findOne({
        where: {
          value: req.params.id,
        },
      });
    
      await token.destroy();
      
      res.status(200).json({ message: "Logged out" });
}

initRoutes();

module.exports = router;