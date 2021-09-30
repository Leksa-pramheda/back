const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'postgres',
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

  sequelize.sync().then(result=>{
    console.log(result,"DONE-----------------------------");
    console.log(sequelize.models);
    console.log(TODO === sequelize.models.todo);
  })
  .catch(err=> console.log(err));

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

const TODO = sequelize.define("todo", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING      
    }
  });

  console.log(TODO === sequelize.models.TODO);
//  sequelize.
console.log("type ",typeof(TODO))
console.log("todooooooooooooooooooooooo",TODO)
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


