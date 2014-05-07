Meteor.subscribe("games");

Template.lobby.events({
	'click input': function() {
		var gameId = Games.insert({
			players: 1
		});

		Meteor.session.set('gameId', gameId);

		console.log("Creating a new Game", gameId);
	},
	'click .join': function(e) {
		console.log("Joining game ", e);
		Router.go('/game');
	}
});

Template.lobby.games = function() {
	return Games.find({}).fetch();
}

Template.gameBoard.events({
	'click .exit-game': function() {
		Router.go('/');
	}
});

// Initialize game state

Meteor.startup(function() {
	console.log("All loaded");
});

console.log("Running this code");

function logRenders () {
	_.each(Template, function (template, name) {
		var oldRender = template.rendered;
		var counter = 0;

		template.rendered = function () {
			console.log(name, "render count: ", ++counter);
			oldRender && oldRender.apply(this, arguments);
		};
	});
}

logRenders();