const TODO = require('../dataBase/models/ToDo.model')
const ErrorResponse = require('../classes/error-response');
const { asyncHandler } = require('../middlewares/middlewares');

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    console.log("title:", req.body.title, "description:", req.body.description);
    console.log();
  }

  // Save Tutorial in the database
  TODO.create(req.body)
    .then(function () {
      console.log("Value Appended");
      res.status(200).json(data);
      //            res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error ",
      });
      console.log("ERRRRRRRRRRRRR: ", err);
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  TODO.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  TODO.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving task with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  TODO.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  TODO.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  TODO.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
