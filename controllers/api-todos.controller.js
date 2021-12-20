const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
// const User = require('../dataBase/models/User.model');

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));

  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));

  router.post("/", asyncHandler(requireToken), asyncHandler(createToDo));

  router.patch("/:id", asyncHandler(requireToken), asyncHandler(patchToDo));

  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteToDos));

  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
}

async function getToDos(req, res, next) {
  const todoList = await ToDo.findAll({
    where: {
      userId: req.userId,
    },
  });

  res.status(200).json({ todoList });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!todo) {
    throw new ErrorResponse("No todos found!", 404);
  }

  res.status(200).json(todo);
}

async function createToDo(req, res, next) {
  const todo = await ToDo.create({
    ...req.body,
    userId: req.userId,
  });

  res.status(200).json(todo);
}

async function patchToDo(req, res, next) {
  let todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!todo) throw new ErrorResponse("No todos found!", 404);

  // console.log(req.body);
  todo = await todo.update(req.body, {returning : true});
  // console.log(req.body);
  // todo = await ToDo.findByPk(req.params.id);

  res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
  await ToDo.destroy({
    where: {
      userId: req.userId,
    },
  });

  res.status(200).json({ message: "Your todos were deleted" });
}

async function deleteToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });

  if (!todo) throw new ErrorResponse("No todos found!", 404);

  await todo.destroy();

  res.status(200).json({ message: "Todo was deleted" });
}

initRoutes();

module.exports = router;
