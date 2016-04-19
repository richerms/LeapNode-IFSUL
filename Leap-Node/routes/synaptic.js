module.exports = function(app) {
	var synaptic = app.controllers.synaptic
	  , middle = require("./../middlewares/synaptic.js");
	
	app.get('/st', middle.loadTest, synaptic.index);
	app.get('/XORTest', middle.XORTest);
};