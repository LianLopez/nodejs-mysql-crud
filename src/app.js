const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConn = require('express-myconnection');



const app = express();


// imports routes
const userRoutes = require('./routes/user');


// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConn(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'cnsexample',
  insecureAuth: true
}, 'single'));
app.use(express.urlencoded({
  extended: false
}));

//routes
app.use('/', userRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('Server on port 3000');
});