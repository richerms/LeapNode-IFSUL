var express = require('express')
   , load = require('express-load')
   , cookieParser = require('cookie-parser')
   , bodyParser = require('body-parser')
   , methodOverride = require("method-override")
   , error = require('./middlewares/error')
   , sqlite3 = require('sqlite3').verbose()
   , app = express()
   , server = require('http').Server(app)
   , synaptic = require('synaptic')
   ;
global.DATABASE = new sqlite3.Database('collectedData.db');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

server.listen(3000, function(){
	console.log('Server Runing');
});