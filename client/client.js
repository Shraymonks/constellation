// Initialize game state

Meteor.startup(function() {
    // Create a player ID
    var playerId = Players.insert({});

    Session.set('currentPlayer', playerId);
    Session.setDefault('currentGame', null);

    Deps.autorun(function() {
        Meteor.subscribe('openGames');
        Meteor.subscribe('playersInGame', Session.get('currentGame'));
    });
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

// logRenders();