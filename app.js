const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const engine=require('ejs-locals');
const cors=require('cors');
const fileUpload=require('express-fileupload');
const usersRoutes=require('./routers/routers.js');
const morgan=require('morgan');
const _ =require('lodash');
const compression=require('compression');
const {sequelize,scooter,brand,produced}=require('./models');


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

app.listen(port,()=>{
  console.log("Server Up On");
  sequelize.authenticate();
  console.log("DataBase Connected");
});