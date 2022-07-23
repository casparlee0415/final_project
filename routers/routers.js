const express=require('express');
const bodyParser=require('body-parser');

const { homepage,brandpage,scooterpage}=require('../controllers/web_controller.js');

const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/',homepage);
router.get('/index',homepage);
router.get('/brand',brandpage);
router.get('/scooter',scooterpage);

module.exports=router;