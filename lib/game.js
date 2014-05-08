// This houses all the temporary game logic.
// 
// HOW IT WORKS:
// 
// The current implementation works by storing player specific game
// states within the player object and shared game state in the game
// object.

/**
 * Match interface object, that will manage the game / player states.
 * All game actions will route through here. (Alpha implementation).
 * @type {Object}
 */
Match = {
	getGameInstance: function(gameId) {
		var game = getGame(gameId);

		game = _.extend({}, game);
		return game;
	},

	/**
	 * This is the actual game start. We start the initialization process
	 * for both player states and game states.
	 * 
	 * @return {[type]} [description]
	 */
	start: function(gameId) {
		var game = getGame(gameId);

		// Set players to default states.
		resetPlayer(game.p1);
	}
};

// Private (to this module) game functions

/**
 * Returns the game object itself, not the cursor or id.
 * @param  {id} gameId id of game to return
 * @return {Object}        game Object
 */
var getGame = function(gameId) {
	return Games.find(gameId).fetch();
}

var resetPlayers = function(playerId) {
	var player = Players.find(playerId).fetch();

	player.life = 20;

	chooseFirstPlayer();
};

/**
 * Rolls a virtual dice to see who goes decides to play first.
 * This function will automatically shuffle p1 & p2 based on player
 * choices.
 * 
 * @return {id} id of the first player.
 */
var chooseFirstPlayer = function() {
	var rand = Math.random();
}