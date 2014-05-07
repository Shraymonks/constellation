Meteor.publish("games", function() {
	return Games.find({players: 1});
});

Meteor.methods({
	startGame: function() {
		Games.insert({

		});
	},
	joinGame: function() {
		
	}
});