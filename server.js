var express           = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser        = require('body-parser');
var mysql             = require('mysql');
var app               = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.listen(PORT, function() {
  console.log('Listening on %s', PORT);
});