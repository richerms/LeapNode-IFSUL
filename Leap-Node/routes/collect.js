module.exports = function(app) {
	var collect = app.controllers.collect;
	app.get('/collect', collect.index);
	app.get('/done', collect.done);
	app.post('/save_row', collect.saveRow);
	app.get('/createnewdb', collect.create);
};