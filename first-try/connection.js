const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'js',
  'alexa',
  'Leksa@25',
  {
    dialect: 'postgres',
  }
)

sequelize
 .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))


  const TODO = sequelize.define("todo", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING      
    }
  });

  http.createServer(app).listen(80, () => {
    console.log('Server is working on port 3000');
  })

//   console.log(TODO === sequelize.models.TODO);
// //  sequelize.
// console.log("type ",typeof(TODO))
// console.log("todooooooooooooooooooooooo",TODO)
// = (req, res) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }
//   else
//   {
//     console.log("title:", req.body.title,
//     "description:", req.body.description)
//     console.log()
//   }

//   // Create a Tutorial
//   const todo = {
//     title: req.body.title,
//     description: req.body.description
//   };

//   // Save Tutorial in the database
//   TODO.create({
//     title: req.body.title,
//     description: req.body.description
//   })
//     .then(function() {
//       console.log("Value Appended");
// //            res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error "
//       });
//       console.log("ERRRRRRRRRRRRR: ", err)
//     });
// };

  sequelize.sync().then(result=>{
    console.log(result,"DONE-----------------------------");
    //console.log(sequelize.models);
    const first_try = TODO.create({ title: "second task" });
    // console.log(" instance - ",first_try instanceof TODO); // true
    // console.log(first_try.title); // "Jane"
    // console.log(TODO === sequelize.models.todo);

    app.get('/test', (req, res) => {
      const title = req.query.title;
      //console.log(TODO.findAll.title);
      TODO.findAll()
        .then(data => {
          res.status(200).json("data:",data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error "
          });
        });
      res.status(200).json({ message: 'got'});
    })
  })
  .catch(err=> console.log("error rrrr",err));

// class TODO extends Sequelize.Model {}

//   TODO.init(
//     {
//       title: {
//         type: Sequelize.STRING,
//         //allowNull: false,
//       },
//       description: {
//         type: Sequelize.STRING,
//       },
//     },
//     { sequelize, modelName: 'TODO' }
//   );


  // sequelize.TODO.create({
  //           title: "first task",
  //           description: "try to do it well!"
  //       })
  //       .then((record) => console.log(record)).catch(function(err){
  //           //do something when you get error
  //           //you could check if this is validation error or other error
  //           console.log(err)
  //         });
  // console.log(sequelize.TODO.findAll())
  // const { Sequelize } = require('sequelize');

// // Option 1: Passing a connection URI
// //const sequelize = new Sequelize('postgres://user:alexa:5432/postgres') // Example for postgres


// // Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('postgres', 'alexa', 'Leksa251523', {
//   host: 'localhost',
//   dialect:  'postgres'
// });

// sequelize
//    .authenticate()
//    .then(() => console.log('Connected.'))
//    .catch((err) => console.error('Connection error: ', err))
// /// const Sequelize = require('sequelize')

// // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // const sequelize = new Sequelize(
// //   'postgres',
// //   'alexa',
// //   'Leksa251523',
// //   {
// //     dialect: 'postgres',
// //   }
// // )

// // sequelize
// //   .authenticate()
// //   .then(() => console.log('Connected.'))
// //   .catch((err) => console.error('Connection error: ', err))


// //   //const { Sequelize } = require('sequelize');

// // // Option 1: Passing a connection URI


