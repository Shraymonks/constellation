Template.lobby.events({
    'click .createGame': function() { // Starts a new game instance
        Meteor.call('createGame', Session.get('currentPlayer'), function(error, result) {
            if (!error) {
                Session.set('currentGame', result);
                Router.go('/game/' + result);

                console.log("Creating a new Game", result);
            } else {
                // Handle error.
                console.log("Error creating a new game");
            }
        });
    },
    'click .join': function(e) { // Player joins an existing game instance
        // Find out the id of the game fromt he DOM.
        var id = $(e.currentTarget).data('id');

        if (id) {
            Meteor.call('joinGame', Session.get('currentPlayer'), id, function(error, result) {
                Session.set('currentGame', id);
                Router.go('/game/' + id);

                console.log("Joining game ", id);
            });
        } else { // ERROR: no id found from DOM.
            console.log("no id found");
        }
    },
    'click .flushDb': function() {
        Meteor.call('flush');
    }
});

Template.lobby.games = function() {
    return Games.find({}).fetch();
}
