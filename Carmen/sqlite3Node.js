var http = require('http')
var express = require('express')
var app = express()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('carmen.db')

db.get("SELECT 'id', 'nome', 'sobrenome' FROM 'primeira'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "primeira" ' +
           '("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
           '"nome" TEXT, ' +
           '"sobrenome" TEXT)', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'primeira' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'primeira' already initialized.");
  }
});

db.all('SELECT * FROM primeira ORDER BY id', function(err, row){
	if (err !== null){
		console.log(err);
	}
	else {
		for (var i = 0; i < row.length; i++) {
			str = '' + row[i].id + ' ' + row[i].nome + ' ' + row[i].sobrenome;
			console.log(str);
		}
	}
})

/*
app.get('/', function(req, res, next) {

  db.all('SELECT * FROM bookmarks ORDER BY title', function(err, row) {
    if(err !== null) {
      // Express handles errors via its next function.
      // It will call the next operation layer (middleware),
      // which is by default one that handles errors.
      next(err);
    }
    else {
      console.log(row);
      res.render('index.jade', {bookmarks: row}, function(err, html) {
        res.send(200, html);
      });
    }
  });
});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res, next) {
  title = req.body.title;
  url = req.body.url;
  sqlRequest = "INSERT INTO 'bookmarks' (title, url) " +
               "VALUES('" + title + "', '" + url + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res, next) {
  db.run("DELETE FROM bookmarks WHERE id='" + req.params.id + "'",
         function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
});*/