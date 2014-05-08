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

// Server-side methods (interface)

Meteor.methods({
	/**
	 * Creates a basic game instance. Sets 'host' as
	 * player 1.
	 * 
	 * @param  {id} playerId id of the player
	 * @return {id}          id of the game
	 */
    createGame: function(playerId) {
        // Create game instance
        var gameId = Games.insert({
        	p1: playerId,
            status: 'waiting'
        });

        joinGame(playerId, gameId);

        return gameId;
    },

    /**
     * The second part of the the game creation process.
     * Since games are only for two players, we consider
     * the game started as the second person joins.
     * 
     * @param  {id} playerId id of the joining player
     * @param  {id} gameId   id of the game joined
     * @return {[type]}          [description]
     */
    joinGame: function(playerId, gameId) {
        joinGame(playerId, gameId);

        // Since we have two players, we can go ahead and start the game.
        return startGame(gameId);
    },

    /**
     * When a player voluntarily leaves a game, the game is done.
     * We set game as finished and update player and game states.
     *
     * NOTE: This behavior can be revisited at a later time.
     * @param  {id} playerId the id of the leaving player
     * @param  {[type]} gameId   [description]
     * @return {[type]}          [description]
     */
    leaveGame: function(playerId, gameId) {
        // Set game state to finished
        Games.update(gameId, {$set: {status: 'finished'}});

        // Remove players from game
        Players.update(playerId, {$set: {game: null}});

        return true;
    },

    /**
     * [play description]
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    play: function(opts) {

    },



    /**
     * DEVELOPER FUNCTION: Flushes the player and game database.
     * 
     */
    flush: function() {
    	Games.remove({});
    	Players.remove({});
    	
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

        var game = Match.getGameInstance(gameId);
        game.start();

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
    Games.update(gameId, {$set: {p2: playerId}})
}

// TBD