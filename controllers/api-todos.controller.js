const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler } = require('../middlewares/middlewares');
// const User = require('../dataBase/models/User.model');

const router = Router();


function initRoutes() {
    router.get('/', asyncHandler(getToDos));

    router.get('/:id', asyncHandler(getToDoById));

    router.post('/', asyncHandler(createToDo));

    router.patch('/:id', asyncHandler(patchToDo));

    router.delete('/', asyncHandler(deleteToDos));

    router.delete('/:id', asyncHandler(deleteToDoById));
}

async function getToDos(req, res, next) {
    // const User = await User.create(); //----

    const todoList = await ToDo.findAll();

    res.status(200).json({ todoList });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todos found!', 404);
    }

    res.status(200).json(todo);
}

async function createToDo(req, res, next) {
    const todo = await ToDo.create(req.body);

    res.status(200).json(todo);
}

async function patchToDo(req, res, next) {
    let todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todos found!', 404);
    }

    console.log(req.body);
    await todo.update(req.body);
    console.log(req.body);

    todo = await ToDo.findByPk(req.params.id);

    res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
    await ToDo.destroy({
        truncate: true,
    });

    res.status(200).json({ message: 'OK'});
}

async function deleteToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo)  throw new ErrorResponse('No todos found!', 404);
    

    await todo.destroy();

    res.status(200).json({ message: 'OK'});
}


initRoutes();

module.exports = router;