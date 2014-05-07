Meteor.publish("games", function() {
	return Games.find({players: 1});
});