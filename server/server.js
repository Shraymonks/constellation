// Server Publications

/**
 * List of available games.
 */
Meteor.publish('openGames', function() {
    return Games.find({status: 'waiting'});
});

/**
 * Current players in the game
 */
Meteor.publish('playersInGame', function(gameId) {
    return Players.find({
        $and: [
            {game: {$exists: true}},
            {game: gameId},
        ]
    });
});

Meteor.methods({
    createGame: function(playerId) {
        // Create game instance
        var gameId = Games.insert({
            status: 'waiting'
        });

        joinGame(playerId, gameId);

        return gameId;
    },
    joinGame: function(playerId, gameId) {
        joinGame(playerId, gameId);

        // Since we have two players, we can go ahead and start the game.
        return startGame(gameId);
    },
    leaveGame: function(playerId, gameId) {
        // Set game state to finished
        Games.update(gameId, {$set: {status: 'finished'}});

        // Remove players from game
        Players.update(playerId, {$set: {game: null}});

        return true;
    }
});

// Define server side 'private functions'

/**
 * This initializes a new game. This function should only be called when
 * there are two players in the game.
 * 
 * @return {[type]}
 */
startGame = function(gameId) {
    // Check to see if there are two players in the game (e.g., two players with same gameId)
    if (Players.find({game: gameId}).count() === 2) {
        Games.update(gameId, {$set: {status: 'active'}});

        return true; // Return true for now.
    } else {
        return false;
    }
};

/**
 * Adds game id to current player signalling that he 'joined'
 */
joinGame = function(playerId, gameId) {
    Players.update(playerId , {$set: {game: gameId}});
}

// TBD