module.exports = function(app) {
	var synaptic = app.controllers.synaptic;
	app.get('/st', synaptic.index);
};