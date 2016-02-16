var express           = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser        = require('body-parser');
var mysql             = require('mysql');
var app               = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'users_db'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.get('/', function(req, res) {
  res.render('register');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/register', function(req, res) {
  connection.query('INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)', [req.body.fname, req.body.lname, req.body.email, req.body.password], function(err, result) {
    if (err) throw err;
    res.redirect('/success');
  });
});

app.post('/login', function(req, res) {
  connection.query('SELECT * FROM users WHERE email=? AND password=?', [req.body.email, req.body.password], function(err, result) {
    if (err) throw err;
    if(result.length > 0) {
      res.send('you logged in');
    } else {
      res.redirect('/login');  
    }
  });
});

app.get('/success', function(req, res) {
  res.send('you successfully registered and i spelled successfully wrong');
});

app.listen(PORT, function() {
  console.log('Listening on %s', PORT);
});