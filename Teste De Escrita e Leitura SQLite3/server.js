var express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('database.db'),
	currentDate = new Date();	
	var H = '';
	
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
		
db.get('SELECT * FROM name', function(err, row) {
	if (err != null) {
		db.run('CREATE TABLE "name" (' +
				'"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
				'"name" TEXT, ' +
				'"idade" INTEGER, ' +
				'"datetime" TEXT)', function(err) {
			if (err != null) {
				console.log(err);
			}
			else {
				console.log('Tabela name foi criada.');
			}
		})
	}
	else {
		console.log('Tabela name foi encontrada.');
	}
});

app.post('/data', function(req, res) {
	console.log('Tentativa de salvar dados');
	
	var t = currentDate.getFullYear() + '.' + 
			currentDate.getMonth() + '.' + 
			currentDate.getDate()/* + ' ' + 
			currentDate.getHours + ':' +
			currentDate.getMinutes + ':' +
			currentDate.getSeconds + ':' +
			currentDate.getMilliseconds*/;
	var n = '"' + req.body.name + '"';
	var i = '"' + req.body.idade + '"';
			
	console.log('Data da Tentativa: ' + t);
	db.run('INSERT INTO name (name, idade, datetime) VALUES ('  + 
			n + ', ' + i + ', "' + t + '")', //nome da coluna direto, valor que vai ser guardado entre "aspas"
			function (err) {
				if (err != null)
					console.log(err);
			});
	res.send("Tudo Certo");
});

app.get('/read', function(req, res) {
	H = '<table><tr><th>ID</th><th>Name</th><th>idade</th></tr>';
	
	db.all('SELECT * FROM name', function (err, row){
		if (err != null) {
			console.log(err);
		}
		else {
			for (var j = 0; j < row.length; j++){
				H = H + '<tr><td>' + row[j].id +
						'</td><td>' + row[j].name +
						'</td><td>' + row[j].idade +						
						'</td></tr>';
				console.log(row[j].name)
			}
			
			H = H + '</table>'
			res.send(H);	//Tem que estar dentro desse bloco para o javascript levar em consideração as alterações feitas em H neste escopo.
		}
	})
	
})

app.listen(8080);
console.log("Servidor Rodando");