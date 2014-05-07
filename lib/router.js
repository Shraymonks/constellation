Router.map(function() {
	this.route('lobby', {
		path: "/"
	});

	this.route('game', {
		path: "/game/:_id",
		template: "gameBoard"
	});
});