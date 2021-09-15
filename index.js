const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//exports.json = bodyParser.json;

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

  app.post('/sum', (req, res) => {
    sum=req.body.a + req.body.b
    res.status(200).json({ sum});
  })

  app.post('/reverseCase', (req, res)=>{
    str=req.body.str
    reversed='';
    for (let key in str) {
        reversed += str[key] === str[key].toUpperCase() ? str[key].toLowerCase() : str[key].toUpperCase();
    }
    res.status(200).json({reversed})
  })

  app.post('/arrayReverse',(req,res)=>{
    arrInput=req.body.array
    arr=[]
    for (let i in arrInput){
      arr[i]  = arrInput[arrInput.length-i-1] ;
    }
    res.status(200).json({arr})
  })

  app.get('/arrayReverse',(req,res)=>{
    arr=req.body.array
    arr.reverse()
    res.status(200).json({arr})

  })

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