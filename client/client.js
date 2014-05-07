Template.lobby.events({
	'click input': function() {
		var newGame = {
			players: 1
		},

		Meteor.call('startGame', Session.get('currentPlayer'));

		gameId = Games.insert(newGame);
		Session.set('currentGame', gameId);
		Router.go('/game/' + gameId);

		console.log("Creating a new Game", gameId);
	},
	'click .join': function(e) {
		// Find out the id of the game fromt he DOM.
		var id = $(e.currentTarget).data('id');

		if (id) {
			Session.set('currentGame', id);
			Games.update(id, {$inc: {players: 1}});
			Router.go('/game/' + id);

			console.log("Joining game ", e);
		} else { // ERROR: no id found from DOM.
			console.log("no id found");
		}
	}
});

Template.lobby.games = function() {
	return Games.find({}).fetch();
}

/*
* Game Board handlers
*/

Template.gameBoard.events({
	'click .exit-game': function() {
		// Do a player decrement. End the game if there are no more players.
		Games.update(Session.get('currentGame'), {$inc: {players: -1}});

		Router.go('/');
	}
});

Template.gameBoard.players

// Initialize game state

Meteor.startup(function() {
	Deps.autorun(function() {
		Meteor.subscribe("games");
	});

	// Create a player ID
	var playerId = Players.insert({});

	Session.set("currentPlayer", playerId);
	console.log("All loaded.");
});

console.log("Running this code");


// Auxillary Code

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