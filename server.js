const express = require('express');
const http = require('http');
const cors = require('cors');
const { initDB } = require('./dataBase/index');

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


require("./controllers/route")(app)

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})


