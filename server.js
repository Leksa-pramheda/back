const express = require('express');
const http = require('http');
const cors = require('cors');
const { initDB } = require('./dataBase/index');
const ErrorResponse = require('./classes/error-response');
const { errorHandler, notFound} = require('./middlewares/middlewares');

const apiTodosRouter = require('./controllers/api-todos.controller');
const apiUserRouter = require('./controllers/api-user.contoller');
const apiTokensRouter = require('./controllers/api-auth.controller')
//const testRouter = require('./controllers/test.controller');

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
  //console.log('body ',req.body.a)

  next();
});


// require("./controllers/apiTodosRouter")(app)
app.use('/api/auth', apiTokensRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/todos', apiTodosRouter);
//app.use('/test', testRouter);

app.use(notFound);
app.use(errorHandler);


http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})


