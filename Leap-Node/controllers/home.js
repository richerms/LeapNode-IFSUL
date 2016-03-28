module.exports = function (app) {
	var IndexController = {
		index: function (req, res) {
			res.render('home/index');
		}
	};
	return IndexController;
};