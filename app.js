import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import path from 'path';
import engine from 'ejs-locals';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import usersRoutes from './routes/routers.js';
import morgan from 'morgan';
import _ from 'lodash';
import compression from 'compression';

const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(fileUpload({
  createParentPath: true
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());





app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
app.use('/assets', express.static('public/assets'));
app.use(compression());


app.use('/', usersRoutes);

var port = process.env.PORT||3000;

app.listen(port);

export var pool = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'bc7884781ae97a',
  password: '775b6e8e',
  database: 'heroku_f13ed75351ba510',
  port:'3306',
  connectionLimit : 10
})

//// Connect to MySQL
pool.getConnection((err,db) => {
  if(err){
      throw err;
  }
  console.log('MySQL connected');
  db.query("Select 1 from brand",(err,result)=>{
    if(err){
      throw err;
    }
    db.release();
  });
  
})