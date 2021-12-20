const express = require('express');
const http = require('http');
const cors = require('cors');
<<<<<<< HEAD:index1.js
const { initDB } = require('./dataBase/index');
const { errorHandler, notFound} = require('./middlewares/middlewares');
const apiTodosRouter = require('./controllers/api-todos.controller');
=======
const { initDB } = require('./dataBase/index0');
const { errorHandler, notFound} = require('./middlewares/middlewares');
const apiTasksRouter = require('./controllers/api-tasks.controller');
>>>>>>> 57938b9ea579279c2087d414e1f3bfb5e11d45c8:index.js
const apiUserRouter = require('./controllers/api-user.contoller');
const apiAuthRouter = require('./controllers/api-auth.controller')

const app = express();
initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);
  next();
});

app.use('/api/auth', apiAuthRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/tasks', apiTasksRouter);

app.use(notFound);
app.use(errorHandler);


http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})


