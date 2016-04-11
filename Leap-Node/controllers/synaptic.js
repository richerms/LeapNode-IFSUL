module.exports = function (app) {
	var SynapticController = {
		index: function (req, res) {
			res.render('synaptic/index');
		}
	};
	return SynapticController;
};