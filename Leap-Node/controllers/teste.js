module.exports = function (app) {
	var TestController = {
		index: function (req, res) {
			res.render('leapMotion/Left-or-Rigth');
		}
	};
	return TestController;
};