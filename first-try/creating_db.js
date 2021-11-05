const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres::memory:');

const TODO = sequelize.define("todo", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING      
  }
});

console.log(TODO === sequelize.models.todo);
console.log(TODO.options);


sequelize.sync().then(result=>{
  console.log(result,"DONE-----------------------------");
  console.log(sequelize.models);
  const first_try = TODO.create({ title: "second task" });
  console.log(" instance - ",first_try instanceof TODO); // true
  console.log(first_try.title); // "Jane"
  console.log(TODO === sequelize.models.todo);
})
.catch(err=> console.log(err));

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// const first_try = TODO.create({ title: "first task",
// description: "try to do it well!" });
// console.log(first_try instanceof TODO); // true
// console.log(first_try.title); // "Jane"
// })();
// const first_try = await TODO.create({ title: "first task",
// description: "try to do it well!" });
// Jane exists in the database now!

// TODO.create({
//   title: "first task",
//   description: "try to do it well!"
// })
// .then((record) => console.log(record)).catch(function(err){
//   //do something when you get error
//   //you could check if this is validation error or other error
//   console.log(err)
//   console.log("oh, nooooooooooo ", TODO.arguments)
// });
// console.log("elem ",TODO.findAll())
// console.log("or ", TODO)