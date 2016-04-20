module.exports = function (app) {
	var db = require('./../middlewares/database')
	  ,	CollectController = {
		index: function (req, res) {
			res.render('collect/index');
		},
		done: function (req, res) {
			res.render('collect/done');
		},
		saveRow: function (req, res) {			
			//verificar se o objeto vai estar no body
			db.add(req.body);
		},
		create: function (req, res) {
			db.create;
			res.render('<p>DB CREATED<\p>');
		}
	};
	return CollectController;
};