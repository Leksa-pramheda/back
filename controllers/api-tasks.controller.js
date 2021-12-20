const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Employee = require("../dataBase/models/Employee.model");
const Tasks = require("../dataBase/models/Tasks.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const { Op } = require("sequelize");
// const User = require('../dataBase/models/User.model');

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));

  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));

  router.post("/", asyncHandler(requireToken), asyncHandler(createToDo));

  router.patch("/:id", asyncHandler(requireToken), asyncHandler(patchToDo));

  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
}

async function getToDos(req, res, next) {
  let employeeList = [];
  employeeList = await Employee.findAll({
    where: {
      employee_status: "Сотрудник",
    },
    raw: true,
  });

  let employees = [];
  employees = await Employee.findAll({
    raw: true,
  });

  let stat = await Employee.findOne({
    where: {
      id_employee: req.userId,
    },
  });
  let todoList = [];
  if (stat.employee_status === "Сотрудник") {
    todoList = await Tasks.findAll({
      where: {
        idExecutor: req.userId,
      },
    });
  } else if (stat.employee_status === "Менеджер") {
    let empl = [];
    for (let i in employeeList) {
      Object.keys(employeeList[i]).forEach((key) => {
        if (key === "id_employee") {
          empl.push(employeeList[i][key]); // 'Bob', 47
        }
      });
    }

    console.log(employeeList);
    console.log(empl);
    let todoList1 = await Tasks.findAll({
      where: {
        idExecutor: {
          [Op.in]: empl,
        },
        idAuthor: req.userId,
      },
    });
    let todoList2 = await Tasks.findAll({
      where: {
        [Op.and]: [
          {
            idAuthor: req.userId,
            idExecutor: req.userId,
          },
        ],
      },
    });

    todoList = todoList1.concat(todoList2);
    todoList.sort((a, b) => (a.id_task > b.id_task ? 1 : -1));
    todoList.forEach((item) => {
      let Author = employees[item.idAuthor - 1];
      let Executor = employees[item.idExecutor - 1];
      console.log(employees);
      console.log(item.idAuthor);
      console.log(employees[item.idAuthor - 1]);
      item.idAuthor =
        Author.last_name_employee +
        " " +
        Author.name_employee +
        " " +
        Author.patronymic_employee;
      item.idExecutor =
        Executor.last_name_employee +
        " " +
        Executor.name_employee +
        " " +
        Executor.patronymic_employee;
    });
  } else if (stat.employee_status === "Администратор") {
    todoList = await Tasks.findAll();
  }

  res.status(200).json({ todoList });
}

async function getToDoById(req, res, next) {
  const todo = await Tasks.findOne({
    where: {
      id: req.params.id,
      employeeId: req.userId,
    },
  });

  if (!todo) {
    throw new ErrorResponse("No todos found!", 404);
  }

  res.status(200).json(todo);
}

async function createToDo(req, res, next) {
  let employeeList = [];
  employeeList = await Employee.findAll({
    where: {
      employee_status: "Сотрудник",
    },
    raw: true,
  });
  let empl = [];
  for (let i in employeeList) {
    Object.keys(employeeList[i]).forEach((key) => {
      if (key === "id_employee") {
        empl.push(employeeList[i][key]);
      }
    });
  }

  let stat = await Employee.findOne({
    where: {
      id_employee: req.userId,
    },
  });
  let todoList = [];
  if (stat.employee_status === "Сотрудник") {
    throw new ErrorResponse("Нет доступа!", 403);
  } else if (stat.employee_status === "Менеджер") {
    if (
      empl.includes(req.body.idExecutor) ||
      req.body.idExecutor === req.userId
    ) {
      todoList = await Tasks.create({
        ...req.body,
        idAuthor: req.userId,
      });
    } else {
      throw new ErrorResponse(
        "Нет прав на назначение задачи другому менеджеру!",
        403
      );
    }
  } else if (stat.employee_status === "Администратор") {
    todoList = await Tasks.create({
      ...req.body,
      idAuthor: req.userId,
    });
  }
  res.status(200).json(todoList);
}

async function patchToDo(req, res, next) {
  let employeeList = [];
  employeeList = await Employee.findAll({
    where: {
      employee_status: "Сотрудник",
    },
    raw: true,
  });
  let empl = [];
  for (let i in employeeList) {
    Object.keys(employeeList[i]).forEach((key) => {
      if (key === "id_employee") {
        empl.push(employeeList[i][key]);
      }
    });
  }

  let stat = await Employee.findOne({
    where: {
      id_employee: req.userId,
    },
  });

  let todo = [];
  if (stat.employee_status === "Сотрудник") {
    todo = await Tasks.findOne({
      where: {
        id_task: req.params.id,
        idExecutor: req.userId,
      },
    });

    if (!todo) throw new ErrorResponse("No todos found!", 404);
    console.log(todo);

    todo = await todo.update(req.body, { returning: true });

    // throw new ErrorResponse("Нет доступа!", 403);
  } else if (stat.employee_status === "Менеджер") {
    todo = await Tasks.findOne({
      where: {
        id_task: req.params.id,
        idAuthor: req.userId,
      },
    });
    if (!todo) throw new ErrorResponse("No todos found!", 404);
    console.log(empl.includes(todo.idExecutor));
    console.log(todo.idExecutor === req.userId);
    console.log(todo.idExecutor === req.userId);
    let Keys = [];
    Object.keys(req.body).forEach((key) => {
      // if (key === "id_employee") {
      Keys.push(key); // 'Bob', 47
      console.log(key);
      // }
    });
    // }
    let attributes = [
      "id_task",
      "task",
      "priority",
      "execution_date",
      "createdAt",
      "updatedAt",
      "idAuthor",
      "idExecutor",
      "contractId",
      "idContactPerson",
    ];
    console.log(Keys.includes("idExecutor"));
    if (Keys.includes("idExecutor")) {
      if (
        empl.includes(req.body.idExecutor) ||
        req.body.idExecutor === req.userId
      ) {
        todo = await todo.update(req.body, { returning: true });
      } else {
        throw new ErrorResponse(
          "Нет прав на назначение задачи другому менеджеру!",
          403
        );
      }
    } else {
      todo = await todo.update(req.body, { returning: true });
    }
  } else if (stat.employee_status === "Администратор") {
    todo = await Tasks.findOne({
      where: {
        id_task: req.params.id,
      },
    });

    if (!todo) throw new ErrorResponse("No todos found!", 404);
    console.log(todo);
    todo = await todo.update(req.body, { returning: true });
  }
  res.status(200).json(todo);
}

async function deleteToDoById(req, res, next) {
  const todo = await Tasks.findOne({
    where: {
      id_task: req.params.id,
    },
  });

  if (!todo) throw new ErrorResponse("No todos found!", 404);

  await todo.destroy();

  res.status(200).json({ message: "Todo was deleted" });
}

initRoutes();

module.exports = router;
