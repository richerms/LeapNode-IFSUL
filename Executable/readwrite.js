/*
 * Module dependencies
 */
var express = require('express')
var fs = require('fs');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('carmen.db');
var bodyParser = require('body-parser');

var TABLE_NAME = 'gesture';
var TABLE_CONTENT = [
		['id', 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'],
		['timestamp', 'INTEGER NOT NULL'],
		['gesture', 'TEXT'],
		['palmPosition', 'TEXT'],
		['thumbDipPosition', 'TEXT'],
		['indexDipPosition', 'TEXT'],
		['middleDipPosition', 'TEXT'],
		['ringDipPosition', 'TEXT'],
		['littleDipPosition', 'TEXT'],
		['thumbDistance', 'TEXT'],
		['indexDistance', 'TEXT'],
		['middleDistance', 'TEXT'],
		['ringDistance', 'TEXT'],
		['littleDistance', 'TEXT']
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

//Não achei como usar o req.body como um array ao invés de um objeto
app.post("/save", function(req, res){
	console.log('Request for /save received.')
	
	var content = '';
	
	for (var i = 1; i < TABLE_CONTENT.length; i++){
			content += TABLE_CONTENT[i][0];
			if (i < TABLE_CONTENT.length - 1)
				content += ', ';
		}
	
	db.run('INSERT INTO ' + TABLE_NAME + ' (' + content + ') VALUES ('  + 
			'"' + parseInt(req.body.timestamp) + '", ' +
			'"' + req.body.gesture + '", ' +
			'"' + req.body.palmPosition + '", ' +
			'"' + req.body.thumbDipPosition + '", ' +
			'"' + req.body.indexDipPosition + '", ' +
			'"' + req.body.middleDipPosition + '", ' +
			'"' + req.body.ringDipPosition + '", ' +
			'"' + req.body.littleDipPosition + '", ' +
			'"' + req.body.thumbDistance + '", ' +
			'"' + req.body.indexDistance + '", ' +
			'"' + req.body.middleDistance + '", ' +
			'"' + req.body.ringDistance + '", ' +
			'"' + req.body.littleDistance + '")',
			function (err) {
				if (err != null)
					console.log(err);
			});
	
	res.end("Requerimento enviado. Verifique o banco de dados para conferir se os arquivos foram salvos corretamente.")
})

app.listen(8080);

console.log("Servidor rodando...")