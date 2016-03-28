module.exports = function(app) {
	var teste = app.controllers.teste;
	app.get('/test', teste.index);
};