Template.gameBoard.events({
    'click .exit-game': function() {
        Meteor.call('leaveGame', Session.get('currentPlayer'), Session.get('currentGame'), function(error, result) {
            if (!error) {
                Session.set('currentGame', null);
                Router.go('/');
            }
        });
    }
});

Template.gameBoard.players = function() {
    return Players.find({game: Session.get('currentGame')}).fetch();
}
