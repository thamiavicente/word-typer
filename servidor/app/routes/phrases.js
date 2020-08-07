module.exports = function(app) {

	var api = app.api.phrases;

	app.route('/phrases/')
		.get(api.lista);
};
