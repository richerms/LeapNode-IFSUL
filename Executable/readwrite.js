/*
 * Module dependencies
 */
var express = require('express')
var fs = require('fs');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('carmen.db');
var bodyParser = require('body-parser');

var TABLE_NAME = 'gestures';
var TABLE_CONTENT = [
		['id', 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'],
		['timestamp', 'INTEGER'],
		['gesture', 'TEXT'],
		['palmPositionX', 'REAL'],
		['palmPositionY', 'REAL'],
		['palmPositionZ', 'REAL'],
		['fingers0PositionX', 'REAL'],
		['fingers0PositionY', 'REAL'],
		['fingers0PositionZ', 'REAL'],
		['fingers1PositionX', 'REAL'],
		['fingers1PositionY', 'REAL'],
		['fingers1PositionZ', 'REAL'],
		['fingers2PositionX', 'REAL'],
		['fingers2PositionY', 'REAL'],
		['fingers2PositionZ', 'REAL'],
		['fingers3PositionX', 'REAL'],
		['fingers3PositionY', 'REAL'],
		['fingers3PositionZ', 'REAL'],
		['fingers4PositionX', 'REAL'],
		['fingers4PositionY', 'REAL'],
		['fingers4PositionZ', 'REAL'],
		['fingers0Distance', 'REAL'],
		['fingers1Distance', 'REAL'],
		['fingers2Distance', 'REAL'],
		['fingers3Distance', 'REAL'],
		['fingers4Distance', 'REAL']
	];

app.use(bodyParser.urlencoded({extended: false}));

//Verifica o banco de dados. Cria a tabela se não a encontrar.
db.get('SELECT * FROM ' + TABLE_NAME, function(err, row) {
	if (err != null) {
		var content ='';
		
		for (var i = 0; i < TABLE_CONTENT.length; i++){
			content += '"' + TABLE_CONTENT[i][0] + '" ' + TABLE_CONTENT[i][1];
			if (i < TABLE_CONTENT.length - 1)
				content += ', ';
		}
		
		db.run('CREATE TABLE "' + TABLE_NAME + '" (' + content + ')', 
		function(err) {
			if (err != null) {
				console.log(err);
			}
			else {
				console.log('Tabela ' + TABLE_NAME + ' não encontrada.');
				console.log('Tabela criada.');
			}
		})
	}
	else {
		console.log('Tabela ' + TABLE_NAME + ' encontrada.');
	}
});

app.get("/", function(req, res){
	
});

app.post("/save", function(req, res){
	console.log('Request for /save received.')
	
	var content = '';
	
	for (var i = 1; i < TABLE_CONTENT.length; i++){
			content += TABLE_CONTENT[i][0];
			if (i < TABLE_CONTENT.length - 1)
				content += ', ';
		}
	
	var data = '"' + req.body.timeStamp + '", '
			+ '"' + req.body.gesture + '", '
			+ '"' + req.body.palmPosition + '", '
			+ '"' + req.body.fingersPosition[0] + '", '
			+ '"' + req.body.fingersPosition[1] + '", '
			+ '"' + req.body.fingersPosition[2] + '", '
			+ '"' + req.body.fingersDistance[0] + '", '
			+ '"' + req.body.fingersDistance[1] + '", '
			+ '"' + req.body.fingersDistance[2] + '"';
	
	db.run('INSERT INTO ' + TABLE_NAME + ' (' + content + ') VALUES (' + data + ')',
			function (err) {
				if (err != null)
					console.log(err);
				else
					console.log('Dados salvos com sucesso.');
			});
})

app.listen(8080);

console.log("Servidor rodando...")