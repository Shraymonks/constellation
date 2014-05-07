// Shared between client and server.

/* This should be a list of active games.

Games should have the document format:

{
	_id: 'xxxxxx'
	players: 1 - 2
}
*/

Games = new Meteor.Collection("games");

Games.allow({
	insert: function() {
		return true;
	}
});

// For now players should be created everytime they 'launch' the app.

Players = new Meteor.Collection("players");

Players.allow({
	insert: function() {
		return true;
	}
})