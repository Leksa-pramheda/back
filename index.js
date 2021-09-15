const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

exports.json = bodyParser.json;

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);
  console.log('body ',req.body.a)

  next();
});

/*app.all('/test', (req, res) => {
    res.status(200).json({ message: 'KKKKKK'});
  })*/

  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'got'});
  })

  app.post('/test', (req, res) => {
    res.status(200).json({ message: 'post'});
  })

  app.put('/test', (req, res) => {
    res.status(200).json({ message: 'put'});
  })

  app.patch('/test', (req, res) => {
    res.status(200).json({ message: 'patch'});
  })

  app.delete('/test', (req, res) => {
    res.status(200).json({ message: 'delete'});
  })



http.createServer(app).listen(80, () => {
  console.log('Server is working on port 3000');
})