const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const whitelist=['http://localhost:5500','https://myapp.co'];
const options={
  origin:(origin,callback)=>{
    if(whitelist.includes(origin) !== 1){
      callback(null,true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});