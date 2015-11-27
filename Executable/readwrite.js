/*
 * Module dependencies
 */
var express = require('express')
var fs = require('fs');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('consuelo.db');
var bodyParser = require('body-parser');

var TABLE_NAME = 'gestures';
var TABLE_CONTENT = [
		['id', 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'],
		['timestamp', 'INTEGER'],
		['name', 'TEXT'],
		['gesture', 'TEXT'],
		['palmPX', 'REAL'],
		['palmPY', 'REAL'],
		['palmPZ', 'REAL'],
		['f0PosX', 'REAL'],
		['f0PosY', 'REAL'],
		['f0PosZ', 'REAL'],
		['f1PosX', 'REAL'],
		['f1PosY', 'REAL'],
		['f1PosZ', 'REAL'],
		['f2PosX', 'REAL'],
		['f2PosY', 'REAL'],
		['f2PosZ', 'REAL'],
		['f3PosX', 'REAL'],
		['f3PosY', 'REAL'],
		['f3PosZ', 'REAL'],
		['f4PosX', 'REAL'],
		['f4PosY', 'REAL'],
		['f4PosZ', 'REAL'],
		['Df0palm', 'REAL'],
		['Df1palm', 'REAL'],
		['Df2palm', 'REAL'],
		['Df3palm', 'REAL'],
		['Df4palm', 'REAL'],
		['Df0f1', 'REAL'],
		['Df0f2', 'REAL'],
		['Df0f3', 'REAL'],
		['Df0f4', 'REAL'],
		['Df1f0', 'REAL'],
		['Df1f2', 'REAL'],
		['Df1f3', 'REAL'],
		['Df1f4', 'REAL'],
		['Df2f0', 'REAL'],
		['Df2f1', 'REAL'],
		['Df2f3', 'REAL'],
		['Df2f4', 'REAL'],
		['Df3f0', 'REAL'],
		['Df3f1', 'REAL'],
		['Df3f2', 'REAL'],
		['Df3f4', 'REAL'],
		['Df4f0', 'REAL'],
		['Df4f1', 'REAL'],
		['Df4f2', 'REAL'],
		['Df4f3', 'REAL'],
		['handDirX', 'REAL'],
		['handDirY', 'REAL'],
		['handDirZ', 'REAL'],
		['f0DirX', 'REAL'],
		['f0DirY', 'REAL'],
		['f0DirZ', 'REAL'],
		['f1DirX', 'REAL'],
		['f1DirY', 'REAL'],
		['f1DirZ', 'REAL'],
		['f2DirX', 'REAL'],
		['f2DirY', 'REAL'],
		['f2DirZ', 'REAL'],
		['f3DirX', 'REAL'],
		['f3DirY', 'REAL'],
		['f3DirZ', 'REAL'],
		['f4DirX', 'REAL'],
		['f4DirY', 'REAL'],
		['f4DirZ', 'REAL'],
		['f0Ext', 'REAL'],
		['f1Ext', 'REAL'],
		['f2Ext', 'REAL'],
		['f3Ext', 'REAL'],
		['f4Ext', 'REAL'],
		['Confidence', 'REAL']
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
	
	//console.log(req.body);
	
	var content = '';
	
	for (var i = 1; i < TABLE_CONTENT.length; i++){
			content += TABLE_CONTENT[i][0];
			if (i < TABLE_CONTENT.length - 1)
				content += ', ';
		}
		
	//console.log(content);
	
	var data = '';
	
	for (var p in req.body)
		if (req.body.hasOwnProperty(p)){
			data += '"' + req.body[p] + '", ';
		}
			
	data = data.substring(0, data.length - 2);
	
	//console.log(data);
	
	db.run('INSERT INTO ' + TABLE_NAME + ' (' + content + ') VALUES (' + data + ')',
			function (err) {
				if (err != null){
					console.log(err);
					res.send("Erro ao salvar os dados.");
				}
				else
					res.send("Dados salvos com sucesso.");
			});
})

app.listen(8080);

console.log("Servidor rodando...")